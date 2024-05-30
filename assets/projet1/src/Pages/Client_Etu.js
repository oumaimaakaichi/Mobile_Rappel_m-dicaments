import React from 'react'
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

import Identification from '../Components/Identification/Identification';

function Client_Etu(){
    return(
        <>
            <Navbar></Navbar>
            <Identification></Identification>
            <Footer></Footer>
        </>
    )
}

export default Client_Etu