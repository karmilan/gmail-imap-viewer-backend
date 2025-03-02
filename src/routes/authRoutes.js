import express from "express";
import { OAuth2Client } from "google-auth-library";
import { ImapFlow } from "imapflow";

const router = express.Router();
const CLIENT_ID = process.env.CLIENT_ID;

const client = new OAuth2Client(CLIENT_ID);

// Google OAuth2 Login
router.post("/google", async (req, res) => {
    const { token } = req.body;
    console.log('token', token);

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });

        const payload = ticket.getPayload();
        req.session.user = {
            name: payload.name,
            email: payload.email,
            picture: payload.picture,
        };

        res.json({ user: req.session.user });
    } catch (error) {
        console.error("Error verifying Google token:", error);
        res.status(401).json({ error: "Invalid Google token" });
    }
});

// Get User Session
router.get("/user", (req, res) => {
    if (req.session.user) {
        res.json({ user: req.session.user });
    } else {
        res.status(401).json({ message: "No active session" });
    }
});

// Logout
router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: "Logout failed" });
        }
        res.json({ message: "Logout successful" });
    });
});


// fetch emails 
router.get("/emails", async (req, res) => {
    console.log('req.session.user', req.body);

    if (!req.body || !req.body.accessToken) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const { email, accessToken } = req.body;

    const client = new ImapFlow({
        host: "imap.gmail.com",
        port: 993,
        secure: true,
        auth: {
            user: email,
            // pass: 'xxxxxxx',
            accessToken: accessToken, // Use OAuth access token
        },
    });

    try {
        await client.connect();
        console.log("Connected to Gmail IMAP");

        // Lock INBOX and fetch latest 5 emails
        let lock = await client.getMailboxLock("INBOX");
        let emails = [];

        try {
            for await (let message of client.fetch("1:5", { envelope: true })) {
                emails.push({
                    from: message.envelope.from[0].address,
                    subject: message.envelope.subject,
                    date: message.envelope.date,
                });
            }
        } finally {
            lock.release();
        }

        await client.logout();
        res.json({ emails });
    } catch (error) {
        console.error("Error fetching emails:", error);
        res.status(500).json({ error: "Failed to fetch emails" });
    }
});

export default router;
