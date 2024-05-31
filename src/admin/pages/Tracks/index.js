import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get, remove, push, set } from 'firebase/database';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import classNames from 'classnames';

import styled from '../AllMusics/AllMusics.scss';
import MultiChoice from 'admin/Components/MultipleChoice';
import { app } from '../../../firebase/firebase';
function Tracks() {
    const cx = classNames.bind(styled);
    const [obj, setObj] = useState([]);
    const [music, setMusic] = useState([]);
    const [value, setValue] = useState([]);
    const { id } = useParams();
    //get data musics
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
                setMusic(temporaryArray);
            } else {
                alert('error');
            }
        };
        getData();
    }, []);
    //get data tracks
    useEffect(() => {
        const getData = async () => {
            const db = getDatabase(app);
            const dbRef = ref(db, `categories/${id}/tracks`);
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
            }
        };
        getData();

    }, [id]);
    const handleDelete = async (idTrack) => {
        const db = getDatabase(app);
        const dbRef = ref(db, `categories/${id}/tracks/${idTrack}`);
        await remove(dbRef);
        window.location.reload();
    };
    const getMusicData = async (musicId) => {
        const db = getDatabase(app);
        const musicRef = ref(db, `musics/${musicId}`);
        const musicSnapshot = await get(musicRef);
        if (musicSnapshot.exists()) {
            return musicSnapshot.val();
        } else {
            return null;
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const db = getDatabase(app);
        const newDocRef = push(ref(db, `categories/${id}/tracks`));
        const musicData = await getMusicData(value);
        console.log(musicData);
        set(newDocRef, {
            musicId: value.join(", "),
            audio: musicData?.audio,
            genre: musicData?.genre,
            image: musicData?.image,
            lyrics: musicData?.lyrics,
            tag: musicData?.tag,
            title: musicData?.title,
        })
            .then(() => {
                toast.success('Successful');
                window.location.reload();
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };
    return (
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 className="mt-4"> Tracks Of Categories</h1>
                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fas fa-table me-1"></i>
                            DataTable
                        </div>
                        <table className="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Likes</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {obj?.map((item, i) => (
                                    <tr>
                                        <th scope="row">{i + 1}</th>
                                        <td>{item.title}</td>
                                        <td>
                                            <img src={item.image} alt={item.title} className={cx('img')} />{' '}
                                        </td>
                                        <td>{item.likes || <p>Not Rating</p>}</td>
                                        <td>
                                            <button className="btn btn-danger" onClick={(e) => handleDelete(item._id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <label className="form-label mt-3" name="music">
                        Musics:
                    </label>
                    <MultiChoice setData={(genre) => setValue(genre)} data={music} />
                    <button className="btn btn-primary mt-3" type="submit" onClick={handleSubmit}>
                        Submit form
                    </button>
                </div>
            </main>
        </div>
    );
}

export default Tracks;
