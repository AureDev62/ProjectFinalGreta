// Import du module Express/Import the Express module
const express = require('express');
// Initialisation du routeur Express/Initializing the Express router
const router = express.Router();
// Import du contrôleur des utilisateurs/Import the user controller
const userController = require('../controllers/userControllers');


// Route pour obtenir tous les utilisateurs/Route to get all users
router.get('/', userController.getAllUsers);
// Route pour obtenir un utilisateur par son ID/Route to get a user by ID
router.get('/:id', userController.getUserById);
// Route pour mettre à jour un utilisateur par son ID/Route to update a user by ID
router.put('/:id', userController.updateUser);
// Route pour supprimer un utilisateur par son ID/Route to delete a user by ID
router.delete('/:id', userController.deleteUser);
// Export du routeur/Exporting the router
module.exports = router;