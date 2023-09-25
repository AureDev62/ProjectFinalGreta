// Import des modules React /Import  React modules
import React from 'react';
// Import d'Outlet depuis react-router-dom pour afficher le contenu de la route parente
// Import Outlet from react-router-dom to display the content of the parent route
import { Outlet } from 'react-router-dom';
// Import du composant Header / Import the Header component 
import Header from '../../components/Admin/HeaderAdmin';

export default function AdminLayout(){
    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    );
};

;