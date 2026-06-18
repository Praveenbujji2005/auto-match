const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 1. GMAIL CONFIG
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'praveenbujji1999@gmail.com', 
        pass: 'pzzpuqnlzptgywbr' // <--- PUT YOUR CODE HERE
    }
});

// 2. VERIFY CONNECTION
transporter.verify((error, success) => {
    if (error) {
        console.log("❌ EMAIL CONFIG ERROR: " + error);
    } else {
        console.log("✅ SUCCESS: Server is ready to send emails!");
    }
});

// 3. THE SUBMIT ROUTE
app.post('/submit', (req, res) => {
    console.log("📩 New Lead Received:", req.body.userName);

    const mailOptions = {
        from: 'praveenbujji1999@gmail.com',
        to: 'praveenbujji0001@gmail.com', 
        subject: `Lead: ${req.body.userName}`,
        html: `
            <h3>New Car Lead</h3>
            <p><strong>Name:</strong> ${req.body.userName}</p>
            <p><strong>Mobile:</strong> ${req.body.userMobile}</p>
            <p><strong>Email:</strong> ${req.body.userEmail}</p>
            <p><strong>Brand:</strong> ${req.body.brand}</p>
            <p><strong>Budget:</strong> ${req.body.budget}</p>
            <p><strong>Notes:</strong> ${req.body.notes}</p>
        `
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log("❌ MAIL ERROR:", err.message);
            res.status(500).send("Error sending mail: " + err.message);
        } else {
            console.log("🚀 EMAIL SENT SUCCESSFULLY!");
            res.send(`
                <div style="text-align:center; padding:50px; font-family:sans-serif;">
                    <h1 style="color: #00f2ff;">Submission Successful!</h1>
                    <p>We will contact you shortly.</p>
                    <a href="javascript:history.back()">Go Back</a>
                </div>
            `);
        }
    });
});

// 4. PREVENT CRASHING
process.on('uncaughtException', (err) => {
    console.log('Caught exception: ' + err);
});

// 5. START SERVER
app.listen(3000, '0.0.0.0', () => {
    console.log("-----------------------------------------");
    console.log("Server is LIVE on http://localhost:3000");
    console.log("KEEP THIS TERMINAL OPEN");
    console.log("-----------------------------------------");
});