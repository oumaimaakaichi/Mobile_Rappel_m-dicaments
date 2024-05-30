import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import  "../App";
import Homee from "./Homee"
import Header from "./Header";
import Home from "./Home";
function Asma2() {
  return (
    <div>
        <div className="header" >
            <Header/>
        </div>
        <div className="home">
            <Homee />
        </div>
    </div>
  );
}

export default Asma2;
