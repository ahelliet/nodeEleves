const dotenv = require("dotenv")
dotenv.config()
const express = require("express");
const routes = require('./router/router')
const mongoose = require("mongoose");

const app = express();

mongoose
.connect(`mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DBNAME}`, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() =>
console.log("Connecté avec succès à votre base de données mongoDB")
)
.catch((err) =>
console.error("Erreur de connexion avec votre base de données MongoDB", err)
);

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(routes)

app.listen(process.env.PORT, () =>
  console.log(`Serveur démarré sur le port ${process.env.PORT}!`)
);
