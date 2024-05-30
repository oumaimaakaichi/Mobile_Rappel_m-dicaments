import React from'react'
import './footer.css'
import video from '../../assets/maison.mp4'
import {FiSend} from 'react-icons/fi'
import {GiHouseKeys} from 'react-icons/gi'
import {AiOutlineTwitter} from 'react-icons/ai'
import {AiFillYoutube} from 'react-icons/ai'
import {AiFillInstagram} from 'react-icons/ai'
import {FiChevronRight} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom';
import {FiFacebook} from 'react-icons/fi'

const Footer =() => {
    const navigate = useNavigate();
    return (
        <section className='footer'>
            <div className='videoDiv'>
                
            </div>

            <div className='secContent container'>
                <div className='contactDiv flex'>
                    <div className='text'>
                        <h2>Votre Stabilité est notre Objectif</h2>
                    </div>
                    

                </div>
                <div className='footerCard flex'>
                <div className='footerIntro flex'>
                    <div className='logoDiv'>
                        <a href="home" className='logo flex'>
                            <GiHouseKeys className='icon'/>
                            Kritch
                        </a>
                    </div>
                    <div className='footerParagraph'>
                        "Kritch" est une plateforme tunisienne, crée par deux étudiantes d'ingénieurie "Abir El Ghali" et "Asma Triki" 
                         , son but est l'aide les étudiants, les élèves à trouver
                         ses propres maisons et fascilite
                         le processus de recherche.
                    </div>
                    

                </div>
                <div className='footerLinks '>
                <div className='footerSocials'>
                <span className='groupTitle'> Contactes:&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; </span>
                        <a href='https://twitter.com/i/flow/login?input_flow_data=%7B%22requested_variant%22%3A%22eyJsYW5nIjoiZnIifQ%3D%3D%22%7D'>
                        <AiOutlineTwitter className='icon'/>
                        </a>
                        <br></br>
                        <a href='https://www.youtube.com/'>
                        <FiFacebook className='icon'/>
                        </a>
                        <br></br>
                        <a href='https://www.instagram.com/?hl=fr'>
                        <AiFillInstagram className='icon'/>
                        </a>
                        
                    </div>

                </div>
                <div className='footerLinks '>
                    <div className='linkGroup'>
                         <span className='groupTitle'> Notre Société </span>
                         <li className='footerList flex'>
                                <FiChevronRight className='icon'/>
                                À propos de nous
                         </li>
                         <li className='footerList flex'>
                                <FiChevronRight className='icon'/>
                                Nos expertises
                         </li>
                         <li className='footerList flex'>
                                <FiChevronRight className='icon'/>
                                Savoir-Faire
                         </li>
                    </div>

                </div>

                <div className='footerDiv flex'>
                    <small> COPYRIGHTS RESERVED - 2023</small>
                </div>

                </div>
            </div>
            
        </section>
    )
}

export default Footer