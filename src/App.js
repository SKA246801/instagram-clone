import React, { useState, useEffect } from 'react'
import './App.css'
import Home from './components/Home/Home'
import Modal from '@mui/material/Modal'
import Upload from './components/Upload/Upload'
import { Button, Input } from '@mui/material'
import { Box } from '@mui/system'
import { auth } from './firebase'


function App() {

  const [open, setOpen] = useState(false)
  const [openSignIn, setOpenSignIn] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] =useState('')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        setUser(authUser)
      } else {
        setUser(null)
      }
    })
    
    return () => {
      unsubscribe()
    }
  }, [user, username])
  


  const signUp = e => {
    e.preventDefault()

    auth.createUserWithEmailAndPassword(email, password)
    .then(authUser => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch(e => alert(e.message))

    setOpen(false)
  }

  const signIn = e => {
    e.preventDefault()

    auth.signInWithEmailAndPassword(email, password)
    .catch(e => alert(e.message))

    setOpenSignIn(false)
  }
  
  return (
    <div className='header'>
        <img className='instagram-logo' src={require('./assets/img/instagram-logo.png')} alt='instagram-logo' />
        <Modal open={open} onClose={() => setOpen(false)} >
          <Box className='modal'>
            <form className='signup-form'>
              <center>
                <img className='instagram-logo' src={require('./assets/img/instagram-logo.png')} alt='instagram-logo' />
              </center>
              <Input placeholder='username' type='text' value={username} onChange={e => setUsername(e.target.value)} />
              <Input placeholder='email' type='text' value={email} onChange={e => setEmail(e.target.value)} />
              <Input placeholder='password' type='password' value={password} onChange={e => setPassword(e.target.value)} />
              <Button onClick={signUp}>Sign Up</Button>
            </form>
          </Box>
        </Modal>
        <Modal open={openSignIn} onClose={() => setOpenSignIn(false)} >
          <Box className='modal'>
            <form className='signup-form'>
              <center>
                <img className='instagram-logo' src={require('./assets/img/instagram-logo.png')} alt='instagram-logo' />
              </center>
              <Input placeholder='email' type='text' value={email} onChange={e => setEmail(e.target.value)} />
              <Input placeholder='password' type='password' value={password} onChange={e => setPassword(e.target.value)} />
              <Button onClick={signIn}>Sign In</Button>
            </form>
          </Box>
        </Modal>
        { user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button> 
        ) : (
          <div>
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}

      <Home />
      { user ? (
        <Upload username={user.displayName} />
      ) : (
        <h3>Login to upload a post</h3>
      )

      }
    </div>
  )
}

export default App