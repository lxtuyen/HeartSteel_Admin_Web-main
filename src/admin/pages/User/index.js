import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get, remove, push, set } from 'firebase/database';
import { toast } from 'react-toastify';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';

import { app } from '../../../firebase/firebase';

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const db = getDatabase(app);
            const dbRef = ref(db, 'users');
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                const myData = snapshot.val();
                const temporaryArray = Object.keys(myData).map((myFireId) => {
                    return {
                        ...myData[myFireId],
                        _id: myFireId,
                    };
                });
                setUsers(temporaryArray);
            } else {
            }
        };
        getData();
    }, []);
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
                                    <th scope="col">Email</th>
                                </tr>
                            </thead>
                                <tbody>
                                    {users?.map((user, i) => (
                                        <tr>
                                            <th scope="row">{i}</th>
                                            <td>{user.email}</td>
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

export default Users;
