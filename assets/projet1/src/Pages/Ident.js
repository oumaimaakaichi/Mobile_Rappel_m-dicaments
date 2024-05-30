import React from 'react'
import Navbar from '../Components/Navbar/Navbar';
import Identification from '../Components/Identification/Identification';
import Home from '../Components/HomeVide/Home';


function Ident(){
    return(
        <div>
            <Navbar></Navbar>
            <Home></Home>
            <Identification></Identification>
        </div>
    )
}

export default Ident;