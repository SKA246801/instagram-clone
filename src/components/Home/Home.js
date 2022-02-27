import React, { useState, useEffect } from 'react'
import Post from '../Post/Post'
import { db } from '../../firebase'

function Home() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        db.collection('posts').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
            })))
        })
    }, [])

  return (
    <div className='homepage'>
        {
        posts.map(({id, post}) => (
          <Post key={id} username={post.username} caption={post.caption} image={post.image}/>
        ))
      }
    </div>
  )
}

export default Home