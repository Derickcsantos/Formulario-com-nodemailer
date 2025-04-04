require('dotenv').config(); // Importando as variáveis de ambiente do .env
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000; // Vercel usa a variável de ambiente PORT

app.use(bodyParser.urlencoded({ extended: true }));

// Servir o arquivo HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Rota para enviar o email
app.post('/enviar-email', (req, res) => {
  const { nome, email, mensagem } = req.body;

  // Criação do transporte do Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,  // Usando a variável de ambiente
      pass: process.env.EMAIL_PASS   // Usando a variável de ambiente
    }
  });

  // Opções do email
  const mailOptions = {
    from: email,
    to: 'derickcampossantos1@gmail.com', // Email de destino
    subject: 'Mensagem de Contato',
    text: `Nome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`
  };

  // Enviar o email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Erro ao enviar o email');
    }
    console.log('Email enviado: ' + info.response);
    res.send('Mensagem enviada com sucesso!');
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
