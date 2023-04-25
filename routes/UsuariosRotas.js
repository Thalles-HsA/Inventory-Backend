const expressRoute = require('express');

const router = expressRoute.Router();

// Controller
const {
  registrar, usuarioAtivo, login, atualizacao,
} = require('../controllers/UsuarioController');

// Middlewares
const { validate } = require('../middlewares/handleValidations');
const { validacaoDeUsuario, validacaoDeLogin, atualizacaoDeUsuario } = require('../middlewares/validacaoDeUsuario');
const { authGuard } = require('../middlewares/authGuard');

// Routes

router.post('/cadastro', validacaoDeUsuario(), validate, registrar);
router.post('/login', validacaoDeLogin(), validate, login);
router.get('/perfil', authGuard, usuarioAtivo);
router.put('/', authGuard, atualizacaoDeUsuario(), validate, atualizacao);

module.exports = router;
