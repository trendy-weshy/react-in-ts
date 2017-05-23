/*
 * created by waweru 
 */  

'use strict';
require('dotenv').load();

const http=require('http');
const path=require('path');
const express=require('express');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const webpackDevMiddleware=require('webpack-dev-middleware');
const webpackHotMiddleware=require('webpack-hot-middleware');
const webpack=require('webpack');
const helmet=require('helmet');
const compression=require('compression');
const logger=require('morgan');
const app=express();
const randomBytes=require('crypto').randomBytes;

if (process.env.NODE_ENV!=='production') {
  let compiled = webpack(require('./webpack.config'));
  app.use(webpackDevMiddleware(compiled, {
      publicPath: '/build',
      stats: { colors: true },
      noInfo: true
  }));
  app.use(webpackHotMiddleware(compiled));
}

app.use(compression());
app.use(helmet({
  frameguard: {
    action: 'deny'
  }
}));
app.use(helmet.hidePoweredBy({setTo: 'PHP 4.0.6'}));
app.use(logger('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(randomBytes(12).toString('hex')));
app.use('/build', express.static(path.resolve(__dirname, 'build')));
app.use(express.static(path.resolve(__dirname, 'public')));

// ROUTE
let Router=express.Router();
Router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/index.html'));
});
app.use('/', Router);

/*
 * @docs: Server implementation code 
 */ 
const appRun = () => {
  app.set('port', process.env.PORT || 3000);
  let server = app.listen(app.get('port'), () => {
      console.log(`server listening on: ${server.address().port}`);
  });

  server.on('error', (error) => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    switch (error.code) {
      case 'EACCES':
        console.error('Port requires elevated privileges');
        process.exit(0);
        break;
      case 'EADDRINUSE':
        console.error('Port is already in use');
        process.exit(0);
        break;
      default:
        throw error;
    }
  });
};
// #note: start server
appRun();