import React from'react'
import {HiOutlineClipboardCheck} from 'react-icons/hi'
import './prop.css'

const Prop=() => {
    return (
        
        <section className='main container section'>
                <div className='secTitle'>
                    <h3 className='title'>
                        Remplir vos données:
                    </h3>
                </div>
                
                <div className='secContent grid'>
                        {
                                        <div className='singleDestination'>
                                            <label>
                                            <div className='cardInfo'>
                                                <span className="flex">
                                                    Nom :<input type="text" name="name" placeholder='Nom..'/> 
                                                 </span>
                                                
                                            </div>

                                            <div className='cardInfo'>
                                                <span className="name">Prénom :  </span>
                                                <input type="text" name="prenom" placeholder='Prénom..'/>
                                            </div>
                                            </label>

                                            <div className='cardInfo'>
                                            <span className="name">Gouvernement :  </span>
                                                <select>
                                                    <option value="nabeul">Nabeul</option>
                                                    <option value="tunis">Tunis</option>
                                                    <option selected value="benaros">Ben Arous</option>
                                                    <option value="ariana">Ariana</option>
                                                    <option value="ariana">Sfax</option>
                                                    <option value="ariana">Sousse</option>
                                                    <option value="ariana">Monastir</option>
                                                    <option value="ariana">Zaghouane</option>
                                                    <option value="ariana">Gafsa</option>
                                                </select>
                                            </div>
                                            <div className='cardInfo'>
                                                <span className="name">Numéro Téléphone :  </span>
                                                <input type="text" name="prenom" placeholder='+216..'/>
                                            </div>
                                                <div className='cardInfo'>
                                                 <input type="file" />
                                                 <input type="file" />
                                                 <input type="file" />
                                                </div>
                                                

                                            <div className='cardInfo'>
                                            <label>
                                                <input name="acceptedTerms" type="checkbox" required />
                                               J'accepte les conditions d'utilisation       
                                            </label>   
                                            </div>


                                                <button className='btn'>
                                                    Envoyer <HiOutlineClipboardCheck className="icon" />
                                                </button>
                                                

                                        </div>
                                           
                        }
                            
                        
                </div>
        </section>
    )
}

export default Prop