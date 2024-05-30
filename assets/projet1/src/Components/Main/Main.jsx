import React from'react'
import img1 from '../../assets/img1.jpeg'
import img2 from '../../assets/img2.jpeg'
import img3 from '../../assets/img3.jpg'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {HiOutlineClipboardCheck} from 'react-icons/hi'
import { useNavigate } from 'react-router-dom';
import './main.css'

const Data =[
    {
        id:1,
        imgSrc:img1,
        titre:'Tunis, Mannouba',
        localisation: 'Rue Ibn Khaldoun',
        prix:'450 DT',
        Propriétaire: "Ahmed Ben Ali",
    },
    
      {  id:2,
        imgSrc:img2,
        titre:'Tunis, Bardo',
        localisation: 'Rue Khaznadar',
        prix:'375 DT',
        Propriétaire: "Samia Said",
    },
    
    {  id:3,
        imgSrc:img3,
        titre:'Tunis,Mannouba',
        localisation: 'Slimen Kehya_Rue El Amal',
        prix:'280 DT',
        Propriétaire: "Aicha Ben Rejeb",
    },
    {
        id:4,
        imgSrc:img1,
        titre:'Tunis, Mannouba',
        localisation: 'Rue Ibn Khaldoun',
        prix:'450 DT',
        Propriétaire: "Ahmed Ben Ali",
    },
    
      {  id:5,
        imgSrc:img2,
        titre:'Tunis, Bardo',
        localisation: 'Rue Khaznadar',
        prix:'375 DT',
        Propriétaire: "Samia Said",
    },
    
    {  id:6,
        imgSrc:img3,
        titre:'Tunis,Mannouba',
        localisation: 'Slimen Kehya_Rue El Amal',
        prix:'280 DT',
        Propriétaire: "Aicha Ben Rejeb",
    }
]


const Main =() => {
    const navigate = useNavigate();
    return (
        <section className='main container section'>
                <div className='secTitle'>
                    <h2 className='title'>
                        Les Maisons Disponibles:
                    </h2>
                </div>

                <div className='secContent grid'>
                        {
                            Data.map(({id,imgSrc,titre,localisation,prix,Propriétaire})=>{
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
                                                
                                                    
                                                    <button className="btn">
                                                      Contacte <HiOutlineClipboardCheck className="icon" />
                                                    </button>     
                                                    &nbsp;&nbsp;&nbsp;                                        
                                                    <button onClick={()=> {navigate('/Maison'+id)}} className="btn">
                                                        Plus de Détails<HiOutlineClipboardCheck className="icon" />
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

export default Main