const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/compra', upload.none(), (req, res) => {
    const { nombre, email, producto } = req.body;

    // Configurar el transporte de nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Puedes usar otros servicios de correo
        auth: {
            user: 'tu_correo@gmail.com',
            pass: 'tu_contraseña'
        }
    });

    // Configurar el mensaje de correo
    const mailOptions = {
        from: 'tu_correo@gmail.com',
        to: 'destino_correo@gmail.com',
        subject: 'Nueva Compra Realizada',
        text: `Nombre: ${nombre}\nCorreo: ${email}\nProducto: ${producto}`
    };

    // Enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.json({ success: false, message: error.message });
        }
        res.json({ success: true, message: 'Correo enviado con éxito!' });
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});