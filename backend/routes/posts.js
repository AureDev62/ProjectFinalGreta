// Import du module Express/Import the Express module
const express = require('express');
// Initialisation du routeur Express/Initializing the Express router
const router = express.Router();
// Import du contrôleur des publications/Import the post controller
const postController = require('../controllers/postControllers');

// On définie des routes avec leurs correspondantes fonctions du contrôleur
// Define routes with their corresponding controller functions

// Route pour la création de post/Route for post creation
router.post('/', postController.createPost);
// Route pour obtenir tous les posts/Route to get all posts
router.get('/', postController.getAllPosts);
// Route pour obtenir les posts par ID/Route to get posts by ID
router.get('/:id', postController.getPostById);
// Route pour supprimer un post par son ID/Route to delete a post by its ID
router.delete('/:id', postController.deletePost);

// Export du routeur/Export the router
module.exports = router;
