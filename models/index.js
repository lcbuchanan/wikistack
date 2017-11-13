/* eslint-disable quotes */
const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

const Page = db.define('pages', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: 'page under construction'
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    tags: {
      type: Sequelize.ARRAY(Sequelize.STRING)
    }
  },
  {
  getterMethods:{
    route(){
      return `/wiki/${this.urlTitle}`;
    }
  }
});

const User = db.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
});

//helper function to make urlTitle
function titleToUrl (string){
  if (string){
    return string.replace(/\s+/g, '_').replace(/\W/g, '');
  }
  else {
    return Math.random().toString(36).substring(2, 7);
  }
}

Page.hook('beforeValidate', (page, options) => {
  page.urlTitle = titleToUrl(page.title);
});

Page.belongsTo(User, { as: 'author' });


module.exports = {
  db,
  Page,
  User
};
