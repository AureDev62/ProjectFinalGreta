// Import des modules React nécessaires et des hook/Import necessary React modules and hooks
import React, { useState } from 'react';
// Import de Link et useNavigate depuis react-router-dom pour la navigation
// Import Link and useNavigate from react-router-dom for navigation
import { useNavigate, Link } from 'react-router-dom';
// Import du fichier CSS pour le style/ Import the CSS file for styling
import "../../styles/_global.css"

export default function Signin (){
   //on utilise le hook useSate pour gérer les divers états
  // Use the useState hook to manage various states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

    // Validation du nom d'utilisateur/validate username
  const validateUsername = (username) => {
    // - Doit avoir entre 4 et 20 caractères
    // - Ne doit contenir que des lettres, des chiffres et des tirets
    const regex = /^[a-zA-Z0-9-]{4,20}$/;
    return regex.test(username) ? username : null;
  };
   // Validation du mot de passe/validate password
  const validatePassword = (password) => {
    // - Doit avoir au moins 8 caractères
    // - Doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password) ? password : null;
  };
  //on gère la soumission du formualire/Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('envoyé');
    try {
      // Validation du nom d'utilisateur et du mot de passe/Validate username and password
      const validatedUsername = validateUsername(username);
      const validatedPassword = validatePassword(password);

      // Si l'username ou le password n'est pas valide, on arrête le traitement
      // If username or password is not valid, stop processing
      if (!validatedUsername || !validatedPassword) {
        setErrorMessage('Veuillez entrer un nom d\'utilisateur et un mot de passe valides.');
        return;
      }
      // Envoi d'une requête POST pour la connexion/Send a POST request for sign-in
      const res = await fetch('http://localhost:5000/backend/sign/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: validatedUsername,
          password: validatedPassword,
        }),
      });
       // Si la connexion réussit, enregistrement des données dans le localStorage
       // If sign-in is successful, save the data to localStorage
      if (res.ok) {
        const { user, token } = await res.json();
        localStorage.setItem('token', token);
        localStorage.setItem('userId', user._id);
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('userName', user.username);
         // Redirection vers la page d'accueil/ Navigate to the home page
        navigate('/');
      } else {
        setErrorMessage('La connexion a échoué. Veuillez vérifier vos informations.');
        console.error('La connexion a échoué');
      }
    } catch (error) {
      setErrorMessage("Une erreur s'est produite lors de la connexion.");
      console.error('Une erreur s\'est produite', error);
    }
  };
  return (
    <div className="signin">
      <div className="containerFormSignin">
        <h2 className="h2Signin">Se connecter</h2>
        <form className="formSignin" onSubmit={handleSubmit}>
          <div>
            <label className="labelSignin" htmlFor="username">Pseudo</label>
            <input
              type="text"
              id="username"
              className="inputSignin"
              placeholder="Entrer votre pseudo"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="labelSignin" htmlFor='password'>Password</label>
            <input
              type="password"
              id="password"
              className="inputSignin"
              placeholder="Entrer votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button className="buttonSignin" type="submit">Se connecter</button>
          </div>
          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        </form>
        <span className="spanSignin">Pas encore inscrit, <Link className="linkSignin" to="/auth/signup">c'est ici</Link></span>
        <span className="spanSignin">Retour à la page d'accueil <Link className="linkSignin" to="/">Cliquez ici</Link></span>
            </div>
      </div>
  );
};


