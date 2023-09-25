// Import du modèle User/Importing the User model
const User = require('../models/user');
// On récupére tous les utilisateurs/// Retrieve all users
exports.getAllUsers = async (req, res) => {
    try {
        //On récupère tous les utilisateurs de la base de données/Get all the users from the database
        const users = await User.find();

        // console.log('Liste des utilisateurs :', users);

        //On renvoie les utilisateurs en tant que réponse avec le statut 200/// return users as a response with status 200
        res.status(200).json(users);
    } catch (error) {
        // En cas d'erreur, renvoie une réponse avec le statut 500 et un message d'erreur
        // In case of error, returns a response with status 500 and an error message
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des utilisateurs.' });
    }
};
// Récupération d'un utilisateur par son ID/ Retrieve a user by his ID
exports.getUserById = async (req, res) => {
    //ON extracte l'ID du paramètre de la requête/ Extract the query parameter ID
    const { id } = req.params;
    try {
        //On récupère un utilisateur de la base de données en utilisant son ID
        //Retrieve a user from the database using his ID
        const user = await User.findById(id);
        //On vérifie si l'utilisateur existe/Check if the user exists
        if (!user) {
            // Si l'utilisateur n'est pas trouvé, renvoie une réponse avec le statut 404 et un message d'erreur
            //If the user is not found, returns a response with status 404 and an error message
            res.status(404).json({ error: 'Utilisateur non trouvé.' });
            return;
        }
        // console.log('Utilisateur trouvé :', user);
        //On renvoie l'utilisateur en tant que réponse avec le statut 200
        //Return the user as a response with status 200
        res.status(200).json(user);
    } catch (error) {
        // En cas d'erreur, renvoie une réponse avec le statut 500 et un message d'erreur
        // In case of error, returns a response with status 500 and an error message
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération de l\'utilisateur.' });
    }
};
// Mis à jour à jour un utilisateur
exports.updateUser = async (req, res) => {
    const { id } = req.params
    const { username, email, password } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, { username, email, password }, { new: true });
        if (!user) {
            res.status(404).json({ error: 'Utilisateur non trouvé.' });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la mise à jour de l\'utilisateur.' });
    }
};
// Suppression d'un utilisateur/Deleting a user
exports.deleteUser = async (req, res) => {
    //On extracte l'ID du paramètre de la requête/Extract the ID of the query parameter
    const { id } = req.params;
    try {
        //On recherche et supprime un utilisateur de la base de données en utilisant son ID
        //Find and remove a user from the database using their ID
        const user = await User.findByIdAndDelete(id);
        // on vérifie si l'utilisateur existe/Checks if the user exists
        if (!user) {
            // Si l'utilisateur n'est pas trouvé, renvoie une réponse avec le statut 404 et un message d'erreur
            // If the user is not found, return a response with status 404 and an error message
            res.status(404).json({ error: 'Utilisateur non trouvé.' });
            return;
        }
        // console.log('Utilisateur supprimé.');
        //On renvoie une réponse avec le statut 200 et un message de succès
        //Return a response with status 200 and a success message
        res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
    } catch (error) {
        // En cas d'erreur, renvoie une réponse avec le statut 500 et un message d'erreur
        // In case of error, returns a response with status 500 and an error message
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la suppression de l\'utilisateur.' });
    }
};



