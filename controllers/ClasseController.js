const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

// Importation du modèle
let Classe = require("../models/ClasseModel.js");
let Eleve = require("../models/EleveModel.js");

/* Méthodes */
// Récupérer la liste des classes
let findAllClasses = async function (req, res) {
  const classes = await Classe.find();
  res.status(200).json({ classes : classes})
};

// Créer une classe
let newClasse = async function (req, res) {
  const classe = new Classe({
    ...req.body
  });
  try {
    await Classe.create(classe);
    res.status(200).json({ classe : classe})
  } catch (error) {
    res.status(500).json({ message : error.message})
  }
};

// Retrouve une classe
let findClasse = async function (req, res) {
  try {
    var classe = await Classe.findOne({_id: req.params.classe_id})
    .populate("eleves")
    if (classe.populated('eleves')) {
      res.status(200).json({ classe : classe })
    } else {
      res.status(200).json({ message : "Aucun élève dans cette classe"})
    }
  } catch (error) {
    res.status(500).json({ message : error.message})
  }
};

// Mets à jours une classe
let updateClasse = async function (req, res) {
  try {
    const classe = await Classe.findByIdAndUpdate(req.params.classe_id, {nom : req.body.nom})
    res.status(200).json({ classe : classe })
  } catch (error) {
    res.status(500).json({ message : error.message})
  }
};

// Supprime une classe
let deleteClasse = async function (req, res) {
  try {
    await Classe.findByIdAndDelete(req.params.classe_id)
    res.status(200).json({ message : "La classe a été supprimé avec succès"})
  } catch (error) {
    res.status(500).json({ message : error.message})
  }
};

module.exports = {
  findAllClasses,
  newClasse,
  findClasse,
  updateClasse,
  deleteClasse,
};
