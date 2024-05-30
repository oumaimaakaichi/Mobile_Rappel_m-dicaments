import React from'react'
import './Maison2.css'
import img2 from '../../assets/img2.jpeg'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {HiOutlineClipboardCheck} from 'react-icons/hi'

const Data =[
    {
        id:2,
        imgSrc:img2,
        titre:'Tunis, Bardo',
        localisation: 'Rue Khaznadar',
        prix:'375 DT',
        a: '-Nombre de chambres: 2 :Salon, Chambre à 2 et balcon',
        b:'-10 minutes station de métro: Khaznadar',
        c:'-Prés de marché central',
        d:'-Pas de WIFI',
        Propriétaire: "Samia Said"
    }
]

const Maison2=() => {
    return (
        
        <section className='main container section'>
                <div className='secTitle'>
                    <h3 className='title'>
                    </h3>
                </div>
                
                <div className='secContent grid'>
                        {
                            Data.map(({id,imgSrc,titre,localisation,prix,a,b,c,d,Propriétaire})=>{
                                    return(
                                        
                                        <div key={id} className='singleDestination'>
                                            <div className='imageDiv'>
                                                <img src={imgSrc} alt={titre} />
                                            </div>

                                            <div className='cardInfo'>
                                                <h4 className='destTitre'> {titre}</h4>
                                                <span className="name">
                                                <HiOutlineLocationMarker />
                                                {localisation} 
                                                </span>

                                                <div className='fees flex'>
                                                    <div className="price"> <h4>{prix} </h4> </div>
                                                </div>
                                                <div className='fees flex'>
                                                <div className="name"> <h6>Propriétaire: {Propriétaire} </h6> </div>
                                                </div>
                                                <div className="desc">
                                                    <p>
                                                        {a}
                                                    </p>
                                                    <p>
                                                    {b}
                                                    </p>
                                                    <p>
                                                    {c}
                                                     </p>
                                                     <p>
                                                    {d}
                                                     </p>
                                                </div>
                                                
                                                <button  className='btn'>
                                                    RESERVE <HiOutlineClipboardCheck className="icon" />
                                                </button>
                                                

                                            </div>
                                        </div>   
                                    )
                            })
                        }
                </div>
        </section>
    )
}

export default Maison2