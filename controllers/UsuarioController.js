/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error('JWT_SECRET não está definido');
}
const gerarToken = (id) => jwt.sign({ id }, jwtSecret, {
  expiresIn: '7d',
});

const criaNovoUsuario = async (dados) => {
  const {
    tipo, email, senha, nome, cpf, razaoSocial, cnpj,
    logradouro, complemento, numero, bairro, cidade, estado, cep,
  } = dados;
  const salt = await bcrypt.genSalt();
  const senhaHash = await bcrypt.hash(senha, salt);
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

  return novoUsuario;
};

const buscaUsuarioParaLogin = async (dados) => {
  const { email, senha } = dados;

  const usuario = await Usuario.findOne({ email });
  if (!(await bcrypt.compare(senha, usuario.senha))) {
    throw new Error('Senha inválida!');
  }

  return usuario;
};

const removeDadosNaoUtilizadoNoBD = async (dados, reqUsuario) => {
  const unsetFields = {};

  Object.keys(dados).forEach((key) => {
    const value = dados[key];
    if (!value) {
      unsetFields[key] = 1;
    }
  });

  if (Object.keys(unsetFields).length > 0) {
    await Usuario.updateOne({ _id: reqUsuario._id }, { $unset: unsetFields });
  }
};

const atualizaUsuario = async (dados, reqUsuario) => {
  const {
    nome, senha, razaoSocial, cpf, cnpj, tipo, logradouro,
    numero, bairro, cidade, estado, cep, complemento,
    nomeFantasia, inscricaoEstadual, isento, inscricaoMunicipal,
    cnae, atividadePrincipal, regimeTributario, tamanhoEmpresa,
    segmento, faturamentoAnual, quantidadeFuncionario,
  } = dados;

  const usuario = await Usuario.findById(reqUsuario._id).select('-senha');

  if (usuario !== null) {
    usuario.nome = nome || usuario.nome;
    usuario.razaoSocial = razaoSocial || usuario.razaoSocial;
    usuario.cnpj = cnpj || usuario.cnpj;
    usuario.cpf = cpf || usuario.cpf;
    usuario.tipo = tipo || usuario.tipo;
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
    if (senha && senha !== null) {
      const salt = await bcrypt.genSalt();
      const senhaHash = await bcrypt.hash(senha, salt);
      usuario.senha = senhaHash;
    }
  }

  return usuario;
};

const atualizaSenha = async (dados, reqUsuario) => {
  const {
    senha,
    novaSenha,
  } = dados;
  const usuario = await Usuario.findById(reqUsuario._id);

  if (!(await bcrypt.compare(senha, usuario.senha))) {
    throw new Error('Senha atual inválida');
  }

  if (usuario !== null) {
    if (senha && senha !== null) {
      const salt = await bcrypt.genSalt();
      const senhaHash = await bcrypt.hash(novaSenha, salt);
      usuario.senha = senhaHash;
    }
  }

  return usuario;
};

const registrarUsuario = async (req, res) => {
  try {
    const novoUsuario = await criaNovoUsuario(req.body);
    res.status(201).json({
      _id: novoUsuario._id,
      token: gerarToken(novoUsuario._id.toString()),
    });
  } catch (error) {
    res.status(422).json({ errors: [error.message] });
  }
};

const realizarLogin = async (req, res) => {
  try {
    const usuario = await buscaUsuarioParaLogin(req.body);
    res.status(200).json({
      _id: usuario._id,
      token: gerarToken(usuario._id.toString()),
    });
  } catch (error) {
    res.status(422).json({ errors: [error.message] });
  }
};

const pegarUsuarioAtivo = async (req, res) => {
  const { usuario } = req;
  res.status(200).json(usuario);
};

const atualizarDadosDoUsuario = async (req, res) => {
  try {
    const reqUsuario = req.usuario;
    removeDadosNaoUtilizadoNoBD(req.body, reqUsuario);
    const usuarioAtualizado = await atualizaUsuario(req.body, reqUsuario);
    await usuarioAtualizado.save();
    res.status(200).json(usuarioAtualizado);
  } catch (error) {
    res.status(422).json({ errors: [error.message] });
  }
};

const atualizarSenhaDeUsuario = async (req, res) => {
  try {
    const reqUsuario = req.usuario;
    const senhaAtualizada = await atualizaSenha(req.body, reqUsuario);
    await senhaAtualizada.save();
    res.status(200).json(senhaAtualizada);
  } catch (error) {
    res.status(422).json({ errors: [error.message] });
  }
};

module.exports = {
  registrarUsuario,
  realizarLogin,
  pegarUsuarioAtivo,
  atualizarDadosDoUsuario,
  atualizarSenhaDeUsuario,
};
