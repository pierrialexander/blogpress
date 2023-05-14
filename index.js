const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');

const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');

const Article = require('./articles/Article');
const Category = require('./categories/Category');

// View Engine
app.set('view engine', 'ejs');

// STATIC
app.use(express.static('public'));

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database
connection
    .authenticate()
    .then(() => {
        console.log('Conexão com o banco feita com sucesso!')
    })
    .catch((error) => {
        console.log('Erro de conexão com o banco de dados!')
    })

// USAR ROTA DE CATEGORIES
app.use('/', categoriesController);
app.use('/', articlesController);


// ROTA DO INDEX
app.get('/', (req, res) => {
    res.render('index');
})

app.listen(8080, () => {
    console.log('Servidor Rodando na porta 8080')
})