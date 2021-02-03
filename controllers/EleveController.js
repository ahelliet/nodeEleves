const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

// Importation du modèle
let Eleve = require("../models/EleveModel.js");
let Classe = require("../models/ClasseModel.js");

// Méthodes
let findAllEleves = async function (req, res) {
  try {
    const eleves = await Eleve.find();
    res.send({ eleves });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

let newEleve = async function (req, res) {
    try {
      const eleve = await Eleve.create({
        ...req.body,
        classe : req.params.classe_id
      })
      res.status(201).json({ eleve })
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

let findEleve = async function (req, res) {
  try {
    const eleve = await Eleve.findOne({ _id: req.params.eleve_id }).populate("classe");
    res.send({ eleve });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

let updateEleve = async function (req, res) {
  try {
    const eleve = await Eleve.findByIdAndUpdate(req.params.eleve_id, {
      $set: req.body
    }, { new : true})
    res.status(201).json({ eleve })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

let deleteEleve = async function (req, res) {
  try {
    const eleve = await Eleve.findOne({_id : req.params.eleve_id})
    try {
      await Classe.findByIdAndUpdate({_id : eleve.classe}, {$pull: {eleves: req.params.eleve_id}})
      try {
        await Eleve.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "L'élève a été supprimé avec succès"})
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  findAllEleves,
  newEleve,
  findEleve,
  updateEleve,
  deleteEleve,
};
