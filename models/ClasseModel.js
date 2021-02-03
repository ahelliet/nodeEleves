const mongoose = require('mongoose');

module.exports = mongoose.model('Classe', {
  nom: {
    type: String
  },
  eleves: [{type: mongoose.Schema.Types.ObjectId, ref: 'Eleve'}]
})