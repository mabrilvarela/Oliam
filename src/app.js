const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const initializePassport = require("./config/passport.config.js");
const cors = require("cors");
const path = require('path');
const PUERTO = 8080;
require("./database.js");


const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/cart.router.js");
const viewsRouter = require("./routes/views.router.js");
const userRouter = require("./routes/user.router.js");
const usuariosRouter = require("./routes/users.router.js");
const manejadorError = require("./middleware/error.js");
const compression = require("express-compression");
const addLogger = require("./utils/logger.js");
const configObject = require("./config/config.js");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use(passport.initialize());
initializePassport();
app.use(cookieParser());
app.use("/usuarios", usuariosRouter);
app.use(manejadorError);
app.use(addLogger);



const authMiddleware = require("./middleware/authmiddleware.js");
app.use(authMiddleware);

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", userRouter);
app.use("/", viewsRouter);

app.get("/loggertest", (req, res) => {
    req.logger.error("Error");
    req.logger.debug("Mensaje de debug");
    req.logger.info("Mensaje de Info");
    req.logger.warning("Mensaje de Warning");
    console.log(configObject.node_env);
    res.send("Test de logs");
})

const httpServer = app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});

 
const SocketManager = require("./sockets/socketmanager.js");
const generateMockProducts = require("./mocking/errors/mockingproducts.js");
new SocketManager(httpServer);