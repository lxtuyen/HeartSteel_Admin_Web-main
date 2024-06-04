import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get, remove, push, set } from 'firebase/database';
import { Link } from 'react-router-dom';
import { Button, Form, Input, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

import { app } from '../../../firebase/firebase';

function Categories() {
    const [obj, setObj] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const db = getDatabase(app);
            const dbRef = ref(db, 'categories');
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                const myData = snapshot.val();
                const temporaryArray = Object.keys(myData).map((myFireId) => {
                    return {
                        ...myData[myFireId],
                        _id: myFireId,
                    };
                });
                setObj(temporaryArray);
            } else {
            }
        };
        getData();
    }, []);

    const handleDelete = async (id) => {
        const db = getDatabase(app);
        const dbRef = ref(db, 'categories/' + id);
        await remove(dbRef);
        window.location.reload();
    };

    const onFinish = async (values) => {
        const db = getDatabase(app);
        const newDocRef = push(ref(db, 'categories'));
        values.categories.map(async (value) => {
            set(newDocRef, value)
                .then(() => {
                    toast.success('Successful');
                    window.location.reload();
                })
                .catch((error) => {
                    toast.error(error.message);
                });
        });
    };

    return (
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 className="mt-4">Categories</h1>
                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fas fa-table me-1"></i>
                            DataTable Categories
                        </div>
                        <table className="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Title</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {obj?.map((item, i) => (
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{item.title}</td>
                                        <td>
                                            <button className="btn btn-outline-primary">
                                                <Link to={`/tracks/${item._id}`}>Add Tracks</Link>
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-outline-danger"
                                                onClick={(e) => handleDelete(item._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Form
                        name="dynamic_form_nest_item"
                        onFinish={onFinish}
                        style={{
                            maxWidth: 600,
                        }}
                        autoComplete="off"
                    >
                        <Form.List name="categories">
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
                                                        message: 'Missing categories',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Add category" />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add category
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
            </main>
        </div>
    );
}

export default Categories;
