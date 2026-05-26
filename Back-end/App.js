const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

// Connexion à la base de données
require("./Databases/Data");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to DigiMenu Backend" });
});

const Auth = require("./Routes/Route");
app.use("/Auth", Auth);

const OrderRoutes = require("./Routes/OrderRoutes");
app.use("/api/orders", OrderRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
