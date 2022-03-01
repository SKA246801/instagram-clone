import React, { useState, useEffect } from 'react'
import './Post.css'
import { Avatar } from '@mui/material'
import { db } from '../../firebase'
import firebase from 'firebase/compat/app'

function Post({ postId, user, username, caption, image}) {

  const [comments, setComments] = useState([]) 
  const [comment, setComment] = useState('') 


  useEffect(() => {
    let unsubscribe
    if (postId) {
      unsubscribe = db.collection('posts').doc(postId).collection('comments').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
        setComments(snapshot.docs.map(doc => doc.data()))
      })
    }

    return () => {
      unsubscribe()
    }
  
  }, [postId])

  const postComment = e => {
    e.preventDefault()

    db.collection('posts').doc(postId).collection('comments').add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setComment('')
  }
  
  
  return (
    <div className='post'>
      <div className='post-header'>
        <Avatar className='post-avatar' alt={username} src='/static/images/avatar/1.jpg' />
        <h3>{username}</h3>
      </div>
        <img className='post-img' src={image} />

      <p className='post-caption'><strong>{username}</strong> {caption}</p>
     
      <div className='post-comments'>
        {comments.map(comment => (
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
        </div>
      {
        user && (
          <form className='comment-form'>
            <input className='comment-input' type='text' placeholder='Add a comment...' value={comment} onChange={e => setComment(e.target.value)} />
            <button className='comment-btn' disabled={!comment} type='submit' onClick={postComment} >Post</button>
          </form>
      )}
    </div>
  )
}

export default Post