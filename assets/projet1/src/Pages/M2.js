import React from 'react'
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import Maison2 from '../Components/main2/Maison2';
import Home from '../Components/HomeVide/Home';

function M2(){
    return(
        <div>
            <Navbar></Navbar>
            <Home></Home>
            <Maison2></Maison2>
            <Footer></Footer>
        </div>
    )
}

export default M2