var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var router = express.Router();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var produtosRouter= require('./routes/nossosprodutos');
var acessoriosRouter = require('./routes/categorias/acessorios');
var roupasRouter = require('./routes/categorias/roupas');
var eletronicosRouter = require('./routes/categorias/eletronicos');
const mysql = require('mysql2')
const conection =  mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'pyke'
})
conection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});



const port = 3000;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static('public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/nossosprodutos',produtosRouter);
app.use('/categorias/acessorios',acessoriosRouter);
app.use('/categorias/roupas',roupasRouter);
app.use('/categorias/eletronicos',eletronicosRouter);
app.get("/select",(req,res)=>{
  conection.query("SELECT * FROM usuarios",(err,result)=>{
  res.send(result);})
})


// catch 404 and forward to error handler njio0iuhb~bçç
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    
  })

module.exports = app;
