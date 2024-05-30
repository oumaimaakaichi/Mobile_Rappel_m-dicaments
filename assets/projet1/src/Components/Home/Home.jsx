import React from'react'
import './home.css'
import video from '../../assets/1.mp4';
import {GrLocation} from 'react-icons/gr'
import {FiFacebook} from 'react-icons/fi'
import {AiOutlineInstagram} from 'react-icons/ai'
import {SiTripadvisor} from 'react-icons/si'
import {BsListTask} from 'react-icons/bs'
import {TbApps} from 'react-icons/tb'



const Home =() => {
    return (
        <section className='home'>
            <div className='overlay'>
            </div>
            <video src={video} muted autoPlay loop type="video/mp4"></video>
            <div className="homeContent container">
                <div className="textDiv">
                    <span className='smallText'>  
                    </span>
                    <h1 className="homeTitle">
                        Cherchez Votre Maison
                    </h1>
                </div>
                <div className='cardDiv grid'>
                    <div className='destinationInput'>
                        <label htmlFor="city"> 
                        Cherche votre position:
                        </label>
                        <div className ="input flex">
                            <input type="text" placeholder='Entrer ici votre position ..'/>
                            <GrLocation className="icon"/>
                        </div>
                    </div>
                    <div className='dateInput'>
                        <label htmlFor="date">
                            Sélectionne votre période:
                        </label>
                        <div className ="input flex">
                            <input type="date"/>
                        </div>
                    </div>
                    <div className='priceInput'>
                        <div className='label_total flex'>
                            <label htmlFor='price'>
                                Votre budget :
                            </label>
                            <h3 className='total'>1200 DT</h3>
                        </div>
                        <div className='input flex'>
                            <input type="range" max="1500" min="300"/>
                        </div>
                    </div>
                </div>
                <div className='homeFooterIcons flex'>
                </div>
            </div>

        </section>
    )
}

export default Home