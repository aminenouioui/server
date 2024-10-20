const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema(
  { nom: String,
    description: String,
    prix: Number,
    Image:[String]
}, );


module.exports = mongoose.model('Produit', ProductSchema);