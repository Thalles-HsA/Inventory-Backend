const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error('JWT_SECRET não está definido');
}

const authGuard = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  // Verificar se o cabeçalho (header) contém um token
  if (!token) {
    return res.status(401).json({ errors: ['Acesso negado!'] });
  }

  // Checando se o token é valido
  try {
    const verified = jwt.verify(token, jwtSecret);

    req.usuario = await Usuario.findById(verified?.id).select('-senha');

    return next();
  } catch (err) {
    return res.status(400).json({ errors: ['O Token é inválido!'] });
  }
};

module.exports = {
  authGuard,
};
