// On importe les modules dont on a besoin
// en l'occurence express et dotenv
const express = require("express");
require("dotenv").config();

// On crée l'application express
const api = express();

//  On lance le serveur sur le port donné dans le fichier .env
api.listen(process.env.API_PORT, () => {
	console.log(`API is running on port ${process.env.API_PORT}`);
});
