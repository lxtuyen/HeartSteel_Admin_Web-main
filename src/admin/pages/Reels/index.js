import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { getDatabase, ref, get, remove } from 'firebase/database';

import { app } from '../../../firebase/firebase';
import styled from '../AllMusics/AllMusics.scss';

function Reels() {
    const cx = classNames.bind(styled);
    const [obj, setObj] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const db = getDatabase(app);
            const dbRef = ref(db, 'reels');
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
        const dbRef = ref(db, "reels/"+id);
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
                                    <th scope="col">Author</th>
                                    <th scope="col">Caption</th>
                                    <th scope="col">Video</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {obj?.map((item, i) => (
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{item.author}</td>
                                        <td>{item.caption}</td>
                                        <td>
                                            <video src={item.video} alt={item.caption} className={cx('img')} />
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
                </div>
            </main>
        </div>
    );
}

export default Reels;
