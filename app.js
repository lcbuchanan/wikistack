/* eslint-disable quotes */
'use strict';
const express = require('express');
const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const models = require('./models');


//syncing database and starting app


models.db.sync({ force: true })
.then(function (){
  app.listen(1337, () => {console.log('listening on port 1337')});
})
.catch(console.error);

//making nunjucks work
app.set('view engine', 'html');
nunjucks.configure('views', { noCache: true });
app.engine('html', nunjucks.render);

//some middleware
app.use(morgan('dev'));
app.use(express.static('public'));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX


app.use('/', routes);
