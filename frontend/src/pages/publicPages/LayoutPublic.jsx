// Import du module react(pour la gestion des composants )/Import the React module (for component management)
import React from 'react';
// Import du composant du header/Importing the header component
import Header from '../../components/publicComponent/Header';
// Import du composant Outlet pour les routes/Importing the Outlet component for routes
import { Outlet } from 'react-router-dom';
// Import du composant de pied de page/Importing the footer component
import Footer from '../../components/publicComponent/Footer'


export default function LayoutPublic (){
    return (
        <>
            <Header/>
            <Outlet />
            <Footer />
     </>
    );
};

//Outlet point de sortie pour les routes enfants /Outlet acts as an outlet for child routes

