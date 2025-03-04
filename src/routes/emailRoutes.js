import express from "express";
import { ImapFlow } from "imapflow";

const router = express.Router();

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
            accessToken: accessToken, // Use OAuth access token
        },
    });
    // console.log('-----------------------------<>-----------------------------');
    // console.log('client>>>>>', client);

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