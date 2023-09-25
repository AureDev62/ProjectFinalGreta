// Import du module react(pour la gestion des composants )/Import the React module (for component management)
import React from 'react';
// Importation des composants Route et Routes de react-router-dom/Import the Route and Routes components from react-router-dom
import { Route, Routes } from 'react-router-dom';
// Importation du composant PublicLayout /Import the PublicLayout component
import PublicLayout from './LayoutPublic'
//import des différentes pages/Import of the different pages
import Home from './Home';
import Blog from './Blog';
import Contact from './Contact'
import Post from './Post'
import Error from '../Error'
import Terms from './Terms';
import Faq from './Faq';
import Privacy from './PrivacyPolicy';
import LegalNotice from './LegalNotice';

export default function RoutesPublic(){
    return (
        
        <>
        <Routes>
          <Route element ={<PublicLayout/>}>
            <Route index element ={<Home/>}/>
            <Route path ="/" element ={<Home/>}/>
            <Route path = "/blog" element  ={<Blog/>}/>
            <Route path="/contact" element ={<Contact/>}/> 
            <Route path ="/post/:postId" element ={<Post/>}/>
            <Route path="/faq" element ={<Faq/>}/>
            <Route path="/terms" element ={<Terms/>}/>
            <Route path="/privacypolicy" element ={<Privacy/>}/>
            <Route path="/legalenotice" element ={<LegalNotice/>}/>
            <Route path = "*" element ={<Error/>}/>
            </Route>
        </Routes>
        </>
    );
};

