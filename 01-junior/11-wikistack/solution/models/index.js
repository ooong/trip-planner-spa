var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', { logging: false });
var marked = require('marked');

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false, // db process can handle this,
        // validate: {
        //     isEmail: true // this is done by Sequelize
        // }
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    tags: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        // page.tags = 'programming,coding,javascript'
        set: function (value) {

            var arrayOfTags;

            if (typeof value === 'string') {
                arrayOfTags = value.split(',').map(function (s) {
                    return s.trim();
                });
                this.setDataValue('tags', arrayOfTags);
            } else {
                this.setDataValue('tags', value);
            }

        }
    },
    route: {
        type: Sequelize.VIRTUAL,
        get () {
            return '/wiki/' + this.getDataValue('urlTitle')
        }
    },
    renderedContent: {
        type: Sequelize.VIRTUAL,
        get () {
            return marked(this.getDataValue('content'))
        }
    }
})

/**
 * Hooks
 */
Page.beforeValidate(function (page) {
  if (page.title) {
    page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
  }
})

/**
 * Class Methods
 */
Page.findByTag = function (tag) {
  return Page.findAll({
    where: {
      tags: {
        $overlap: [tag]
      }
    }
  });
}

/**
 * Instance methods
 */
Page.prototype.findSimilar = function () {
  return Page.findAll({
    where: {
      tags: {
        $overlap: this.tags
      },
      id: {
        $ne: this.id
      }
    }
  });
}

var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    }
});

Page.belongsTo(User, { as: 'author' });

// 1. creates author_id column in Page
    // with belongsTo the source gets the foreignKey (originating table, Page)
// 2. Ability to eagerly load (like a join) -- syntax is `include`
// 3. Page instances get methods
    // setAuthor, getAuthor, removeAuthor
// 4. More syntax -- cascade abilities


module.exports = {
    Page: Page,
    User: User,
    db: db
};









