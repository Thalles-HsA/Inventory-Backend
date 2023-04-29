const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error('JWT_SECRET não está definido');
}

// Gerando o token de usuário
const gerarToken = (id) => jwt.sign({ id }, jwtSecret, {
  expiresIn: '7d',
});

// Registrando e Logando o Usuário

const registrar = async (req, res) => {
  const {
    tipo,
    email,
    senha,
    nome,
    cpf,
    razaoSocial,
    cnpj,
    logradouro,
    complemento,
    numero,
    bairro,
    cidade,
    estado,
    cep,
  } = req.body;

  // check if usuario exists
  const usuario = await Usuario.findOne({ email });

  if (usuario) {
    res.status(422).json({ errors: ['E-mail já cadastrado em nossa base de dados, recupere sua senha ou utilize outro e-mail.'] });
    return;
  }

  // Generate senha has
  const salt = await bcrypt.genSalt();
  const senhaHash = await bcrypt.hash(senha, salt);

  // Criando usuario com codições

  const novoUsuario = await Usuario.create({
    email,
    senha: senhaHash,
    tipo,
    ...(tipo === 'cpf'
      ? { nome, cpf }
      : { razaoSocial, cnpj }),
    logradouro,
    numero,
    complemento,
    bairro,
    cidade,
    estado,
    cep,
  });

  if (!novoUsuario) {
    throw new Error('Houve um erro ao criar o usuário');
  }

  res.status(201).json({
    // eslint-disable-next-line no-underscore-dangle
    _id: novoUsuario._id,
    // eslint-disable-next-line no-underscore-dangle
    token: gerarToken(novoUsuario._id.toString()),
  });
};

const usuarioAtivo = async (req, res) => {
  const { usuario } = req;

  res.status(200).json(usuario);
};

// Logando usuário
const login = async (req, res) => {
  const { email, senha } = req.body;

  const usuario = await Usuario.findOne({ email });

  // Checando se o usuário existe
  if (!usuario) {
    res.status(404).json({ errors: ['Usuário não cadastrado. Confira seu email ou realize seu cadastro'] });
    return;
  }

  // checando se as senhas são iguais
  if (!(await bcrypt.compare(senha, usuario.senha))) {
    res.status(422).json({ errors: ['Senha inválida!'] });
    return;
  }

  // Retornando o usuário com o token
  res.status(200).json({
    // eslint-disable-next-line no-underscore-dangle
    _id: usuario._id,
    // eslint-disable-next-line no-underscore-dangle
    token: gerarToken(usuario._id.toString()),
  });
};

// Atualizando o usuario
const atualizacao = async (req, res) => {
  const {
    nome,
    razaoSocial,
    senha,
    logradouro,
    numero,
    bairro,
    cidade,
    estado,
    cep,
    complemento,
    nomeFantasia,
    inscricaoEstadual,
    isento,
    inscricaoMunicipal,
    cnae,
    atividadePrincipal,
    regimeTributario,
    tamanhoEmpresa,
    segmento,
    faturamentoAnual,
    quantidadeFuncionario,
  } = req.body;

  const reqUsuario = req.usuario;

  // eslint-disable-next-line no-underscore-dangle
  const usuario = await Usuario.findById(reqUsuario._id).select('-senha');

  if (usuario !== null) {
    if (nome && usuario.tipo === 'cpf') {
      usuario.nome = nome;
    } else if (razaoSocial && usuario.tipo === 'cnpj') {
      usuario.razaoSocial = razaoSocial;
    } else {
      res.status(422).json({ errors: ["Erro ao atualizar! Verifique o 'tipo' de cliente!"] });
      return;
    }
    if (senha && senha !== null) {
      const salt = await bcrypt.genSalt();
      const senhaHash = await bcrypt.hash(senha, salt);
      usuario.senha = senhaHash;
    }
    usuario.nomeFantasia = nomeFantasia || usuario.nomeFantasia;
    usuario.inscricaoEstadual = inscricaoEstadual || usuario.inscricaoEstadual;
    usuario.isento = isento || usuario.isento;
    usuario.inscricaoMunicipal = inscricaoMunicipal || usuario.inscricaoMunicipal;
    usuario.cnae = cnae || usuario.cnae;
    usuario.atividadePrincipal = atividadePrincipal || usuario.atividadePrincipal;
    usuario.regimeTributario = regimeTributario || usuario.regimeTributario;
    usuario.tamanhoEmpresa = tamanhoEmpresa || usuario.tamanhoEmpresa;
    usuario.segmento = segmento || usuario.segmento;
    usuario.faturamentoAnual = faturamentoAnual || usuario.faturamentoAnual;
    usuario.quantidadeFuncionario = quantidadeFuncionario || usuario.quantidadeFuncionario;
    usuario.logradouro = logradouro || usuario.logradouro;
    usuario.numero = numero || usuario.numero;
    usuario.complemento = complemento || usuario.complemento;
    usuario.bairro = bairro || usuario.bairro;
    usuario.cidade = cidade || usuario.cidade;
    usuario.estado = estado || usuario.estado;
    usuario.cep = cep || usuario.cep;

    await usuario.save();

    res.status(200).json(usuario);
  }
};

module.exports = {
  registrar,
  usuarioAtivo,
  login,
  atualizacao,
};
