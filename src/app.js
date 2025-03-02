import cors from "cors";
import dotenv from "dotenv";
import express from 'express';
import session from "express-session";
import authRoutes from "./routes/authRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";

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

app.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' })
})

app.get('/test', (req, res) => (
    res.send('kk')
))



app.listen(5000, () => {
    console.log("running");

})
