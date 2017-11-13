'use strict';
const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', (req, res) => {
  res.render('search')
})

module.exports = router;
