const Commande = require("../models/commande.js");

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.date || !req.body.client || !req.body.produit ) {
    return res.status(400).send({
      message: "Le contenu du commande ne peut pas être vide.",
    });
  }

  const commande = new Commande({
    date: req.body.date,
    client:req.body.client,
    produit: req.body.produit,
  });

  // Save Product in the database
  commande
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
  Commande.find().populate('produit.product')
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
  commande.findById(req.params.productId)
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
        message: "Erreur lors de la récupération du commande avec l'ID " + req.params.productId,
      });
    });
};

// Update a product identified by the productId in the request
exports.update = (req, res) => {
  // Validate request
  if (!req.body.date || !req.body.client || !req.body.produit ) {
    return res.status(400).send({
      message: "Le contenu du commande ne peut pas être vide.",
    });
  }

  // Find product and update it with the request body
  Commande.findByIdAndUpdate(
    req.params.productId,
    {
        date: req.body.date,
        client: req.body.client,
        produit: req.body.produit,
    },
    { new: true } // Return the updated product
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "comande non trouvé avec l'ID " + req.params.commandeID,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "commande non trouvé avec l'ID " + req.params.commandeID,
        });
      }
      return res.status(500).send({
        message: "Erreur lors de la mise à jour du commande avec l'ID " + req.params.commandeID,
      });
    });
};

// Delete a product with the specified productId in the request
exports.delete = (req, res) => {
  Commande.findByIdAndDelete(req.params.commandeID)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "commande non trouvé avec l'ID " + req.params.commandeID,
        });
      }
      res.send({ message: "commande supprimé avec succès!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "commande non trouvé avec l'ID " + req.params.commandeID,
        });
      }
      return res.status(500).send({
        message: "Impossible de supprimer le commande avec l'ID " + req.params.commandeID,
      });
    });
};
