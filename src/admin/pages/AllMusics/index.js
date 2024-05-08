import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import { getDatabase, ref, get, remove } from 'firebase/database';
import { Link } from 'react-router-dom';

import { app } from '../../../firebase/firebase';
import styled from './AllMusics.scss';

function AllBooks() {
    const cx = classNames.bind(styled);
    const [obj, setObj] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const db = getDatabase(app);
            const dbRef = ref(db, 'musics');
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
                alert('error');
            }
        };
        getData();
    }, []);
    const handleDelete = async (id) => {
        const db = getDatabase(app);
        const dbRef = ref(db, "musics/"+id);
        await remove(dbRef);
        window.location.reload();
      }
    return (
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 className="mt-4"> All Books</h1>
                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fas fa-table me-1"></i>
                            DataTable Example
                        </div>
                        <table className="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Genre</th>
                                    <th scope="col">Likes</th>
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
                                            <img src={item.image} alt={item.title} className={cx('img')} />{' '}
                                        </td>
                                        <td>{item.genre}</td>
                                        <td>{item.likes || <p>Not Rating</p>}</td>
                                        <td>
                                            <button className="btn btn-outline-primary">
                                                <Link to={`/editMusic/${item._id}`}>Edit</Link>
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-outline-danger"
                                                onClick={(e) => handleDelete(item._id)}
                                            >
                                                Delete{' '}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AllBooks;
