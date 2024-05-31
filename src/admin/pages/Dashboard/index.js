import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { getDatabase, ref, get } from 'firebase/database';

import { app } from '../../../firebase/firebase';
import styled from '../Dashboard/Dashboard.scss';
function Dashboard() {
    const cx = classNames.bind(styled);
    const [music, setMusic] = useState([]);
    const [category, setCategory] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const db = getDatabase(app);
            const dbRef = ref(db, 'musics');
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                setMusic(Object.values(snapshot.val()));
            } else {
            }
        };
        getData();
    }, []);
    useEffect(() => {
        const getData = async () => {
            const db = getDatabase(app);
            const dbRef = ref(db, 'categories');
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                setCategory(Object.values(snapshot.val()));
            } else {
            }
        };
        getData();
    }, []);
    useEffect(() => {
        const getData = async () => {
            const db = getDatabase(app);
            const dbRef = ref(db, 'genres');
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                setGenres(Object.values(snapshot.val()));
            } else {
            }
        };
        getData();
    }, []);
    return (
        <>
            <div id="layoutSidenav_content">
                <main>
                    <div class="container-fluid px-4">
                        <h1 class="mt-4">Dashboard</h1>
                        <ol class="breadcrumb mb-4">
                            <li class="breadcrumb-item active">Dashboard</li>
                        </ol>
                        <div class="row">
                            <div class="col-xl-3 col-md-6">
                                <div class="card bg-primary text-white mb-4">
                                    <div class="card-body">Musics</div>
                                    <div class="card-footer d-flex align-items-center justify-content-between">
                                        <Link class="small text-white stretched-link" to="/allMusics">
                                            View Details
                                        </Link>
                                        <div class="small text-white">
                                            <i class="fas fa-angle-right"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-md-6">
                                <div class="card bg-danger text-white mb-4">
                                    <div class="card-body">Categories</div>
                                    <div class="card-footer d-flex align-items-center justify-content-between">
                                        <Link class="small text-white stretched-link" href="/categories">
                                            View Details
                                        </Link>
                                        <div class="small text-white">
                                            <i class="fas fa-angle-right"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-table me-1"></i>
                                DataTable Musics
                            </div>
                            <div class="card-body">
                                <table className="table table-striped table-hover table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">Genre</th>
                                            <th scope="col">Likes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {music?.map((item, i) => (
                                            <tr>
                                                <th scope="row">{i + 1}</th>
                                                <td>{item.title}</td>
                                                <td>
                                                    <img src={item.image} alt={item.title} className={cx('img')}/>
                                                </td>
                                                <td>{item.category}</td>
                                                <td>{item.genre}</td>
                                                <td>{item.likes || <p>Not Rating</p>}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-table me-1"></i>
                                DataTable Categories
                            </div>
                            <div class="card-body">
                                <table className="table table-striped table-hover table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Title</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {category?.map((item, i) => (
                                            <tr>
                                                <th scope="row">{i + 1}</th>
                                                <td>{item.title}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-table me-1"></i>
                                DataTable Genre
                            </div>
                            <div class="card-body">
                                <table className="table table-striped table-hover table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Title</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {genres?.map((item, i) => (
                                            <tr>
                                                <th scope="row">{i + 1}</th>
                                                <td>{item.title}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default Dashboard;
