const Produit = require("../models/prodModel.js"); 

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nom || !req.body.description || !req.body.prix) {
    return res.status(400).send({
      message: "Le contenu du produit ne peut pas être vide.",
    });
  }

  const produit = new Produit({
    nom: req.body.nom,
    description: req.body.description,
    prix: req.body.prix,
  });

  // Save Product in the database
  produit
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue lors de la création du produit.",
      });
    });
};

// Retrieve all products from the database.
exports.findAll = (req, res) => {
  Produit.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue lors de la récupération des produits.",
      });
    });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
  Produit.findById(req.params.productId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Produit non trouvé avec l'ID " + req.params.productId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Produit non trouvé avec l'ID " + req.params.productId,
        });
      }
      return res.status(500).send({
        message: "Erreur lors de la récupération du produit avec l'ID " + req.params.productId,
      });
    });
};

// Update a product identified by the productId in the request
exports.update = (req, res) => {
  // Validate request
  if (!req.body.nom || !req.body.description || !req.body.prix) {
    return res.status(400).send({
      message: "Le contenu du produit ne peut pas être vide.",
    });
  }

  // Find product and update it with the request body
  Produit.findByIdAndUpdate(
    req.params.productId,
    {
      nom: req.body.nom,
      description: req.body.description,
      prix: req.body.prix,
    },
    { new: true } // Return the updated product
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Produit non trouvé avec l'ID " + req.params.productId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Produit non trouvé avec l'ID " + req.params.productId,
        });
      }
      return res.status(500).send({
        message: "Erreur lors de la mise à jour du produit avec l'ID " + req.params.productId,
      });
    });
};

// Delete a product with the specified productId in the request
exports.delete = (req, res) => {
  Produit.findByIdAndDelete(req.params.productId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Produit non trouvé avec l'ID " + req.params.productId,
        });
      }
      res.send({ message: "Produit supprimé avec succès!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Produit non trouvé avec l'ID " + req.params.productId,
        });
      }
      return res.status(500).send({
        message: "Impossible de supprimer le produit avec l'ID " + req.params.productId,
      });
    });
};
