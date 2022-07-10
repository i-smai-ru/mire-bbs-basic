'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "名前は必ず入力して下さい。"
        }
      }
    },
    pass: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "パスワードは必ず入力下さい。"
        }
      }
    },
    mail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "メールアドレスを入力下さい。"
        }
      }
    },
    deletedAt: {
      type: DataTypes.DATE
    }
  }, {
    paranoid: true, // 論理削除サポート
  });

  User.associate = function (models) {
    User.hasMany(models.Post);
  };

  return User;
};