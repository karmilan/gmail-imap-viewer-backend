import cors from "cors";
import dotenv from "dotenv";
import express from 'express';
import session from "express-session";
import db from "./models/index.js";
import authRoutes from "./routes/authRoutes.js";
import emailMetadataRoutes from "./routes/emailMetadataRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express()

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(
    session({
        secret: process.env.CLIENT_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

// Routes
app.use("/auth", authRoutes);
app.use("/emails", emailRoutes);
app.use("/api", userRoutes);
app.use("/api", emailMetadataRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' })
})

app.get('/test', (req, res) => (
    res.send('kk')
))



// Sync database
db.sequelize.sync({ alter: true }) // Use { force: true } for fresh tables
    .then(() => console.log("Database connected & models synced"))
    .catch((err) => console.error("Error syncing database:", err));

app.listen(process.env.PORT, () => {
    console.log("running");

})
