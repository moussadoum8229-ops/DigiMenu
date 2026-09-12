const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

// Connexion à la base de données
require("./Databases/Data");

const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // En mode production, autoriser l'origine configurée ou toutes les origines Vercel/Railway si non définie
        if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production' || !process.env.FRONTEND_URL) {
            callback(null, true);
        } else {
            callback(null, true);
        }
    },
    credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to DigiMenu Backend" });
});

const Auth = require("./Routes/Route");
app.use("/Auth", Auth);

const OrderRoutes = require("./Routes/OrderRoutes");
app.use("/api/orders", OrderRoutes);

const DashboardRoutes = require("./Routes/DashboardRoutes");
app.use("/api/dashboard", DashboardRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
