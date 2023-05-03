import React from 'react';
import {Outlet} from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './footer/Footer';

export default function Layout({children}) {

    return (
        <>

           <Navbar/>

            <Outlet context={children}/>

            <Footer/>
        </>
    );
};

