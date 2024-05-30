import React from "react";
import ReactDom from "react-dom/client";
import {RouterProvider, Route , createBrowserRouter} from "react-router-dom";
import App from "./App";

import FinDePage from "./Pages/FinDePage";
import M1 from "./Pages/M1";
import M2 from "./Pages/M2";
import M3 from "./Pages/M3";
import For_prop from "./Pages/For_prop";
import PageAcceuil from "./Pages/PageAcceuil";
import Ident from "./Pages/Ident"
import LoginReg from "./Pages/LoginReg";
import Customers from "./Pages/Customers";
import Dashboard from "./Pages/Dashbaord";
import Inventory from "./Pages/Inventory";
import EspEtu from "./Esp-Etu";
import EspProp from "./EspProp";
import Asma from "./Asma";
import Form from "./Pages/Form"
import FormP from "./Pages/FormP"

import Home from "./Components/Home";
import Header from "./Components/Header";
import Homee from "./Components/Homee";
import Asma2 from "./Components/Asma2";
import Asmaet from "./Components/Asma";
const router = createBrowserRouter([
    {
      path: '/',
      element: <PageAcceuil/>
    },
    {
        path: '/NotreSociete',
        element: <FinDePage/>
    },
    {
        path: '/Maison1',
        element: <M1/>
    },
    {
        path: '/Maison2',
        element: <M2/>
    },
    {
        path: '/Maison3',
        element: <M3/>
    },
    {
        path: '/FourmulaireProprietaire',
        element: <For_prop/>
    },
    {
        path: '/QuiEtesVous?',
        element: <Ident/>
    },
    {
        path: '/login',
        element: <LoginReg />   
    },
    {
        path: '/asma',
        element: <Asma/>   
    },
    {
        path: '/EspaceProprietaire',
        element: <EspProp/>   
    },
    {
        path: '/Inventory',
        element: <Inventory/>   
    },
    {
        path: '/Customers',
        element: <Customers />   
    },
    {
        path: '/Dashboard',
        element: <Dashboard/>  
    },
    {
        path: '/FormulaireEtudiant',
        element: <Form/>   
    },
    ,
    {
        path: '/FormulaireProprietaire',
        element: <FormP/>   
    }
    ,
    {
        path: '/Asmaet',
        element: <Asmaet  />   
    }
    ,
    {
        path: '/Homee',
        element: <Homee  />   
    }
    ,
    {
        path: '/Header',
        element: <Header  />   
    }
    ,
    {
        path: '/Asma2',
        element: <Asma2 />   
    } ,
    {
        path: '/Home',
        element: <Home />   
    }
  ]);

const root = ReactDom.createRoot(document.getElementById('root'))

root.render(
    <RouterProvider router={router}/>
)