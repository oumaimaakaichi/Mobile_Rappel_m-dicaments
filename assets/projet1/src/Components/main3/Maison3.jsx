import React from'react'
import './Maison3.css'
import img3 from '../../assets/img3.jpg'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {HiOutlineClipboardCheck} from 'react-icons/hi'

const Data =[
    {
        id:3,
        imgSrc:img3,
        titre:'Tunis, Mannouba',
        localisation: 'Slimen Kehya_Rue El Amal',
        prix:'280 DT',
        a: '-Nombre de chambres: 1 : Chambre, cuisine,et salle de bain. ',
        b:'-20 minutes station de métro: Slimen Kehya',
        c:'',
        d:'-Pas de WIFI',
        Propriétaire: "Aicha Ben Rejeb"
    }
]

const Maison3=() => {
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

export default Maison3