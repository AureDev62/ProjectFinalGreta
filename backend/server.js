//Importation des modules
//Importing Module
//Framework web pour Node.js/WebFramework for Node.js
const express = require('express');
//Middleware pour autoriser les requêtes cross-origin/Middlewre to allow cross-origin requests
const cors = require('cors');
//Module pour charger les variables d'environnements .env/Module to load environment variables from  .env files
const dotenv = require('dotenv');
//ODM(Object document model) pour interagir avec MongoDb//ODM to interactwith MongoDb
const mongoose = require('mongoose');
// Import du module helmet pour renforcer la sécurité de l'application
//Import the helmet module to enhance the security of the application.
const helmet = require('helmet');
//Port sur lequel le serveur va écouter//Port on which the server will listen
const PORT = 5000;
//import des diverses routes//Import of various routes
const signRoute = require("./routes/sign");
const userRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const path = require('path');//Module pour gérer les chemins de fichiers //module to handle file paths

// Chargement des variables d'environnement à partir du fichier .env / Loading environment variables from .env file
dotenv.config();

// Création de l'application Express / Creating Express application
const app = express();

// On active du middleware CORS / Activate CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', // On autorise les requêtes provenant du frontend/ Allow requests from the frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // On autorise ces méthodes HTTP/Allow these HTTP methods
    allowedHeaders: ['Authorization', 'Content-Type'], // On autorise ces en-têtes dans les requêtes/ Allow these headers in requests
    exposedHeaders: ['Content-Length', 'X-Custom-Header'], // On expose ces en-têtes dans les réponses/Expose these headers in responses
}));
// Middleware pour analyser les données de requête au format JSON / Middleware to parse JSON request data
app.use(express.json());
// Middleware pour analyser les données de requête au format URL-encoded / Middleware to parse URL-encoded request data
app.use(express.urlencoded({ extended: true }));

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            'img-src': ["'self'", 'data:', 'http://localhost:5000'],
        },
    })
);

// Connexion à la base de données / Connecting to the database
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connecté à la base de données"))
    .catch((err) => console.log(err));

//routes
// Route pour la page d'accueil / Route for the home page
app.get('/', (req, res) => res.send('Bienvenue sur le blog de Fanatics Superhéros'));

// app.get('*', (req, res) => res.status(501).send('Fonctionnalité réclamée non supportée par le serveur.'));

// Utilisation des routes pour l'authentification / Using routes for authentication
app.use("/backend/sign", signRoute);
// Utilisation des routes pour les utilisateurs / Using routes for users
app.use("/backend/users", userRoute);
// Utilisation des routes pour les publications / Using routes for posts
app.use("/backend/posts", postsRoute);
// Gestion des fichiers statiques (images) / Handling static files (images)
app.use('/images', express.static(path.join(__dirname, 'images')));

//démarrage serveur/Starting serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT} `)
});