import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, set, push, get } from 'firebase/database';

import MultiChoice from 'admin/Components/MultipleChoice';
import { app } from '../../../firebase/firebase';


function AddMusic() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [audio, setAudio] = useState('');
    const [image, setImage] = useState('');
    const [author, setAuthor] = useState('');
    const [tag, setTag] = useState([]);
    const [lyrics, setLyrics] = useState("");
    const [genre, setGenre] = useState([]);
    const [value, setValue] = useState([]);
    const [valueTag, setValueTag] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const db = getDatabase(app);
        const newDocRef = push(ref(db, 'musics'));
        const genresData = await getGenresData(value);
        const tabData = await getTabsData(valueTag);
        set(newDocRef, {
            title: title,
            author: author,
            tag: tabData.title,
            likes: '',
            audio: audio,
            image: image,
            genre: genresData.title,
            lyrics: lyrics
        })
            .then(() => {
                toast.success('Successful');
                navigate("/allMusics")
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };
    const handleFileInput = async (e) => {
        const file = e.target.files[0];
        const uploadData = new FormData();

        uploadData.append('file', file);
        uploadData.append('upload_preset', 'multiLibrary');
        uploadData.append('upload_name', '');
        fetch('https://api.cloudinary.com/v1_1/multi-library/image/upload', {
            method: 'post',
            body: uploadData,
        })
            .then((res) => res.json())
            .then((data) => setImage(data.url))
            .catch((err) => toast.error(err));
    };
    const handleFileInput2 = async (e) => {
        const file = e.target.files[0];
        const uploadData = new FormData();

        uploadData.append('file', file);
        uploadData.append('upload_preset', 'multiLibrary');
        uploadData.append('upload_name', '');
        fetch('https://api.cloudinary.com/v1_1/multi-library/video/upload', {
            method: 'post',
            body: uploadData,
        })
            .then((res) => res.json())
            .then((data) => setAudio(data.url))
            .catch((err) => toast.error(err));
    };
    const getGenresData = async (musicId) => {
        const db = getDatabase(app);
        const musicRef = ref(db, `genres/${musicId}`);
        const musicSnapshot = await get(musicRef);
        if (musicSnapshot.exists()) {
            return musicSnapshot.val();
        } else {
            return null;
        }
    };
    const getTabsData = async (musicId) => {
        const db = getDatabase(app);
        const musicRef = ref(db, `tabs/${musicId}`);
        const musicSnapshot = await get(musicRef);
        if (musicSnapshot.exists()) {
            return musicSnapshot.val();
        } else {
            return null;
        }
    };
    //get data genres
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

    //get data tabs
    useEffect(() => {
        const getData = async () => {
            const db = getDatabase(app);
            const dbRef = ref(db, 'tabs');
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                const myData = snapshot.val();
                const temporaryArray = Object.keys(myData).map((myFireId) => {
                    return {
                        ...myData[myFireId],
                        _id: myFireId,
                    };
                });
                setTag(temporaryArray);
            } else {
            }
        };
        getData();
    }, []);
    return (
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 className="mt-4">Add Music</h1>
                    <div className="row">
                        <form action="">
                            <div className="sb-sidenav-menu-heading">General</div>
                            <label className="form-label mt-3" name="Title">
                                Title:{' '}
                            </label>
                            <input
                                type="text"
                                className="form-control display-2"
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                            />
                            <label className="form-label mt-3" name="Author">
                            Author:{' '}
                            </label>
                            <input
                                type="text"
                                className="form-control display-2"
                                onChange={(e) => {
                                    setAuthor(e.target.value);
                                }}
                            />
                            <label className="form-label mt-3" name="genre">
                                Genre:{' '}
                            </label>
                            <MultiChoice setData={(genre) => setValue(genre)} data={genre} />

                            <label className="form-label mt-3" name="Tag">
                                Tag:{' '}
                            </label>
                            <MultiChoice setData={(tag) => setValueTag(tag)} data={tag} />

                            <label className="form-label mt-3" name="photo">
                                Image:{' '}
                            </label>
                            <input type="file" className="form-control " accept="image/*" onChange={handleFileInput} />

                            <label className="form-label mt-3" name="file">
                                audio:{' '}
                            </label>
                            <input type="file" className="form-control " accept="audio/*" onChange={handleFileInput2} />

                            <label className="form-label mt-3" name="desc">
                                Lyrics:{' '}
                            </label>
                            <textarea
                                className="form-control display-2"
                                onChange={(e) => {
                                    setLyrics(e.target.value);
                                }}
                            ></textarea>
                            <button className="btn btn-primary mt-3" type="submit" onClick={handleSubmit}>
                                Submit form
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AddMusic;
