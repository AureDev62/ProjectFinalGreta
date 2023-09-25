// Import du module Express/Importing the Express module
const express = require('express');
// Import du module Router depuis Express/Importing the Router module from Express
const router = express.Router();
// Import du contrôleur pour les opérations d'inscription/connexion
//Importing the controller for signup/signin operations
const signController = require('../controllers/signControllers');

// Route pour l'inscription d'un utilisateur/Route for user signup
router.post('/signup', signController.signup);
// Route pour la connexion d'un utilisateur/Route for user signin
router.post('/signin', signController.signin);
// Export du routeur/Export the router
module.exports = router;
