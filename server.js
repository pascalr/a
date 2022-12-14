import express from 'express';
import http from 'http';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
//import fs from 'fs';

import router from './src/router.js';
import builder from './src/builder.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV !== 'production') {
  builder.liveBuildJs();
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Locals declared here will be availabe inside all the views
app.locals.hello = () => console.log('Hello world!');
app.locals.encodeHtml = function(r) {
  return r.toString().replace(/[\x26\x0A\<>'"]/g,function(r){return"&#"+r.charCodeAt(0)+";"})
}
app.locals.files = {
  f1: fs.readFileSync('views/files/1.html'),
  f2: fs.readFileSync('views/files/2.json'),
  f3: fs.readFileSync('views/files/3.js'),
  f4: fs.readFileSync('views/files/4.js'),
  f5: fs.readFileSync('views/files/5'),
}
app.locals.linkIfCond = (title, link, cond, options={}) => {
  if (!cond) {return '<span class="disabled">'+title+'</span>'}
  let klass = options.className ? ' class="'+options.className+'"' : ''
  return '<a href="'+link+'" '+klass+'>'+title+'</a>'
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// You can add folders here to be served directly from the server
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/highlight.js/styles/default.css')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist/')));
app.use(express.static(path.join(__dirname, 'node_modules/@popperjs/core/dist/')));
app.use("/css/highlight_default.css", express.static(path.join(__dirname, 'node_modules/highlight.js/styles/default.css')));

app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next("Error 404. It looks like the page you are looking for does not exists.");
});

// error handler
app.use(function(err, req, res, next) {

  if (process.env.ENVIRONMENT !== "production") {

    if (typeof err === 'string') {
      res.locals.message = err;
      res.locals.error = {};
    } else {
      res.locals.message = err.message;
      res.locals.error = err;
    }

    // render the error page
    res.status(err.status || 500);
    res.render('error_dev');

  } else {
    console.log('ERROR', err)
    res.redirect('/error');
  }
});

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var server = http.createServer(app);
// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10)
  if (isNaN(port)) {return val} // named pipe
  if (port >= 0) {return port} // port number
  return false
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {throw error}

  var bind = (typeof port === 'string' ? 'Pipe ' : 'Port ') + port

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
