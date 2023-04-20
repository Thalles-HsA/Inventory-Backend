<h1 align="center">  
    <img src="./inventory.png" alt="Descrição da imagem" width="300" style="margin-top: 32px; display:block; margin: auto" >
</h1>


<div align="center">

![GitHub](https://img.shields.io/github/license/Thalles-HsA/Inventory-Backend)
![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/Thalles-HsA/Inventory-Backend)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Perfil-blue?style=flat-square&logo=linkedin&link=https://www.linkedin.com/in/thalleshsa/)](https://www.linkedin.com/in/thalleshsa/)
![GitHub Repo stars](https://img.shields.io/github/stars/Thalles-HsA/Inventory-Backend?style=social)


</div>


<br>

# Índice 

- [Índice](#índice)
- [Descrição do Projeto](#descrição-do-projeto)
- [Visão Geral](#visão-geral)
- [Processo de Desenvolvimento](#processo-de-desenvolvimento)
- [Funcionalidades Previstas](#funcionalidades-previstas)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Dependências utilizada](#dependências-utilizada)
- [Instalação do Backend](#instalação-do-backend)
- [Configuração das Variáveis de Ambiente](#configuração-das-variáveis-de-ambiente)
  - [Script Nodemon](#script-nodemon)
  - [Configuração do CORS](#configuração-do-cors)
  - [Arquivo .env](#arquivo-env)
  - [Arquivo db.js](#arquivo-dbjs)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)
- [Próximas etapas](#próximas-etapas)

<br>

# Descrição do Projeto

Olá! Me chamo Thalles Henrique e este é um projeto de ERP online que estou desenvolvendo voltado para vendedores do Mercado Livre. Sou um desenvolvedor júnior em busca da minha primeira vaga, e estou criando este projeto como uma carta de apresentação do meu trabalho. Meu objetivo é demonstrar minhas habilidades na construção de um aplicativo completo, desde a concepção até a implementação.

O backend do Inventory foi construído utilizando o Node.js, que é uma plataforma de desenvolvimento de aplicações web baseada em JavaScript. Para a criação das rotas e middleware da aplicação, foi utilizado o framework Express, que é uma das escolhas mais populares para a construção de aplicações web em Node.js.

Para garantir a qualidade e segurança da aplicação, o código do backend foi escrito em TypeScript. O TypeScript é uma linguagem que adiciona recursos como tipagem estática e interfaces ao JavaScript, ajudando a prevenir erros comuns de digitação e a aumentar a escalabilidade do projeto.

A validação de formulário no backend foi realizada utilizando o express-validator, que é uma biblioteca de validação para o Express. Com ela, é possível definir regras de validação para os campos do formulário e garantir que as requisições recebidas pelo servidor estejam dentro dos padrões esperados. Isso adiciona uma camada extra de segurança para a aplicação, ajudando a prevenir ataques de injeção de SQL, por exemplo.

O banco de dados escolhido para a aplicação foi o MongoDB, que é um banco de dados NoSQL orientado a documentos. O MongoDB é uma escolha popular para aplicações web, pois é fácil de usar, escalável e oferece grande flexibilidade no armazenamento e recuperação de dados.

Em resumo, o backend do Inventory foi construído com uma abordagem moderna e segura, utilizando as tecnologias Node.js, Express, TypeScript, express-validator e MongoDB. Essas tecnologias ajudaram a garantir a qualidade e escalabilidade da aplicação, além de oferecerem uma experiência de desenvolvimento mais produtiva e agradável.

<br>

# Visão Geral

Diferentes de outros ERP's tradicionais do mercado o foco do Inventory será na facilidade de implementação e a qualidade de estoque terá grande destaque dentro do projeto.

Viso colocar toda minha experiência anterior que teho nessa área para conseguir desenvolver um excelente produto.

Este projeto visa fornecer aos vendedores do Mercado Livre uma solução completa para gerenciar suas operações de vendas, desde o controle de estoque até a emissão de notas fiscais e a gestão de pedidos. O ERP também permitirá que os vendedores gerenciem seus clientes e façam análises de desempenho.

<br>

# Processo de Desenvolvimento

No processo de desenvolvimento do meu aplicativo, eu segui uma abordagem iterativa e incremental. Primeiramente, começei com o planejamento, onde defini os objetivos do projeto, as funcionalidades que serão desenvolvidas e as tecnologias que serão utilizadas.

Em seguida, criei um esboço do design do aplicativo, definindo as telas, componentes e fluxos de navegação. Utilizei o canva uma ferramentas de design para criar protótipos de alta fidelidade, que me ajudam a visualizar como o aplicativo ficará antes mesmo de começar a codificar.

Com o design definido, começei a codificação, sempre seguindo as melhores práticas de desenvolvimento de software e utilizando as tecnologias escolhidas. Durante a codificação, utilizei ferramentas de versionamento de código como o Git e o Github para manter o controle de versões e colaboração com outros desenvolvedores.

Veja mais sobre o processo de desenvolvimento do frontend e do backend dentro de suas respesquitivas pastas.

<br>


# Funcionalidades Previstas

- Qualidade de estoque;
- Controle de estoque;
- Emissão de notas fiscais;
- Gestão de pedidos;
- Gerenciamento de clientes;
- IA para gerir a qualidade do estoque e dar sugestões personalizadas;
- Análises de desempenho;

<br>

# Tecnologias Utilizadas

Nesse projeto utilizei da stack MERN para o desenvolvimento.

- MongoDB;
- Express;
- Node.js;

## Dependências utilizada

- bcrypt - (versão 5.1.0)
- bcryptjs - (versão 2.4.3)
- cors - (versão 2.8.5)
- cpf-cnpj-validator - (versão 1.0.3)
- dotenv - (versão 16.0.3)
- express - (versão 4.18.2)
- express-validator - (versão 6.15.0)
- jsonwebtoken - (versão 9.0.0)
- mongoose - (versão 7.0.3)
- multer - (versão 1.4.5-lts.1)
- typescript - (versão 4.4.4)
- nodemon - (versão 2.0.22)

<br>

# Instalação do Backend

Para instalar e executar este projeto, siga os seguintes passos:

- Clone este repositório em sua máquina local

1. Instale as dependências do projeto com o comando `yarn install` ou `npm install`
2. Inicie o servidor de desenvolvimento com o comando `yarn server` ou `npm run server`
3. Acesse o aplicativo no navegador no endereço `http://localhost:3000` e veja sua aplicação frontend rodando
<br>

# Configuração das Variáveis de Ambiente

Este projeto utiliza o MongoDB como banco de dados, e para conectar o aplicativo ao seu banco de dados MongoDB, você precisará configurar as seguintes variáveis de ambiente:

## Script Nodemon

- no package.json crie um script para que o nodemon possa rodar: 

```javascript
"scripts": {
    "server": "nodemon ./app.js",
    // ...restante dos seus scripts
  },
```

## Configuração do CORS

As configurações do cors estão no app.js e deve conter as URL's que enviarão requisições para o backend. Por padrão as configurações estão como no exemplo abaixo, mas você pode mudar conforme sua necessidade.

```javascript
// Solve CORS
app.use(cors({ credentials: true, origin: ["http://localhost:3000", "https://projeto-inventory.vercel.app"] }));
```

## Arquivo .env
- Criar um arquivo .env na raiz do seu projeto backend e defina as variáveis.
    exemplo de configuração do .env: 

    ```javascript
    // Porta usada para conectar ao seu servidor backend
    PORT= 5000 
    
    // Dados de conexão do MongoDB
    DB_USER= Seu usuario no MongoDB
    DB_PASS= Sua senha no MongoDB
    DB_URL="<endereço do servidor>/<nome do banco de dados>"

    // Configuração para o JWT
    JWT_SECRET= Uma senha secreta.

    ```
  > **ATENÇÃO:** Para manter as suas configurações seguras, é importante não compartilhar este arquivo publicamente no GitHub ou em qualquer outro lugar.

  <br>

## Arquivo db.js

- Dentro da pasta /config contem o arquivo db.js que é reponsavel pela comunicação com o MongoDB ele deve estar assim:

```javascript
//importando o mongoose
const mongoose = require("mongoose"); 

// importando as variaveis do arquivo .env que será usado na configuração do banco de dados
const dbUser = process.env.DB_USER; 
const dbPassword = process.env.DB_PASS;
const dbBanco = process.env.DB_DB;

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@${dbBanco}` // Lembrando que essa linha de código vem pronta do MongoDB, basta copiar, colar em seu codigo e substituir o seu usuário, senha, endereço do servidor e nome do banco de dados pelos dados do arquivo .env.local (${dbUser}:${dbPassword}@${dbBanco}) como está no exemplo acima.
    );
    console.log("Conectou ao banco de dados!");

    return dbConn;
  } catch (error) {
    console.log(error);
  }
};

conn();

module.exports = conn;

```

<img src="./gif.gif" alt="Descrição da imagem" width="700" style="margin-top: 32px; display:block" >

<br>

# Contribuição

Este projeto foi criado por mim, Thalles Henrique, um desenvolvedor júnior em busca de minha primeira vaga como desenvolvedor FullStack. 

No meu [Linkedin](https://www.linkedin.com.br/in/thalleshsa) posto as atualizações e modificações recentes.  Diáriamente posto as atualizações do projeto e os passo-a-passo do desenvolvimento, sempre dando dicas importantes para ajudar mais Dev na sua evolução.

Se você gostou deste projeto e quer contribuir para seu desenvolvimento, sinta-se à vontade para abrir uma issue ou enviar uma pull request.

<br>

# Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para obter mais informações.

<br>

# Contato

Entre em contato comigo atraves de um dos canais abaixo:

* Email - thsa.henrique@gmail.com 
* Linkedin - [Thalles Henrique](https://www.linkedin.com.br/in/thalleshsa)
  
Estou disponível para discutir oportunidades de trabalho e projetos de colaboração.

<br>

# Próximas etapas

As próximas etapas do desenvolvimento incluem:

- Codificação do backend do cadastros de produtos, clientes efornecedores, anuncios e etc...
- Desenvolvimento do frontend.
- Implementação da logica para o controle de estoque.
- Integração com a API do Mercado Livre.
- Adicionar recursos de análise de dados para permitir que os vendedores tomem decisões informadas com base em seus dados de vendas.
- Implementação de um IA para gerir a qualidade do estoque.

Estou ansioso para continuar a desenvolver este aplicativo e adicionar ainda mais recursos para ajudar os vendedores do Mercado Livre a gerenciar suas operações de vendas com eficiência.