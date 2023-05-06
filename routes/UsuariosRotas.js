const expressRoute = require('express');

const router = expressRoute.Router();

// Controller
const {
  registrar,
  usuarioAtivo,
  login,
  atualizacao,
  atualizacaoDeSenha,
} = require('../controllers/UsuarioController');

const {
  enviaEmailRecuperacaoSenha,
  recuperaSenha,
} = require('../controllers/EsqueciMinhaSenhaController');

// Middlewares
const { validate } = require('../middlewares/handleValidations');
const {
  validacaoDeUsuario,
  validacaoDeLogin,
  atualizacaoDeUsuario,
  atualizacaodeSenha,
  solicitaRecuperacaoSenha,
  recuperacaoSenha,
} = require('../middlewares/validacaoDeUsuario');
const { authGuard } = require('../middlewares/authGuard');
const { validateToken } = require('../middlewares/validateToken');

// Routes

router.post('/cadastro', validacaoDeUsuario(), validate, registrar);
router.post('/login', validacaoDeLogin(), validate, login);
router.get('/perfil', authGuard, usuarioAtivo);
router.put('/', authGuard, atualizacaoDeUsuario(), validate, atualizacao);
router.put('/atualizaSenha', authGuard, atualizacaodeSenha(), validate, atualizacaoDeSenha);
router.post('/solicitaRecuperacaoSenha', solicitaRecuperacaoSenha(), validate, enviaEmailRecuperacaoSenha);
router.post('/validacaoToken', validateToken);
router.put('/recuperaSenha', recuperacaoSenha(), validate, recuperaSenha);

module.exports = router;
