import React, { useState, useEffect } from 'react'
import './Header.css'
import Modal from '@mui/material/Modal'
import { Button, Input } from '@mui/material'
import { Box } from '@mui/system'
import { auth } from '../../firebase'

function Header() {

  const [open, setOpen] = useState(false)
  const [openSignIn, setOpenSignIn] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] =useState('')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        console.log(authUser)
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
  }
  
  return (
    <div className='header'>
        <img className='instagram-logo' src={require('../../assets/img/instagram-logo.png')} alt='instagram-logo' />
        <Modal open={open} onClose={() => setOpen(false)} >
          <Box className='modal'>
            <form className='signup-form'>
              <center>
                <img className='instagram-logo' src={require('../../assets/img/instagram-logo.png')} alt='instagram-logo' />
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
                <img className='instagram-logo' src={require('../../assets/img/instagram-logo.png')} alt='instagram-logo' />
              </center>
              <Input placeholder='username' type='text' value={username} onChange={e => setUsername(e.target.value)} />
              <Input placeholder='email' type='text' value={email} onChange={e => setEmail(e.target.value)} />
              <Input placeholder='password' type='password' value={password} onChange={e => setPassword(e.target.value)} />
              <Button onClick={signUp}>Sign Up</Button>
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
    </div>
  )
}

export default Header