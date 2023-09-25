// Import du module react(pour la gestion des composants )/Import the React module (for component management)
import React from 'react';
//Import de createRoot pour le rendu des composants/Import createRoot for component rendering
import { createRoot } from "react-dom/client";
//Import du css/Import the CSS file
import './index.css';
//Import du composant App.js/ Import the App component
import App from './App';

//Import de "BrowserRouter" pour la gestion des routes/Import "BrowserRouter" for route management
import { BrowserRouter } from 'react-router-dom';

//Création de la racine de l'application/Create the root of the application
const root = createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    <App />
  </BrowserRouter>

);

