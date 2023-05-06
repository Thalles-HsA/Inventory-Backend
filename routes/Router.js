const express = require('express');

const router = express();

router.use('/api/usuarios', require('./UsuariosRotas'));

module.exports = router;
