// Import des modules React / Import React modules
import React, { useState, useEffect } from 'react';
// Importation des modules React Router pour la navigation/ Import React Router modules for navigation
import { Link, useLocation ,Navigate} from 'react-router-dom';
// Import du composant Hamburger pour le menu déroulant/ Import Hamburger component for the dropdown menu
import { Twirl as Hamburger } from 'hamburger-react';
// Import du fichier CSS global pour le style/ Import global CSS file for styling
import "../../styles/_global.css"

export default function Header ()  {
   //On  vérifie si l'utilisateur est un administrateur en vérifiant le rôle dans le stockage local
  // Checks if the user is an admin by checking the role in local storage
  const isAdmin = localStorage.getItem('userRole') === 'admin';
  // On vérifie si l'utilisateur est connecté en vérifiant la présence d'un jeton d'authentification dans le stockage local
  // Checks if the user is logged in by checking the presence of an authentication token in local storage
  const isLoggedIn = localStorage.getItem('token');
  // On obtient le nom d'utilisateur de l'utilisateur connecté à partir du stockage local
  // Gets the username of the logged-in user from local storage
  const username = localStorage.getItem('userName');
  //On récupère l'URL actuelle à l'aide du hook useLocation/ Gets the current URL using the useLocation hook
  const location = useLocation();
  // État local pour le titre de la page, avec une valeur initiale par défaut/ Local state for the page title, with a default initial value
  const [pageTitle, setPageTitle] = useState('Fanatics Superhéros');
   // État local pour le menu déroulant, avec une valeur initiale par défaut de "false"
   // Local state for the dropdown menu, with a default initial value of "false"
  const [isOpen, setOpen] = useState(false);
   // Déconnexion de l'utilisateur en supprimant les données d'authentification du stockage local
   // Logs out the user by removing authentication data from local storage
   // Etat local 'redirectToHome' est utilisée pour contrôler la redirection vers la page home
   // Local state 'redirectToHome' is used to control the redirection to the home page
   const [redirectToHome, setRedirectToHome] = useState(false);
   // Déconnexion de l'utilisateur en supprimant les données d'authentification du stockage local
   // Logs out the user by removing authentication data from local storage
   const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
  //On définit la variable d'état 'redirectToHome' à true pour déclencher la redirection
  //Set the 'redirectToHome' state variable to true to trigger the redirection
    setRedirectToHome(true);
  };

  useEffect(() => {
    // Obtient le chemin de l'URL actuelle/ Gets the path of the current URL
    const path = location.pathname;
    let title = 'Fanatics Super-héros';
    // Si l'URL est la page d'accueil, met à jour le titre/ If the URL is the home page, update the title
    if (path === '/') {
      title = 'Fanatics Super-héros';
    } else if (path === '/blog') {
      title = 'Blog des super-héros';
    } else if(path.includes('/post')){
      title=null;
    }else if (path === '/contact') {
      title = 'Contact';
    }else if(path === '/terms'){
      title = 'C.G.U';
    }else if(path === '/faq'){
      title='FAQ';
    }else if(path === '/privacypolicy'){
      title = 'Politique de confidentialité';
    }else if(path === '/legalenotice'){
      title = 'Mentions légales';
    }
    // Met à jour le titre de la page et le titre du document/ Updates the page title and document title
    setPageTitle(title);
    document.title = title;
  }, [location.pathname]);

  useEffect(() => {
   
    setOpen(false);
  }, [location]);

  return (
    <>
    {redirectToHome && <Navigate to="/" replace={true} />}
      <header className="header">
        <nav className="nav-bar">
          <Link className="navlink" to="/" aria-label="Aller à la page d'accueil">
            <img
              className="logo"
              src={process.env.PUBLIC_URL + '/assets/images/icone-site.webp'}
              alt="Logo blog Fanatics Superhéros"
            />
          </Link>
          <Hamburger toggled={isOpen} color="white" rounded toggle={setOpen}  />
          <ul className={`${isOpen ? 'visible' : 'hidden'}`}>
            {isLoggedIn && (
              <li>
                <span className="navlinkSpan">Bienvenue {username}</span>
              </li>
            )}
            <li>
              <Link className="navlink" to="/blog" aria-label="Aller au blog">
                Blog
              </Link>
            </li>
            {!isLoggedIn && (
              <>
                <li>
                  <Link className="navlink" to="/auth/signin" aria-label="Aller à la page connexion">
                    Se connecter
                  </Link>
                </li>
                <li>
                  <Link className="navlink" to="/auth/signup" aria-label="Aller à la page s'inscrire">
                    S'inscrire
                  </Link>
                </li>
              </>
            )}
            {isLoggedIn && isAdmin && (
              <li>
                <Link className="navlink" to="/admin" aria-label="Aller à la page Admin">
                  Admin
                </Link>
              </li>
            )}
            <li>
              <Link className="navlink" to="/contact" aria-label="Aller à la page contact">
                Contact
              </Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link className="navlink " onClick={handleLogout}>
                <span className="material-symbols-outlined" aria-label="deconnexion">logout</span>
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <div className="headerImage">
        <h1 className="headerTitle">{pageTitle}</h1>
          <link rel="preload" fetchpriority="high" as="image" href="/assets/images/headerImg.webp" type="image/webp"></link>
          <img  fetchpriority="high" className="heroImage" src="/assets/images/headerImg.webp" alt="hero marvel comics" />
        </div>
      </header>
      
    </>
  );
};


