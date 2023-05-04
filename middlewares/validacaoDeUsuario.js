const { body } = require('express-validator');
const cpfCnpjValidator = require('cpf-cnpj-validator');

const validacaoDeUsuario = () => [
  body('email')
    .isEmail()
    .withMessage('E-mail inválido.'),
  body('senha')
    .isString()
    .withMessage('A senha é obrigatória.')
    .isLength({ min: 6 })
    .withMessage('A senha deve ter pelo menos 6 caracteres.'),
  body('confirmarSenha')
    .isString()
    .withMessage('A confirmação de senha é obrigatória.'),
  body('tipo')
    .isString()
    .withMessage('O tipo é obrigatório.'),
  body('cpf')
    .if(body('tipo').equals('cpf'))
    .notEmpty()
    .withMessage('O CPF é obrigatório.')
    .custom((value) => cpfCnpjValidator.cpf.isValid(value))
    .withMessage('CPF inválido.'),
  body('cnpj')
    .if(body('tipo').equals('cnpj'))
    .notEmpty()
    .withMessage('O CNPJ é obrigatório.')
    .custom((value) => cpfCnpjValidator.cnpj.isValid(value))
    .withMessage('CNPJ inválido.'),
  body('nome')
    .if(body('tipo').equals('cpf'))
    .notEmpty()
    .withMessage('O nome é obrigatório.')
    .isLength({ min: 3 })
    .withMessage('O nome deve ter no minimo 3 caracteres'),
  body('razaoSocial')
    .if(body('tipo').equals('cnpj'))
    .notEmpty()
    .withMessage('A razão social é obrigatório.')
    .isLength({ min: 3 })
    .withMessage('A razão social deve ter no minimo 3 caracteres'),
  body('logradouro')
    .isString()
    .withMessage('O logradouro é obrigatório.'),
  body('numero')
    .isString()
    .withMessage('O número é obrigatório.'),
  body('complemento')
    .optional(),
  body('bairro')
    .isString()
    .withMessage('O bairro é obrigatório.'),
  body('cidade')
    .isString()
    .withMessage('A cidade é obrigatória.'),
  body('estado')
    .isString()
    .withMessage('O estado é obrigatório.'),
  body('cep')
    .isString()
    .withMessage('O CEP é obrigatório.'),

];

const validacaoDeLogin = () => [
  body('email')
    .isString()
    .withMessage('O e-mail é obrigatório.')
    .isEmail()
    .withMessage('Insira um e-mail válido'),
  body('senha')
    .isString()
    .withMessage('A senha é obrigatória.'),
];

const atualizacaoDeUsuario = () => [
  body('tipo')
    .isString()
    .withMessage('O tipo é obrigatório.'),
  body('cpf')
    .if(body('tipo').equals('cpf'))
    .notEmpty()
    .withMessage('O CPF é obrigatório.')
    .custom((value) => cpfCnpjValidator.cpf.isValid(value))
    .withMessage('CPF inválido.'),
  body('cnpj')
    .if(body('tipo').equals('cnpj'))
    .notEmpty()
    .withMessage('O CNPJ é obrigatório.')
    .custom((value) => cpfCnpjValidator.cnpj.isValid(value))
    .withMessage('CNPJ inválido.'),
  body('nome')
    .if(body('tipo').equals('cpf'))
    .notEmpty()
    .withMessage('O nome é obrigatório.')
    .isLength({ min: 3 })
    .withMessage('O nome deve ter no minimo 3 caracteres'),
  body('razaoSocial')
    .if(body('tipo').equals('cnpj'))
    .notEmpty()
    .withMessage('A razão social é obrigatório.')
    .isLength({ min: 3 })
    .withMessage('A razão social deve ter no minimo 3 caracteres'),
  body('logradouro')
    .isString()
    .notEmpty()
    .withMessage('O logradouro é obrigatório.'),
  body('numero')
    .isString()
    .notEmpty()
    .withMessage('O número é obrigatório.'),
  body('bairro')
    .isString()
    .notEmpty()
    .withMessage('O bairro é obrigatório.'),
  body('cidade')
    .isString()
    .notEmpty()
    .withMessage('A cidade é obrigatória.'),
  body('estado')
    .isString()
    .notEmpty()
    .withMessage('O estado é obrigatório.'),
  body('cep')
    .isString()
    .notEmpty()
    .withMessage('O CEP é obrigatório.'),
];

module.exports = {
  validacaoDeLogin,
  atualizacaoDeUsuario,
  validacaoDeUsuario,
};
