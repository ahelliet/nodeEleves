const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {
  findAllClasses,
  findAllElevesFromClasse,
  newClasse,
  findClasse,
  updateClasse,
  deleteClasse
} = require("../controllers/ClasseController");
const {
  findAllEleves,
  newEleve,
  findEleve,
  updateEleve,
  deleteEleve
} = require("../controllers/EleveController");

/* CLASSES */
router.get("/classes", findAllClasses);
router.post("/classes", newClasse);
router.get("/classes/:classe_id", findClasse);
router.patch("/classes/:classe_id", updateClasse);
router.delete("/classes/:classe_id", deleteClasse);
router.post("/classes/:classe_id/eleves", newEleve)

/* ELEVES */
router.get("/eleves", findAllEleves);
router.get("/eleves/:eleve_id", findEleve);
router.patch("/eleves/:eleve_id", updateEleve);
router.delete("/eleves/:eleve_id", deleteEleve);

module.exports = router;
