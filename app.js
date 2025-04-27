var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');              // para sessões

// Conexão com pool MySQL via db.js
const pool = require('./db');

// Importa rotas
var indexRouter       = require('./routes/index');
var usersRouter       = require('./routes/users');
var produtosRouter    = require('./routes/nossosprodutos');
var acessoriosRouter  = require('./routes/categorias/acessorios');
var roupasRouter      = require('./routes/categorias/roupas');
var eletronicosRouter = require('./routes/categorias/eletronicos');
var carrinhoRouter     = require('./routes/carrinho');      // rotas de funções (carrinho, pedidos, etc.)
var pedidosRouter     = require('./routes/pedidos');      // rotas de funções (carrinho, pedidos, etc.)
var anunciarRouter    = require('./routes/anunciar');     // rotas de funções (carrinho, pedidos, etc.)
var dashboardadminRouter = require('./routes/dashboardadmin'); 
var meuperfilRouter = require('./routes/perfil'); 
const authRoutes      = require('./routes/authroute');    // rotas de auth (login/register/logout)
const { estaLogado, eAdmin } = require('./middleware/authmiddleware');  // corrige o caminho do middleware

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Sessão: deve vir antes das rotas de autenticação
app.use(session({                                 
  secret: 'umSegredoBemSecreto',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 } // 1 hora
}));

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Rotas de autenticação (login, registro, logout)
app.use(authRoutes);

// Rotas públicas
app.use('/', indexRouter);
app.use('/nossosprodutos', produtosRouter);
app.use('/categorias/acessorios', acessoriosRouter);
app.use('/categorias/roupas', roupasRouter);
app.use('/categorias/eletronicos', eletronicosRouter);

// Rotas protegidas
app.use('/users', estaLogado, usersRouter);

app.use('/carrinho', estaLogado, carrinhoRouter); // rotas de funções (carrinho, pedidos, etc.)
app.use('/pedidos', estaLogado, pedidosRouter); // rotas de funções (carrinho, pedidos, etc.)
app.use('/anunciar', estaLogado, anunciarRouter); // rotas de funções (carrinho, pedidos, etc.)

app.use('/perfil', estaLogado, meuperfilRouter);


// Exemplo de rota restrita a admins
app.get('/admin', estaLogado, eAdmin, (req, res) => {
  res.render('admin', { usuario: req.session.usuario });
});

app.use('/dashboardadmin', estaLogado, eAdmin, dashboardadminRouter); 


// Exemplo de consulta direta usando pool em rota protegida
app.get('/select', estaLogado, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (err) {
    res.status(500).send('Erro na consulta');
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error   = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Inicia o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;
