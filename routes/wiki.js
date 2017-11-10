/* eslint-disable quotes */
'use strict';
const express = require('express');
const router = express.Router();


router.get('/', function (req, res){
  res.status(200).send('you did a get to the wiki route!');
});

router.post('/', function (req, res){
  res.status(201).send('you did a post to the wiki route. good job.');
});

router.get('/add', function (req, res){
  //res.status(200).send('eventually this will be an add page form.');
  res.render('addpage');
});




module.exports = router;
