import React, { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Post from './components/Post/Post'


function App() {

  const [posts, setPosts] = useState([])

  return (
    <div className="app">
      <Header />
      <Post username='user1' caption='caption1' image='test.png'/>
      <Post username='user2' caption='caption2' image='image1.jpg'/>
      <Post username='user3' caption='caption3' image='image2.jpg'/>
    </div>
  )
}

export default App