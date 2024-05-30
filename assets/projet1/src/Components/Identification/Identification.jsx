import React from'react'
import './identification.css'
import prop from '../../assets/prop.png';
import etudiant from '../../assets/etudiant.png';
import {RiGroupLine} from "react-icons/ri";
import video from '../../assets/1.mp4';
import {GrLocation} from 'react-icons/gr'
import {FiFacebook} from 'react-icons/fi'
import {AiOutlineInstagram} from 'react-icons/ai'
import {SiTripadvisor} from 'react-icons/si'
import {BsListTask} from 'react-icons/bs'
import {TbApps} from 'react-icons/tb'
import { IconName } from "react-icons/ri";
import {HiOutlineClipboardCheck} from 'react-icons/hi'
import { useNavigate } from 'react-router-dom';
import {GiHouseKeys} from 'react-icons/gi';


const Identification =() => {
    const navigate = useNavigate();
    return (
        /*
        <section className='home'>
            
            <div className="homeContent container">
                <div className="textDiv">
                    <h1 className="homeTitle">
                        Etudiant
                    </h1>
                </div>
                <div>
                    <button className='btn' onClick={()=> {navigate('/PageAcceuil')}}>
                     Espace d'Etudiant <HiOutlineClipboardCheck className="icon" />
                    </button>
                    <div className='priceInput'>
                    </div>
                </div>
            </div>

            <div className="homeContent container">
                <div className="textDiv">
                <h1 className="homeTitle">
                Propriétaire
                </h1>
                </div>
                <div>
                    <button className='btn' onClick={()=> {navigate('/FourmulaireProprietaire')}}>
                    Espace de Propriétaire <HiOutlineClipboardCheck className="icon" />
                    </button>
                    <div className='priceInput'>
                    </div>
                </div>
                
            </div>
            

        </section>
        */

        <section className='homehome'>
                                        <div className='main'>
                                            <div className='secContent grid'>
                                                        <div className='secTitle'>
                                                            <h2 className='title'>
                                                                Etudiant
                                                            </h2>
                                                        </div>
                                        
                                                        <div className='singleDestination'>
                                                            <div className=''>
                                                                <img src={etudiant} />
                                                            </div>
                                                            
                                                            <div className='cardInfo'>
                                                                <h4 className='destTitre'> </h4>
                                                                <span className="name">
                                                                 Avez-vous un compte ?
                                                                </span>
                                                            
                                                                <div className='fees flex'>
                                                                <button className='btnbtn' onClick={()=> {navigate('/FormulaireEtudiant')}}>
                                                                      Espace d'étudiant &nbsp; <RiGroupLine className="icon" />
                                                                </button>
                                                                </div>                                                                    

                                                            </div>
                                                        </div>                                               
                                        
                                            </div>
                                        </div>

                                        <div className='main'>

                                            <div className='secContent grid'>
                                                        <div className='secTitle'>
                                                            <h2 className='title'>
                                                            Propriétaire
                                                            </h2>
                                                        </div>

                                                        <div className='singleDestination'>
                                                        <div className=''>
                                                            <img src={prop} />
                                                        </div>
                                                            
                                                            <div className='cardInfo'>
                                                                <h4 className='destTitre'> </h4>
                                                                <span className="name">
                                                                 Avez-vous un compte ?
                                                                </span>

                                                                <div className='fees flex'>
                                                                <button className='btnbtn' onClick={()=> {navigate('/FormulaireProprietaire')}}>
                                                                Espace de Propriétaire &nbsp;  <GiHouseKeys className="icon"/>
                                                                </button>
                                                                </div>
                                                            </div>
                                                        </div>                                               
                                        
                                             </div>
                                        </div>

                        </section>
                            
                        



    )
}

export default Identification