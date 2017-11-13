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
      status: req.body.status,
      tags: req.body.tags.split(' ')
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


router.get('/:urlTitle', function (req, res, next){
  Page.findOne({
    where: {
        urlTitle: req.params.urlTitle
    },
    include: [
        {model: User, as: 'author'}
    ]
})
.then(function (page) {
    // page instance will have a .author property
    // as a filled in user object ({ name, email })
    if (page === null) {
        res.status(404).send();
    } else {
        res.render('wikipage', {
            page: page
        });
    }
})
.catch(next);
})

module.exports = router;
