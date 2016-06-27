var express = require('express');
var path = require('path');

global.appRoot = path.resolve(__dirname);

var app = express();
var port = 8201;

process.env.NODE_ENV = 'production';

var mongoose = require('mongoose');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.AUTH_SECRET = process.env.AUTH_SECRET || 'asdqwkl;fm;lmc;111232lsm;flk123sf13-0im;23pi';
process.env.MONGOLAB_URI = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/models';

mongoose.connect(process.env.MONGOLAB_URI);
process.on('uncaughtException', function(err) {
  console.log(err);
});

var compress = require('compression');
app.use(compress());

var bodyParser = require('body-parser');

app.use(bodyParser.json({
  limit: '500mb',
}));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '500mb',
}));

app.use('/', express.static(path.join(__dirname)));
app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/upload.html'));


var modelRouter = express.Router();
app.use('/api', modelRouter);

require('./server/controllers/model')(modelRouter);

app.use(function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});
