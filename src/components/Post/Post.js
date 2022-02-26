import React from 'react'
import './Post.css'
import { Avatar } from '@mui/material'

function Post({ username, caption, image}) {
  return (
    <div className='post'>
      <div className='post-header'>
        <Avatar className='post-avatar' alt={username} src='/static/images/avatar/1.jpg' />
        <h3>{username}</h3>
      </div>
        <img className='post-img' src={image} />

      <p className='post-caption'><strong>{username}</strong> {caption}</p>
    </div>
  )
}

export default Post