/* eslint-disable quotes */
'use strict';
const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;


router.get('/', function (req, res){
  res.redirect('/');
});

router.post('/', function(req, res, next) {

  User.findOrCreate({
    where: {
      name: req.body.author,
      email: req.body.email
    }
  })
  .then(function(result){
    let user = result[0];
    var page = Page.build({
      title: req.body.title,
      content: req.body.content,
    });

    return page.save()
    .then(function(page){
      return page.setAuthor(user);
    });

  })
  .then(function(result){
    res.redirect(result.route);
  })
  .catch(next);

});


router.get('/add', function (req, res){
  //res.status(200).send('eventually this will be an add page form.');
  res.render('addpage');
});


router.get('/:urlTitle', function (req, res){
  Page.findAll({
    where: {
      urlTitle : req.params.urlTitle
    }
  })
  .then(function (result){
    console.log(result);
    res.render('wikipage', {page: result[0].dataValues});
  });
})




module.exports = router;
