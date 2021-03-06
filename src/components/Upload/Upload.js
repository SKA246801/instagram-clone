import React, { useState } from 'react'
import './Upload.css'
import { Button } from '@mui/material'
import { db, storage } from '../../firebase'
import firebase from 'firebase/compat/app'

function Upload({ username }) {

    const [progress, setProgress] = useState(0)
    const [caption, setCaption] = useState()
    const [image, setImage] = useState(null)

    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    } 

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image?.name}`).put(image)

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(progress)
            },
            e => {
                alert(e.message)
            },
            () => {
                storage.ref('images').child(image.name).getDownloadURL()
                .then(url => {
                    db.collection('posts').add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        image: url,
                        username: username
                    })

                    setProgress(0)
                    setCaption('')
                    setImage(null)
                })
            }
        )
    }

  return (
    <div className='upload-container'>
        <div className='upload'>
            <progress className='progress-bar'value={progress} max='100' />
            <input type='text' placeholder='Enter a caption...' value={caption} onChange={e => setCaption(e.target.value)}/>
            <input type='file' onChange={handleChange} />
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
    </div>
  )
}

export default Upload