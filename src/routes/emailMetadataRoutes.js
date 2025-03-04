import express from "express";
import EmailMetadata from "../models/emailMetadata.js";

const router = express.Router();

// Get Emails by User ID
router.get("/metadata/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const emails = await EmailMetadata.findAll({ where: { userId } });
        res.status(200).json(emails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Create Email Metadata 
router.post("/metadata", async (req, res) => {
    try {
        const { subject, from, to, isRead, userId } = req.body;
        const email = await EmailMetadata.create({ subject, from, to, isRead, userId });
        res.status(201).json(email);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
export default router;