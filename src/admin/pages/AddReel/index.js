import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, set, push } from 'firebase/database';

import { app } from '../../../firebase/firebase';


function AddReel() {
    const navigate = useNavigate();
    const [caption, setCaption] = useState('');
    const [video, setVideo] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const db = getDatabase(app);
        const newDocRef = push(ref(db, 'reels'));
        set(newDocRef, {
            caption: caption,
            author: author,
            video: video,
        })
            .then(() => {
                toast.success('Successful');
                navigate("/reels")
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
        fetch('https://api.cloudinary.com/v1_1/multi-library/video/upload', {
            method: 'post',
            body: uploadData,
        })
            .then((res) => res.json())
            .then((data) => setVideo(data.url))
            .catch((err) => toast.error(err));
    };
    return (
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 className="mt-4">Add Reel</h1>
                    <div className="row">
                        <form action="">
                            <div className="sb-sidenav-menu-heading">General</div>
                            <label className="form-label mt-3" name="Caption">
                            Caption:{' '}
                            </label>
                            <input
                                type="text"
                                className="form-control display-2"
                                onChange={(e) => {
                                    setCaption(e.target.value);
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

                            <label className="form-label mt-3" name="file">
                                Video:{' '}
                            </label>
                            <input type="file" className="form-control " accept="audio/*" onChange={handleFileInput} />
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

export default AddReel;
