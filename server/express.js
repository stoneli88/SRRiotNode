'use strict';

var express = require('express');
var app = module.exports.app = exports.app = express();

app.use(express.static('./dist'));
app.listen(8081, function() {
  console.log('Express server listening on port: 8081');
});
