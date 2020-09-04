import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { storage, db } from './firebase';
import firebase from 'firebase';
import './ImageUpload.css';

function ImageUpload({username}) {

    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //progress
                const prgress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                setProgress(prgress);
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
                // complete function
                storage
                    .ref('/images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        // post the image into database
                        db.collection('posts').add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption:caption,
                            imageUrl:url,
                            username:username
                        });

                        setProgress(0);
                        setImage(null);
                        setCaption('');

                    })
            }
        )
    };

    return (
        <div className="imageupload">
            <progress value={progress}  max="100"/>
            <input className="imageupload__input" type="text" placeholder="Enter a caption..."
                value={caption}
                onChange={event => setCaption(event.target.value)}/>
            <input type="file" onChange={handleChange}/>
            <Button className="imageupload__button" onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload;
