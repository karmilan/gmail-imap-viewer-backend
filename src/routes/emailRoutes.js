import express from "express";
// import { ImapFlow } from "imapflow";
import Imap from 'node-imap';
import { inspect } from 'util';

const router = express.Router();

router.get("/emails", async (req, res) => {
    // console.log('req.session.user', req.body);

    // if (!req.body || !req.body.accessToken) {
    //     return res.status(401).json({ error: "Unauthorized" });
    // }

    // const { email, accessToken } = req.body;

    // const client = new ImapFlow({
    //     host: "imap.gmail.com",
    //     port: 993,
    //     secure: true,
    //     auth: {
    //         user: email,
    //         accessToken: accessToken, // Use OAuth access token
    //     },
    // });
    // // console.log('-----------------------------<>-----------------------------');
    // // console.log('client>>>>>', client);

    // try {
    //     await client.connect();
    //     console.log("Connected to Gmail IMAP");

    //     // Lock INBOX and fetch latest 5 emails
    //     let lock = await client.getMailboxLock("INBOX");
    //     let emails = [];

    //     try {
    //         for await (let message of client.fetch("1:5", { envelope: true })) {
    //             emails.push({
    //                 from: message.envelope.from[0].address,
    //                 subject: message.envelope.subject,
    //                 date: message.envelope.date,
    //             });
    //         }
    //     } finally {
    //         lock.release();
    //     }

    //     await client.logout();
    //     res.json({ emails });
    // } catch (error) {
    //     console.error("Error fetching emails:", error);
    //     res.status(500).json({ error: "Failed to fetch emails" });
    // }

    let imap = new Imap({
        user: "delftkarmilan@gmail.com",
        password: "20111997K@r",
        host: "imap.gmail.com",
        port: 993,
        tls: true
    });
    function openInbox(cb) {
        imap.openBox("INBOX", true, cb);
    }
    function isPrintable(str) {
        return /^[\x20-\x7E\s]*$/.test(str);
    }
    imap.once("ready", function () {
        openInbox(function (err, box) {
            if (err) throw err;
            let f = imap.seq.fetch(`${box.messages.total - 2}:${box.messages.total}`, {
                bodies: ["HEADER.FIELDS (FROM TO SUBJECT DATE)", "1"],
                struct: true
            });
            f.on("message", function (msg, seqno) {
                console.log(`Message #%d`, seqno);
                let prefix = `("` + seqno + `)`;
                msg.on("body", function (stream, info) {
                    let buffer = "";
                    stream.on("data", function (chunk) {
                        buffer += chunk.toString("utf8");
                    });
                    stream.once("end", function () {
                        if (info.which === "1") {
                            let decodedBody = "";
                            decodedBody = Buffer.from(buffer, "base64").toString("utf8");
                            if (isPrintable(decodedBody)) {
                                console.log(prefix + 'Parsed body: %s', decodedBody);
                            }
                            else
                                console.log(prefix + 'Parsed body: %s', buffer);
                        }
                        else
                            console.log(prefix + `Parsed header: %s`, inspect(Imap.parseHeader(buffer)));
                    });
                });
            });
            f.once("error", function (err) {
                console.log("Fetch error: " + err);
            });
            f.once("end", function () {
                console.log("Done fetching all messages!");
                imap.end();
            });
        });
    });


    imap.once("end", function () {
        console.log("Connection ended");
    });

    imap.connect();
});

export default router;