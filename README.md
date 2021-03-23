#  Tabela de usuários &middot; [![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://www.npmjs.com/package/npm) [![webpack](https://img.shields.io/github/package-json/v/webpack/webpack.svg?label=webpack&style=flat-square&maxAge=3600)](https://www.npmjs.com/package/webpack) [![GitHub license](https://img.shields.io/badge/license-ISC-blue.svg?style=flat-square)](https://github.com/your/your-project/blob/master/LICENSE)

Aplicativo responsivo que permite a criação, leitura, edição e exclusão de usuários no sistema, contendo validações e testes unitários.

  

##  Instalação / Início

  

Para ter acesso aos códigos do projeto, você precisa fazer o clone do repositório . Para isso usse o comando abaixo

  

```shell

git clone https://github.com/absoluthi/teste-front.git

```

  

Depois de executar esse comando, uma pasta será criada com o conteúdo do projeto.

  

##  Desenvolvimento

  

###  Construído usando

Webpack, JavaScript, SCSS, JEST e outros.

  

###  Pré requisitos

Para poder rodar o projeto corretamente, você precisa instalar o **node.js v10.x** (veja mais clicando [aqui](https://nodejs.org/pt-br/download/)). Recomendamos que você faça isso globalmente.
  

###  Preparando o ambiente de desenvolvimento

  

Para poder rodar o projeto junto de todas as suas funcionalidades, você precisa instalar todos as dependências, seguindo os seguintes passos:

  

```shell

cd teste-front/

npm install

npm start

```

  

Isso vai fazer com que o webpack interaja com todo o nosso projeto e suba um servidor de desenvolvimento em uma nova aba do seu navegador.

Uma vez executado o comando `npm start`, o webpack vai observar as mudanças no repositório e vai atualizar a página no browser atuomaticamente. Ele é o responsável por estabelecer esse ambiente de desenvolvimento, onde temos arquivos não minificados, princpalmente.

**Atenção:** Nenhuma pasta de dist/build é gerada nesse processo do servidor. Para visualizar o output do webpack em modo de desenvolvimento, com o objetivo de depuração, clique [aqui]()

  

###  Produção

  

Para rodar uma versão do projeto em modo de produção, com arquivos minifcados, você precisa executar o comando abaixo:

  

```shell

npm run build

```
A partir disso, o webpack vai trabalhar para entregar todo o projeto dentro de uma pasta `build` na raíz do seu diretório. Todos os arquivos html e js do projeto serão exportados de acordo com a configuração definida no arquivo `webpack.prod.js`.

Imagens, ícones e outros assets também serão gerados, e seus caminhos dentro dos arquivos serão reconstruídos de forma relativa.

##  Testes

  

O projeto conta com 3 testes unitários através das funcionalidades disponíveis na aplicação, usando JEST. São eles: Um teste referente a formatação de string de acordo com uma mask; Um de validação de e-mail; Uma de verificação de nome completo.

Para fazer uma rodada de testes, use o seguinte comando:

  

```shell

npm test

```

  

##  Guia de estilos

  

Toda a cadeia de estilos do projeto foi construída usando SCSS e suas funcionalidades. O projeto conta com mixins específicos de breakpoint, extends que permitem herança no css, funções que trabalham com o crossbrowser, animações do CSS3 e outras funcionalidades.

Toda a estruturação dos componentes e da página foi baseada no conceito de [Atomic Design](https://brasil.uxdesign.cc/atomic-design-redesenhando-os-entreg%C3%A1veis-de-designers-e-desenvolvedores-da8886c7258d) e [padrão BEM](http://getbem.com/naming/), permitindo maior escalabilidade e reciclagem de código.

Através de variáveis em cada base como o exemplo abaixo, é possível ter um protótipo de projeto quase pronto 

```shell
/* --- CORES --- */
$neutral-color-lightest: #ffffff;
$neutral-color-lighter: #f6f6f6;
$neutral-color-light: #efeeed;
$neutral-color: #dcdcdc;
$neutral-color-dark: #adacac;
$neutral-color-darker: #333333;
$neutral-color-darkest: #333333;

  

/* --- TAMANHO DE FONTE --- */
$fs-base-biggest: 32px;
$fs-base-bigger: 26px;
$fs-base-big: 24px;
$fs-base-medium: 20px;
$fs-base: 16px;
$fs-base-small: 14px;
$fs-base-smaller: 12px;
$fs-base-smallest: 10px;
```

Ou, através de uma função no SASS, conseguimos transformas os pixels em vw e deixar o código ainda mais responsivo, como o exemplo abaixo
```shell
@function  pxvw($size, $context: $mob-vw) {
	@if $size {
		@return $size / ($context *  0.01) *  1vw;
	}
	@else {
		@error  "faltam valores na funcao;";
	}
}
```
  

##  Api

  

A API de base utilizada foi disponibilizada nesse [link](https://github.com/easynvest/teste-front-end). Todas as informações para configuração do projeto se encontram nesse repositório.

  
  

##  Dados

  

Toda a manipulação dos dados da aplicação é feito via localStorage, sempre usando filtros e máscaras para a conversão de valores, facilitando tratamentos internos no código com números inteiros e exibindo na tabela formatado, por exemplo.

  

##  Licença

  

Projeto pessoal a fim de demonstração de conhecimentos. [Licença ISC](https://opensource.org/licenses/ISC)