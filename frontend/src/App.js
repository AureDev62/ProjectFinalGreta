// Import du module React/ Import the React module
import React from 'react';
// Import des composants Route et Routes du module react-router-dom/Import the Route and Routes components from the react-router-dom module
import { Route, Routes } from 'react-router-dom';
// Import des routes publiques// Import the public routes
import RoutesPublic from './pages/publicPages/RoutePublic';
// Import du composant AdminGuard pour la protection des routes administrateur/Import the AdminGuard component for protecting admin routes
import GuardAdmin from './provider/GuardAdmin';
// Import des routes administrateur/Import the admin routes
import RoutesAdmin from './pages/admin/RouteAdmin';
// Import des routes d'authentification/Import the authentication routes
import RoutesAuthentification from './pages/Authentification/RouteAuthentification';
// Import du fichier CSS de l'application/Import the application's CSS file
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<RoutesPublic />} />
        <Route path="/admin/*" element={<GuardAdmin><RoutesAdmin /></GuardAdmin>} />
        <Route path="/auth/*" element={<RoutesAuthentification />} />
      </Routes>
    </>
  );
}

export default App;
