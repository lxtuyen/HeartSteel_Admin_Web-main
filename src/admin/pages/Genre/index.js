import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get, remove, push, set } from 'firebase/database';
import { toast } from 'react-toastify';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';

import { app } from '../../../firebase/firebase';

function Genres() {
    const [genre, setGenre] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const db = getDatabase(app);
            const dbRef = ref(db, 'genres');
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                const myData = snapshot.val();
                const temporaryArray = Object.keys(myData).map((myFireId) => {
                    return {
                        ...myData[myFireId],
                        _id: myFireId,
                    };
                });
                setGenre(temporaryArray);
            } else {
            }
        };
        getData();
    }, []);
    const onFinish = async (values) => {
      const db = getDatabase(app);
        const newDocRef = push(ref(db, 'genres'));
        values.genres.map(async (value) => {
        set(newDocRef, value)
            .then(() => {
                toast.success('Successful');
                window.location.reload();
            })
            .catch((error) => {
                toast.error(error.message);
            });
        }) 
    };
    const handleDelete = async (id) =>{
        const db = getDatabase(app);
        const dbRef = ref(db, 'genres/' + id);
        await remove(dbRef);
        window.location.reload();
    }
    return (
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 className="mt-4">All Genres</h1>
                    <div className="row">
                        <table className="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Title</th>
                                    <th></th>
                                </tr>
                            </thead>
                                <tbody>
                                    {genre?.map((genre, i) => (
                                        <tr>
                                            <th scope="row">{i}</th>
                                            <td>{genre.title}</td>
                                            <td>
                                                <button
                                                    className="btn btn-outline-danger"
                                                    onClick={(e) => handleDelete(genre._id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                        </table>
                        <Form
                            name="dynamic_form_nest_item"
                            onFinish={onFinish}
                            style={{
                                maxWidth: 600,
                            }}
                            autoComplete="off"
                        >
                            <Form.List name="genres">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <Space
                                                key={key}
                                                style={{
                                                    display: 'flex',
                                                    marginBottom: 8,
                                                }}
                                                align="baseline"
                                            >
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'title']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Missing genres',
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder="Add genre" />
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(name)} />
                                            </Space>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                Add genre
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Genres;
