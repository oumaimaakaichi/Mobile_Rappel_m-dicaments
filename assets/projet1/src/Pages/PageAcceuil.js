import React from 'react'
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import Home from '../Components/Home/Home';
import Main from "../Components/Main/Main";

function PageAcceuil(){
    return(
        <div>
            <Navbar></Navbar>
            <Home></Home>
            <Main></Main>
            <Footer></Footer>
        </div>
    )
}

export default PageAcceuil