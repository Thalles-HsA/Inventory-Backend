const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error('JWT_SECRET não está definido');
}

const validateToken = async (req, res) => {
  const { token } = req.body;
  // Verificar se o cabeçalho (header) contém um token
  if (!token) {
    return res.status(401).json({ errors: ['Acesso negado!'] });
  }

  // Checando se o token é valido
  try {
    jwt.verify(token, jwtSecret);
    return res.status(200).json({ isValid: true });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ errors: ['O Token é inválido!'] });
  }
};

module.exports = {
  validateToken,
};
