'use strict';

var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;
var routes = require('./routes');


app.use(cors()) 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/car', routes);

app.listen(port, (err) => {
  if(err) {
      console.log('Aconteceu um erro', err)
  } else {
      console.log('Rodando na porta http://localhost:3000')
  }
})
