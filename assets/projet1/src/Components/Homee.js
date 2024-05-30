import React from 'react';
import "./Home.css";
import { Link } from 'react-router-dom';
import {FaCartArrowDown, FaUserAlt, FaSafari, FaTasks, FaCar} from 'react-icons/fa'
function Homee() {
  return (
    <div className='d-flex home'>
        <div className='d-flex sidebar flex-column flex-shrink-0  bg-dark'>
            <ul className='nav nav-pills flex-column mb-auto px-0 mt-3'> 
                <li className='nav-item '>                    
                    <a href="" className='nav-link text-white active'>
                        <FaSafari/> <span className='ms-2'>Dashboard</span>
                    </a>
                </li>


                <li className='nav-item '>                    
                    <a href="" className='nav-link text-white'>
                        <FaCartArrowDown/> <span className='ms-2'>Cars</span>
                    </a>
                </li>



                <li className='nav-item '>                    
                    <a href="" className='nav-link text-white'>
                        <FaUserAlt/> <span className='ms-2'>Drivers</span>
                    </a>
                </li>
                <li className='nav-item '>                    
                    <a href="" className='nav-link text-white'>
                        <FaTasks/> <span className='ms-2'>Report</span>
                    </a>
                </li>
            </ul>

        </div>
       
    </div>
  )
}

export default Homee