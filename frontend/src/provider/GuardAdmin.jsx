// Import du module react(pour la gestion des composants )/Import the React module (for component management)
import React from 'react'
// Import du composant Navigate de react-router-dom pour la gestion de la navigation entre les pages
//Import the Navigate component from react-router-dom for handling page navigation
import {Navigate} from 'react-router-dom'

export default function AdminGuard({children}) {
    
  //On vérifie si l'utilisateur est un administrateur/Check if the user is an administrator
    const isAdmin = localStorage.getItem('userRole') === 'admin';
    //on vérifie si l'utilisateur est connecté/Check if the user is logged in
    const isLoggedIn = localStorage.getItem('token');

    //si l'utilisateur n'est pas connecté ou n'est pas administrateur/If the user is not logged in or is not an administrator
    if (!isLoggedIn ||  !isAdmin){

      //on redirige vers home tout en remplacant l'historique de navigation au cas si l'utilisateur fait precédent 
      //Redirect to the home page while replacing the navigation history in case the user goes back
      return <Navigate to ="/" replace={true}/>;  //replace
    }
    //on affiche les enfants du composant (en l'occurence le contenu protégé)/Render the children of the component (in this case, the protected content)
    return <>{children}</>;
  };

