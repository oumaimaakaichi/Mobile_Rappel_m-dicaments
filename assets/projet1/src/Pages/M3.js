import React from 'react'
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import Maison3 from '../Components/main3/Maison3';
import Home from '../Components/HomeVide/Home';

function M3(){
    return(
        <div>
            <Navbar></Navbar>
            <Home></Home>
            <Maison3></Maison3>
            <Footer></Footer>
        </div>
    )
}

export default M3