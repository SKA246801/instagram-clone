import React from 'react'
import './Header.css'

function Header() {
  return (
    <div className='header'>
        <img className='instagram-logo' src={require('../../assets/img/instagram-logo.png')} alt='instagram-logo'></img>
    </div>
  )
}

export default Header