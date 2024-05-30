import React from 'react'
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import FormulaireEtu from '../Components/FormulEtu/FormulaireEtu'
import Home from '../Components/HomeVide/Home';

function Form(){
    return(
        <div>
            <Navbar></Navbar>
            <Home></Home>
            <Home></Home>
            <FormulaireEtu></FormulaireEtu>
        </div>
    )
}

export default Form