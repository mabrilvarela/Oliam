const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://mabrilvarela:coderhouse@cluster0.ddtseea.mongodb.net/E-commerce?retryWrites=true&w=majority")
    .then(() => console.log("Conexión exitosa"))
    .catch(() => console.log("Error al intentar conexión"))