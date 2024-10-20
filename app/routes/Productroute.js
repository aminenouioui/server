module.exports = (app) => {
    const App = require("../controllers/prodController.js"); // 
  
    app.post("/createP", App.create); 
    app.get("/get-allP", App.findAll);
  
    app.get("/products/:productId", App.findOne);
  
    app.put("/products/:productId", App.update);
  
    app.delete("/products/:productId", App.delete);
  };
  