import express from "express";
import { createUser, getUserByEmail } from "../services/userService.js";

const router = express.Router();

router.post("/users", async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/users/:email", async (req, res) => {
    try {
        const user = await getUserByEmail(req.params.email);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;