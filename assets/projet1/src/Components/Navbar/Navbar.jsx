import React from'react'
import './navbar.css'

import {GiHouseKeys} from 'react-icons/gi'
import { useState } from 'react'



const Navbar =() => {
    const [active , setActive] = useState('navBar')
    const showNav = () =>{
        setActive("navBar activeNavbar")
    }
    return (
        <section className="navBarSection">
            <header className="header flex">

                <div className="logoDiv">
                    <a href="/" className="logo flex">
                        <h1>
                            <GiHouseKeys className="icon"/> Kritch 
                        </h1>
                    </a>
                </div>

                <div>
                    <ul className="navLists flex">
                        <li className="navItem">
                            <a href="/" className="navLink">Accueil</a>
                        </li>
                        &nbsp; &nbsp; &nbsp; 
                        <li className="navItem">
                            <a href="/NotreSociete" className="navLink"> Société</a>
                        </li>
                        &nbsp; &nbsp; &nbsp;
                        <li className="navItem">
                            <a href="/QuiEtesVous?" className="navLink"> Inscription </a>
                        </li>
                    </ul>
                       
                </div>
                
            </header>
        </section>
    )
}

export default Navbar