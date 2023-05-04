const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    enum: ['cpf', 'cnpj'],
    required: true,
  },
  nome: {
    type: String,
    required() {
      return this.tipo === 'cpf';
    },
  },
  cpf: {
    type: String,
    required() {
      return this.tipo === 'cpf';
    },
  },
  razaoSocial: {
    type: String,
    required() {
      return this.tipo === 'cnpj';
    },
  },
  cnpj: {
    type: String,
    required() {
      return this.tipo === 'cnpj';
    },
  },
  nomeFantasia: String,
  inscricaoEstadual: String,
  isento: Boolean,
  inscricaoMunicipal: String,
  cnae: String,
  atividadePrincipal: String,
  regimeTributario: String,
  tamanhoEmpresa: String,
  segmento: Array,
  faturamentoAnual: String,
  quantidadeFuncionario: String,
  logradouro: {
    type: String,
    required: true,
  },
  numero: {
    type: String,
    required: true,
  },
  complemento: String,
  bairro: {
    type: String,
    required: true,
  },

  cidade: {
    type: String,
    required: true,
  },

  estado: {
    type: String,
    required: true,
  },

  cep: {
    type: String,
    required: true,
  },
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
