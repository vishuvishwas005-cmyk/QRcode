const express = require('express');
const QRCode = require('qrcode');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route
app.post('/generate', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    }

    try {
        const qrCodeDataURL = await QRCode.toDataURL(text);
        res.json({ qrCode: qrCodeDataURL });
    } catch (err) {
        res.status(500).json({ error: 'Failed to generate QR code' });
    }
});

// server
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});