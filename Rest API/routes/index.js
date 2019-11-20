'use strict';

var express = require('express');
var router = express.Router();
var data = [];

router.get('/', function(req, res) {
  res.json(data);

});

router.post('/', function(req, res) {
  var image= req.body.image
  var brandModel = req.body.brandModel
  var year = req.body.year
  var plate = req.body.plate
  var color =  req.body.color 

  var hasData = data.some(function(data) {
    return  data.plate === plate 
  })

  if(!hasData) {
  data.push({
    image: image,
    brandModel: brandModel,
    year: year,
    plate: plate,
    color: color 
  });
  
}else {
  console.log('Carro já cadastrado')
}
 res.json(data);
  

});

module.exports = router;
