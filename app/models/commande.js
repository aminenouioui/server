const mongoose = require('mongoose');


const commandSchema = new mongoose.Schema(
  { date: Date,
    client: String,
    produit: [{product:{type: mongoose.Schema.Types.ObjectId,ref:'Produit'},quantity:Number}],
}, 
);


module.exports = mongoose.model('commande', commandSchema);