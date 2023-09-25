// Import des modules React et des hooks/Import React modules and hooks
import React, { useState, useEffect } from 'react';
// Import du fichier CSS pour le style/ Import the CSS file for styling
import "../../styles/_global.css"

export default function DashBoard() {
  // On déclare un état pour le nombre d'utilisateurs et une fonction pour le mettre à jour
  //Declare a state for the number of users and a function to update it
  const [userCount, setUserCount] = useState(0);
  // On déclare un état pour le nombre de publications et une fonction pour le mettre à jour
  //Declare a state for the number of posts and a function to update it
  const [postCount, setPostCount] = useState(0);
  // on déclare un état pour le dernier utilisateur inscrit et une fonction pour le mettre à jour
  //Declare a state for the latest registered user and a function to update it
  const [latestUser, setLatestUser] = useState(null);

  useEffect(() => {
    // Récupérer le nombre d'utilisateurs/Retrieve the number of users
    const fetchUserCount = () => {
      fetch('http://localhost:5000/backend/users')
        .then((response) => response.json())
        .then((data) => {
          console.log("Nbre d'utilisateurs:", data.length);
          setUserCount(data.length);

          const sortedUsers = data.sort((a, b) => {
            return new Date(b.registrationDate) - new Date(a.registrationDate);
          });

          setLatestUser(sortedUsers[0])
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération du nbre d'utilisateurs:", error);
        });
    };
    // Récupérer le nombre de publications/Retrieve the number of posts
    const fetchPostCount = () => {
      fetch('http://localhost:5000/backend/posts')
        .then((response) => response.json())
        .then((data) => {
          console.log("Nbre de posts:", data.length);
          setPostCount(data.length);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération du nbre de publications:', error);
        });
    };
    fetchUserCount();
    fetchPostCount();
  }, []);

  return (
    <div className="divDashboard">
      <h2 className="h2Dashboard">Tableau de bord</h2>
      <p className="pDashboard">Nombre d'utilisateurs : {userCount}</p>
      <p className="pDashboard">Nombre de publications : {postCount}</p>
      {latestUser && (
        <div className="divTwoDashboard" >
          <h2 className="h2Dashboard" >Dernier utilisateur inscrit :</h2>
          <p className="pDashboard">Nom : {latestUser.username}</p>
          <p className="pDashboard">Email : {latestUser.email}</p>
        </div>
      )}
    </div>
  );
};


