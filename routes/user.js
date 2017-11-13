/* eslint-disable quotes */
'use strict';
const express = require('express');
const router = express.Router();
const models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', (req, res, next) => {
  User.findAll({
    attributes: ['name', 'id']
  }
  )
  .then(function(result) {
    console.log("RESULTS: ", result)
    res.render('users', {users: result})
  }).catch(next)

})

router.get('/:user', (req, res, next) => {
  let userPromise = User.findAll({
    where: {id: req.params.user}
  })

  let pagePromise = Page.findAll(
    {where: {authorId: req.params.user}}
  )
  Promise.all([pagePromise, userPromise])
  .then((results) => {
    res.render('singleUser', {
      pages: results[0],
      user: results[1][0]
    })
  }).catch(next)
})




module.exports = router;
