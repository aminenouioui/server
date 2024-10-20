module.exports = (app) => {
    const App = require("../controllers/commandcontroller.js"); // 
  
    app.post("/createC", App.create); 
    app.get("/get-allc", App.findAll);
  
    app.get("/commande/:commandeID", App.findOne);
  
    app.put("/commande/:commandeID", App.update);
  
    app.delete("/commande/:commandeID", App.delete);
  };
  