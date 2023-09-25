//Import des modules React et des hook/Import  React modules and hook
import React, { useEffect, useState } from 'react';
//  Import du fichier CSS pour le style/ Import the CSS file for styling
import "../../styles/_global.css"

export default function AdminUser() {
  // Déclaration des états
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
// Utilisation de useEffect pour exécuter fetchData une seule fois au chargement du composant
  useEffect(() => {
    fetchData();
  }, []);
// Fonction pour récupérer les données des utilisateurs depuis l'API
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/backend/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }
// Fonction pour supprimer un utilisateur
  const deleteUser = async (userId) => {
    try {
      await fetch(`http://localhost:5000/backend/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
      });
      console.log(`Utilisateur ${userId} supprimé.`);

      fetchData();
    } catch (error) {
      console.log(error);
    }
  }
// Fonction pour mettre à jour un utilisateur
  const handleUpdate = async () => {
    try {
      const userId = selectedUser._id;
      await fetch(`http://localhost:5000/backend/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedUser)
      });
      console.log(`${userId} supprimé.`);
      setSelectedUser(null);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
// Fonction pour sélectionner un utilisateur
  const selectUser = (user) => {
    setSelectedUser(user);
  };
  function formatDate(dateString) {
    if (!dateString) return "";
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleString('fr-FR', options);
  }
  return (
    <div className="divAdminUsers">
      <h1 className="h1AdminUsers">Liste des utilisateurs</h1>
      <div className="divTableAdminUsers">
        <table className="tableAdminUsers">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Date de création</th>
              <th>Dernière connexion</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map(user => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{formatDate(user.registrationDate)}</td>
                  <td>{formatDate(user.lastLogin)}</td>
                  <td>
                    <button className="buttonAdminUsers" onClick={() => deleteUser(user._id)}>Supprimer</button>
                    <button className="buttonAdminUsers" onClick={() => selectUser(user)}>Modifier</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Aucun utilisateur trouvé</td>
              </tr>
            )}
            {selectedUser && (
              <tr>
                <td>
                  <input
                    type="text"
                    value={selectedUser.username}
                    onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    type="email"
                    value={selectedUser.email}
                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                  />
                </td>
                <td>{formatDate(selectedUser.registrationDate)}</td>
                <td>{formatDate(selectedUser.lastLogin)}</td>
                <td>
                  <button className="buttonAdminUsers" onClick={handleUpdate}>Valider</button>
                  <button className="buttonAdminUsers" onClick={() => setSelectedUser(null)}>Annuler</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

