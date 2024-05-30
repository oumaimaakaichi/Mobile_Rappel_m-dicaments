import React from 'react'
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import FormulaireProp from '../Components/FormulProp/FormulaireProp'
import Home from '../Components/HomeVide/Home';

function FormP(){
    return(
        <div>
            <Navbar></Navbar>
            <Home></Home>
            <Home></Home>
            <FormulaireProp></FormulaireProp>
        </div>
    )
}

export default FormP