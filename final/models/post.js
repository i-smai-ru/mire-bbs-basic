'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    userId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "利用者は必須です。"
        }
      }
    },
    message: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "メッセージは必須です。"
        }
      }
    }
  }, {});

  Post.associate = function (models) {
    Post.belongsTo(models.User);
  };

  return Post;
};