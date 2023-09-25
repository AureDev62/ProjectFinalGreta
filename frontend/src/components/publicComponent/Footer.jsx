import React from 'react';
import { Link } from 'react-router-dom';
import "../../styles/_global.css"

export default function Footer ()  {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <h3 className="h2Footer">Fanatics Superhéros</h3>
          <div className="divFooter">
            <div className="leftFooter">
              <h3 className="h3Footer">Qui sommes-nous</h3>
              <Link className="navLinkIcone" to="/" aria-label="Aller à la page accueil">
                <img src={process.env.PUBLIC_URL + '/assets/images/icone-site.webp'} alt="Logo Fanatics Superhéros" className="logoFooter" />
              </Link>
              <nav className="navLeftFooter">
                <ul className="ulLeftFooter">
                  <li>
                    <Link className="navLinkFooter" to="/blog" aria-label="Aller à la page blog">Blog</Link >
                  </li>
                  <li>
                    <Link className="navLinkFooter" to="/auth/signin" aria-label="Aller à la page se connecter">Se connecter</Link>
                  </li>
                  <li>
                    <Link className="navLinkFooter" to="/auth/signup" aria-label="Aller à la page s'inscrire">S'inscrire</Link>
                  </li>
                  <li>
                    <Link className="navLinkFooter" to="/contact" aria-label="Aller à la page contact">Contacter nous</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="middleFooter">
            <h3 className="h3Footer">Liens utiles</h3>
              <ul className="ulMiddleFooter">
                <li>
                  <Link className="navLinkFooter" to="/faq" aria-label="Aller à la page Foire aux questions">F.A.Q</Link>
                </li>
                <li>
                  <Link className="navLinkFooter" to="/terms" aria-label="Aller à la page CGU">CGU</Link>
                </li>
                <li>
                  <Link className="navLinkFooter" to="/privacypolicy" aria-label="Aller à la page politique de confidentialité">Politique de confidentialité</Link>
                </li>
                <li>
                  <Link className="navLinkFooter"to="/legalenotice" aria-label="Aller à la page mentions légales">Mentions légales</Link>
                </li>
                <li>
                  <Link className="navLinkFooter" to="/managecookie" aria-label="Aller à la page gestion des cookies">Gestion des cookies</Link>
                </li>
              </ul>
            </div>
            <div className="rightFooter">
            <h3 className="h3Footer">Suivez nous</h3>
              <ul className="ulRightFooter">
                <li>
                  <Link className="navLinkFooter" to ="https://fr-fr.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Aller sur le site Facebook">
                    <img className="iconReseauFooter" src={process.env.PUBLIC_URL + '/assets/icons/facebook.png'} alt="icon facebook" /></Link>
                </li>
                <li>
                  <Link className="navLinkFooter" to ="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Aller sur le site Instagram">
                    <img className="iconReseauFooter"  src={process.env.PUBLIC_URL + '/assets/icons/instagram.png'} alt="icon instagram" /></Link>
                </li>
                <li>
                  <Link className="navLinkFooter" to ="https://twitter.com/"target="_blank" rel="noopener noreferrer" aria-label="Aller sur le site twitter">
                    <img className="iconReseauFooter"  src={process.env.PUBLIC_URL + '/assets/icons/twitter.png'} alt="icon twitter" /></Link>
                </li>
              </ul>
            </div>
          </div>
        <div className="copyrightFooter">
          <span className='copyright'>&copy;  {currentYear} Fanatics Superheroes</span>
        </div>
    </footer>
  );
};


