import React from 'react';
import { Link } from 'react-router-dom';
import"../../styles/_global.css"

export default function Header  ()  {
    return (
        <div>
            <header className="headerAdmin">
                <nav>
                    <ul className="headerUlAdmin">
                        <li className=" headerLiAdmin"><Link className=" headerLinkAdmin" to="/">Accueil</Link></li>
                        <li className=" headerLiAdmin"><Link className=" headerLinkAdmin" to="/admin/dashboard">Admin</Link></li>
                        <li className=" headerLiAdmin"><Link className=" headerLinkAdmin" to="/admin/users">Gestion des utilisateurs</Link></li>
                        <li className=" headerLiAdmin"><Link className=" headerLinkAdmin" to="/admin/blog">Gestion des articles</Link></li>
                    </ul>
                </nav>
            </header>
        </div>
    );
};

