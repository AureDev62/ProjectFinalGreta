// Import de  multer/Importing multer 
const multer = require('multer');
// On configure du stockage des fichiers/Configure the file storage
const storage = multer.diskStorage({
    // On définit du dossier de destination des fichiers
    //We define the destination folder of the files
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    //On definit du nom du fichier/We define the name of the file
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});
//On filtre des fichiers/File filtering
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/webp'
    ) {
        // on accepte le fichier/we accept the file
        cb(null, true);
    } else {
        //on rejte le fichier/we reject the file
        cb(new Error('fichier invalide '));
    }
};
//on configure le téléversment du fichier/we configure the upload of the file
const upload = multer({ storage, fileFilter });
//on exporte le module/we export the module
module.exports = upload;
