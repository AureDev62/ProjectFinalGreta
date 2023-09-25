// Import du module bcrypt pour le hachage des mots de passe/ Import the bcrypt module for password hashing
const bcrypt = require('bcrypt');
// Import du model User pour interagir avec la base de données des utilisateurs
//Import the User model to interact with the user database
const User = require('../models/user');
// Import du module jsonwebtoken pour la création et la vérification des tokens JWT
//Import the jsonwebtoken module for JWT token creation and verification
const jwt = require('jsonwebtoken');

// Durée d'expiration du token (une journée)/Token expiration duration (one day)
const expirationDuration = 24 * 60 * 60;
// Fonction qui crée un token JWT en utilisant l'identifiant passé en argument
//Function that creates a JWT token using the provided ID
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: expirationDuration
    });
};
//enregistrement d'un nouvel utilisateur/User registration
exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // On vérifie du nom d'utilisateur (entre 4 et 20 caractères alphanumériques)
        // Check the username (between 4 and 20 alphanumeric characters)
        const usernameRegex = /^[a-zA-Z0-9]{4,20}$/;
        if (!usernameRegex.test(username)) {
            return res.status(400).json("Nom d'utilisateur incorrect");
        }
        // Vérification de la syntaxe de l'adresse e-mail
        //// Check the syntax of the e-mail address
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json("Adresse e-mail invalide");
        }
        // On vérifie du mot de passe (au moins 8 caractères,lettre minuscule, une lettre majuscule et un chiffre
        // Check the password (at least 8 characters,an uppercase letter, lowercase letter and a number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json("Mot de passe incorrect");
        }
        //on applique la fonction trim pour supprimer les espaces en début et fin de chaînes
        //Trim spaces at the beginning and end strings
        const trimUserName = username.trim()
        const trimEmail = email.trim();
        const trimPassword = password.trim();

        // Vérification de l'utilisateur s'il existe déjà dans la base de données avec le username
        //Check if the user already exists in the database using the username
        const existingUser = await User.findOne({ username: trimUserName });
        if (existingUser) {
            return res.status(400).json("L'utilisateur existe déjà");
        }
        // Générer un sel et hasher le mot de passe/Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(trimPassword, salt);

        // Création d'un nouvel utilisateur/ Create a new user
        const newUser = new User({
            username: trimUserName,
            email: trimEmail,
            password: hashedPassword,
        });
        // Sauvegarde du nouvel utilisateur dans la base de données/Save the new user to the database
        const savedUser = await newUser.save();
        // console.log("Nouvelle Utilisateur sauvegardé:", savedUser);

        // Renvoyer la réponse avec le nouvel utilisateur créé
        //Return the response with the newly created user
        res.status(200).json(savedUser);
    } catch (err) {
        // En cas d'erreur lors de l'enregistrement, renvoyer une réponse avec un code d'erreur 500 (Internal Server Error) et l'objet d'erreur
        //In case of an error during registration, return a response with the 500 (Internal Server Error) code and the error object
        res.status(500).json(err);
    }
};
// Connexion d'un utilisateur/User login
exports.signin = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Vérification de la syntaxe de l'adresse e-mail
        //// Check the syntax of the e-mail address
        const usernameRegex = /^[a-zA-Z0-9]{4,20}$/;
        if (!usernameRegex.test(username)) {
            return res.status(400).json("Nom d'utilisateur incorrect");
        }
        //on applique la fonction trim pour supprimer les espaces en début et fin de chaînes
        //Trim spaces at the beginning and end strings
        const trimUserName = username.trim()
        const trimPassword = password.trim();

        // Vérification de l'utilisateur s'il existe dans la base de données/Check if the user exists in the database using the username
        const user = await User.findOne({ username: trimUserName });
        if (!user) {
            // Si aucun utilisateur correspondant n'est trouvé, renvoie d'une erreur/If no matching user is found, return an error
            return res.status(400).json("Identifiant incorrect");
        }

        // Vérification si le mot de passe est correct/Check if the password is correct
        const passwordMatch = await bcrypt.compare(trimPassword, user.password);
        if (!passwordMatch) {
            // Si les mots de passe ne correspondent pas, renvoie d'une erreur
            return res.status(400).json("Mot de passe incorrect");
        }
        //mise a jour de la date de dernière connexion/Update the last login date
        user.lastLogin = new Date();
        await user.save();
        // console.log("Utilisateur connecté:", user);

        // Générer un nouveau token pour l'utilisateur authentifié/Generate a new token for the authenticated user
        const generateToken = createToken(user._id);

        // Enregistrement du token dans le local storage/Save the token to the local storage
        res.cookie('token', generateToken, { httpOnly: true, expires: new Date(Date.now() + expirationDuration * 1000) });

        // On renvoie la réponse avec l'utilisateur sans le mot de passe et le token
        //Return the response with the user (without the password) and the token
        const { password: omitPassword, ...userData } = user;
        res.status(200).json({ user: user, token: generateToken });
    } catch (err) {
        // En cas d'erreur lors de la connexion, renvoyer une réponse avec un code d'erreur 500 (Internal Server Error) et l'objet d'erreur
        // In case of an error during login, return a response with the 500 (Internal Server Error) code and the error object
        res.status(500).json(err);
    }
};