// Import du module react(pour la gestion des composants )/Import the React module (for component management)
import React from 'react';
// Importation des composants Route et Routes de react-router-dom/Import the Route and Routes components from react-router-dom
import {Routes, Route} from 'react-router-dom'
//import des différentes pages/Import of the different pages
import Signin from './Signin';
import Error from '../Error';
import Signup from './Signup';

export default function RouteAuthentification(){
    return (
        <Routes>
            <Route index element ={<Signin/>}></Route>
            <Route path="signin" element={<Signin/>}></Route>
            <Route path="signup" element={<Signup/>}></Route>
            <Route path="*" element={<Error/>}></Route>
        </Routes>
    );
};

