import React from'react'
import img1 from '../../assets/img1.jpeg'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {HiOutlineClipboardCheck} from 'react-icons/hi'
import './maison1.css'

const Data =[
    {
        id:1,
        imgSrc:img1,
        titre:'Tunis, Mannouba',
        localisation: 'Rue Ibn Khaldoun',
        prix:'450 DT',
        Propriétaire: "Ahmed Ben Ali",
        a: '-Nombre de chambres: 2 :Salon, Chambre à 2',
        b:'-Prés de station de métro: Slimen Kehya',
        c:'-Prés de centre Mannouba, super marché, magasin Général',
        d:'-Gaz de ville , WIFI'
    }
]


const maison1=() => {
    return (
        
        <section className='main container section'>
                <div className='secTitle'>
                    <h3 className='title'>
                    </h3>
                </div>
                <div className='secContent grid'>
                        {
                            Data.map(({id,imgSrc,titre,localisation,prix,Propriétaire,a,b,c,d})=>{
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

export default maison1