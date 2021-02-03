const mongoose = require('mongoose');

module.exports = mongoose.model('Eleve', {
  nom: {
    type: String
  },
  prenom: {
    type: String
  },
  dateDeNaissance: {
    type: Date
  },
  appreciation: {
    type: String
  },
  moyenne: {
    type: Number
  },
  classe: {type: mongoose.Schema.Types.ObjectId, ref: 'Classe'}
})