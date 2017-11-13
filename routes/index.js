/* eslint-disable quotes */
'use strict';
const express = require('express');
const router = express.Router();
const userRoutes = require('./user');
const searchRoutes = require('./search')
const wikiRoutes = require('./wiki');
var models = require('../models');
var Page = models.Page;
var User = models.User;


router.use('/wiki', wikiRoutes);
router.use('/users', userRoutes);
router.use('/search', searchRoutes);
router.get('/', function (req, res){
  Page.findAll()
  .then(function(result){
    res.render('index', {pages: result});
  });
});


module.exports = router;
