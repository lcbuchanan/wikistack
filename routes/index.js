/* eslint-disable quotes */
'use strict';
const express = require('express');
const router = express.Router();
const userRoutes = require('./user');
const wikiRoutes = require('./wiki');


router.use('/wiki', wikiRoutes);
router.use('/user', userRoutes);

router.get('/', function (req, res){
  res.render('index');
})


module.exports = router;
