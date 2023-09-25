// Import des modules React nécessaires et des hook/Import necessary React modules and hooks
import React, { useState } from 'react';
// Import de Link et useNavigate depuis react-router-dom pour la navigation
// Import Link and useNavigate from react-router-dom for navigation
import { Link, useNavigate  } from 'react-router-dom';
// Import du fichier CSS pour le style/ Import the CSS file for styling
import "../../styles/_global.css"

export default function Signup() {
  //on utilise le hook useSate pour gérer les divers états
  // Use the useState hook to manage various states
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate =useNavigate();

//on vérifie le username, l'email et le password avec les expressions régulières(regex)
//Check the username, the email and the password with regular expressions (regex)
  const validateUsername = (username)=>{
  const regex = /^[a-zA-Z0-9-]{4,20}$/;
  return regex.test(username) ? username : null;
  };
  const validateEmail =(email)=>{
  const regex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email) ? email : null;
  }
  const validatePassword =(password)=>{
  const regex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password) ? password : null;
  }
//on gère la soumission du formulaire/Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMessage('');
// On valide du nom d'utilisateur/Validate username
  const validatedUsername =validateUsername(username)
  //On valide de l'email//Validate email
  const validatedEmail = validateEmail(email)
  // On valide du mot de passe/Validate password
  const validatedPassword = validatePassword(password);

 // Si le nom d'utilisateur, l'email ou le mot de passe n'est pas valide, on arrête le traitement
 // If username, email or password is not valid, stop processing
  if (!validatedUsername) {
    setErrorMessage('Le pseudo doit etre compris entre 4 et 20 carcatères')
    return;
  }
  if (!validatedEmail) {
    setErrorMessage('Le email n\'est pas valide')
    return;
  }
  if (!validatedPassword) {
    setErrorMessage('Le mot de passe doit contenir au moins 8 caractères, dont une minuscule, une majuscule et un chiffre')
    return;
  }
// Si le mail ou la confirm mail n'est pas valide, on arrête le traitement
// If email or confirm email is not valid, stop processing
  if (email !== confirmEmail) {
    setErrorMessage("L'email et la confirmation de l'email ne correspondent pas.");
    return;
  }
// Si le password ou la confirm password n'est pas valide, on arrête le traitement
// If password or confirm password is not valid, stop processing
  if (password !== confirmPassword) {
    setErrorMessage("Le mot de passe et la confirmation du mot de passe ne correspondent pas.");
    return;
  }
  try {
    //envoie de la requête pour le signup/Send signup request
    const res = await fetch('http://localhost:5000/backend/sign/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: validatedUsername,
        email:validatedEmail,
        password: validatedPassword,
      }),
    });
//Si ok on redirige vers la page de connexion/if the request is successful, redirect to the signin page
    if (res.ok) {
      console.log("Enregistrement ok");
      navigate("/auth/signin");
    } else if (res.status === 400) {
      setErrorMessage("Cet utilisateur existe déjà");
    }
  } catch (error) {
    console.error(error);
    setErrorMessage("Une erreur s'est produite.");
  }
};
  return (
    <div className="signup">
      <div className="containerFormSignup">
        <h2 className="h2Signup">Inscription</h2>
        <form className="formSignup" onSubmit={handleSubmit}>
          <label htmlFor="username" className="labelSignup">Pseudo</label>
          <input
            type="text"
            id="username"
            className="inputSignup"
            placeholder="Entrez votre nom d'utilisateur..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="email" className="labelSignup">Email</label>
          <input
            type="email"
            id="email"
            className="inputSignup"
            placeholder="Entrez votre email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label  htmlFor="confirmEmail" className="labelSignup">Confirmer l'email</label>
          <input
            type="email"
            id="confirmEmail"
            className="inputSignup"
            placeholder="Confirmez votre email..."
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            required
          />
          <label htmlFor="password" className="labelSignup">Mot de passe</label>
          <input
            type="password"
            id="password"
            className="inputSignup"
            placeholder="Entrez votre mot de passe..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label  htmlFor="confirmPassword" className="labelSignup">Confirmer le mot de passe</label>
          <input
            type="password"
            id="confirmPassword"
            className="inputSignup"
            placeholder="Confirmez votre mot de passe..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button className="buttonSignup" type="submit">S'inscrire</button>
          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        </form>
        <span className="spanSignup">Si vous êtes déjà inscrit, <Link className="linkSignup" to="/auth/signin">connectez vous</Link></span>
        <span className="spanSignup">Retour à la page d'accueil <Link className="linkSignup" to="/">Cliquez ici</Link></span>
      </div>
    </div>
  );
}
