import React from 'react'
import Logo1 from './Images/logo1.jpg'
import LogoAfg from './Images/logoAfg.jpg'
import './Header.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Nav from './Nav'
import Kra2 from './Images/Kra2.png'
import dar from './Images/dar.jpg'
function Header() {
  return (
    <div className='header'>
        <div className='d-flex justify-content-around '>
            <div>
                <img src={Kra2} alt="" />
            </div>
            <div className='d-flex align-items-center'>
                <h2>maa Kritchy tl9a dar tak tak </h2>
            </div>
            <div>
                <img src={dar} alt="" />
            </div>
        </div>
        <Nav />
    </div>
  )
}

export default Header