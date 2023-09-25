// Import des modules React /Import React modules
import React from 'react';
// Import de Routes, Route et Navigate depuis react-router-dom pour la navigation
// Import Routes, Route, and Navigate from react-router-dom for navigation
import { Routes, Route, Navigate } from 'react-router-dom';
// Import des différentes pages 
// Import the various pages 
import AdminLayout from './AdminLayout';
import DashBoard from './DashBoard';
import Users from './AdminUsers';
import Blog from './AdminBlog';

export default function AdminRoutes(){
    // Vérifie si l'utilisateur est un administrateur en se basant sur le rôle stocké dans le localStorage
  // Check if the user is an admin based on the role stored in localStorage
  const isAdmin = localStorage.getItem('userRole') === 'admin';
  // Si l'utilisateur n'est pas un administrateur, le rediriger vers la page d'accueil
  // If the user is not an admin, redirect them to the home page
  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <AdminLayout />
      <Routes>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/blog" element={<Blog />} />
      </Routes>
    </div>
  );
};


