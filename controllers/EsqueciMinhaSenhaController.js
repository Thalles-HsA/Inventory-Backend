/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;
const sendinblueSMTPHost = process.env.SENDINBLUE_SMTP_HOST;
const sendinblueSMTPPort = process.env.SENDINBLUE_SMTP_PORT;
const sendinblueSMTPUser = process.env.SENDINBLUE_SMTP_USER;
const sendinblueSMTPPassword = process.env.SENDINBLUE_SMTP_PASSWORD;
const resetUrl = process.env.URL_RESET_SUA_SENHA;

if (!jwtSecret) {
  throw new Error('JWT_SECRET não está definido');
}

// Gerando o token de usuário
const gerarToken = (email) => jwt.sign({ email }, jwtSecret, {
  expiresIn: '1h',
});

// configuração do transportador de e-mail
const transporter = nodemailer.createTransport({
  host: sendinblueSMTPHost,
  port: sendinblueSMTPPort,
  auth: {
    user: sendinblueSMTPUser,
    pass: sendinblueSMTPPassword,
  },
});

// função para enviar e-mail
const enviarEmailRecuperacaoSenha = (destinatario, token, res) => {
  const mailOptions = {
    from: `Projeto Inventory ${sendinblueSMTPUser}`,
    to: destinatario,
    subject: 'Projeto Inventory - Recuperação de senha',
    text: `Olá,\n\nClique neste link para redefinir sua senha: ${resetUrl}/${token}\n\nEstá link tem validade de 1 hora\n\nSe você não solicitou uma redefinição de senha, ignore este e-mail.\n`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return res.status(500).json({ errors: ['Ocorreu um erro ao enviar o e-mail de recuperação'] });
    }
    return res.status(200).json({ message: ['E-mail de recuperação enviado com sucesso'] });
  });
};

const enviaEmailRecuperacaoSenha = async (req, res) => {
  const {
    email,
  } = req.body;

  const usuario = await Usuario.findOne({ email });

  // Checando se o usuário existe
  if (!usuario) {
    res.status(404).json({ errors: ['Usuário não cadastrado. Confira seu email ou realize seu cadastro'] });
    return;
  }

  const token = gerarToken(email.toString());

  enviarEmailRecuperacaoSenha(email, token, res);
};

const recuperaSenha = async (req, res) => {
  const {
    email,
    novaSenha,
    confirmarSenha,
  } = req.body;

  const usuario = await Usuario.findOne({ email });

  if (novaSenha !== confirmarSenha) {
    res.status(422).json({ errors: ['A confirmação de senha não é igual à nova senha.'] });
    return;
  }

  if (usuario !== null) {
    if (novaSenha && novaSenha !== null) {
      const salt = await bcrypt.genSalt();
      const senhaHash = await bcrypt.hash(novaSenha, salt);
      usuario.senha = senhaHash;
    }

    console.log(usuario);
    await usuario.save();
    res.status(200).json(usuario);
  }
};

module.exports = {
  enviaEmailRecuperacaoSenha,
  recuperaSenha,
};
