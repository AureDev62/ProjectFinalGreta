// Import du modèle Post/ Import the Post model
const Post = require('../models/posts');
// Import du middleware Multer/Import Multer middleware
const upload = require('../middleware/multer');
// Import du module fs pour gérer les fichiers/Import fs module to manage files
const fs = require('fs');

// Création un nouveau post/ Create a new post
exports.createPost = (req, res) => {
    //On utilise le middleware Multer pour gérer le téléchargement de fichiers
    //Use the Multer middleware to manage file downloads
    upload.single('photo')(req, res, async (err) => {
        if (err) {
            // Gestion des erreurs multer/ Handling multer errors
            return res.status(500).json({ error: "Une erreur s'est produite lors du téléchargement du fichier." });
        }
        try {
            // On récupére les données de la requête POST/Get the data from the POST request
            const { title, desc, category } = req.body;
            const imagePath = req.file.path; // Chemin du fichier téléchargé/ Path of downloaded file
            // console.log("Données du post :", { title, desc, category, imagePath });
            // Création d'un nouveau post avec les données fournies/ Create a new post with the data provided
            const newPost = new Post({
                title,
                desc,
                category,
                photo: imagePath,
            });
            // On sauvegarde du nouveau post dans la base de données/ Save the new post in the database
            const post = await newPost.save();
            // console.log("Post créé :", post);
            // Réponse réussie avec le post créé/ Successful response with the created post
            res.status(200).json(post);
        } catch (err) {
            res.status(500).json({ error: "Une erreur s'est produite lors de la création du post." });
        }
    });
};
// Suppression d'un post/ Delete a post
exports.deletePost = async (req, res) => {
    try {
        //On supprime un post par son ID/Delete a post by its ID
        const post = await Post.findOneAndDelete({ _id: req.params.id });
        //On vérifie si le post post existe///Check if the post post exists
        // console.log("Publication introuvable");
        if (!post) {
            return res.status(404).json("Publication introuvable");
        }
        // On supprime le fichier de la photo associée au post
        //Delete the photo file associated with the post
        fs.unlink(post.photo, (err) => {
            if (err) {
                console.error("erreur lors de la suppression de la photo", err);
            }
        })
        // console.log("Le post a été supprimé");
        res.status(200).json("Le post a été supprimé");
    } catch (err) {
        // console.log("Erreur lors de la suppression du post :", err);
        res.status(500).json(err);
    }
};
// Récupération d'un post par son ID/ Retrieve a post by its ID
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // console.log("Post récupéré :", post);
        //On vérifie si le post post existe/Check if the post post exists
        if (!post) {
            // console.log("Publication introuvable");
            //On renvoie une erreur si aucun post n'est trouvé/Resend an error if no post is found
            return res.status(404).json("Publication introuvable");
        }
        //On renvoie une reponse 200 si le post est trouvé/Return a 200 response if the post is found
        res.status(200).json(post);
    } catch (err) {
        // console.log("Erreur lors de la récupération du post :", err);
        res.status(500).json(err);
    }
};
// Récupération de tous les posts/ Retrieve all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        // console.log("Tous les posts récupérés :", posts);
        res.status(200).json(posts);
    } catch (err) {
        // console.log("Une erreur s'est produite lors de la récupération des posts :", err);
        res.status(500).json(err);
    }
};



