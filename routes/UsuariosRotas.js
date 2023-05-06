const expressRoute = require('express');

const router = expressRoute.Router();

// Controller
const {
  registrarUsuario,
  pegarUsuarioAtivo,
  realizarLogin,
  atualizarDadosDoUsuario,
  atualizarSenhaDeUsuario,
} = require('../controllers/UsuarioController');
const {
  enviarEmailDeRecuperacaoDeSenha,
  recuperarSenhadeUsuario,
} = require('../controllers/EsqueciSenhaController');

// Middlewares
const { validate } = require('../middlewares/handleValidations');
const {
  validacaoDeUsuario,
  validacaoDeLogin,
  validacaoDeAtualizacaoDeUsuario,
  validacaoDeAtualizacaodeSenha,
  validacaoDeSolicitaRecuperacaoSenha,
  validacaoDeRecuperacaoSenha,
} = require('../middlewares/validacaoDeUsuario');
const { authGuard } = require('../middlewares/authGuard');
const { validarToken } = require('../middlewares/validaToken');

// Routes
router.post('/cadastro', validacaoDeUsuario(), validate, registrarUsuario);
router.post('/solicitaRecuperacaoSenha', validacaoDeSolicitaRecuperacaoSenha(), validate, enviarEmailDeRecuperacaoDeSenha);
router.post('/validacaoToken', validarToken);
router.post('/login', validacaoDeLogin(), validate, realizarLogin);
router.get('/perfil', authGuard, pegarUsuarioAtivo);
router.put('/', authGuard, validacaoDeAtualizacaoDeUsuario(), validate, atualizarDadosDoUsuario);
router.put('/atualizaSenha', authGuard, validacaoDeAtualizacaodeSenha(), validate, atualizarSenhaDeUsuario);
router.put('/recuperaSenha', validacaoDeRecuperacaoSenha(), validate, recuperarSenhadeUsuario);

module.exports = router;
