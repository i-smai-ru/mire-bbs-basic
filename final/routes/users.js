var express = require('express');
var router = express.Router();

const db = require('../models/index');

const { Op } = require("sequelize");

const bcrypt = require("bcrypt");

router.get('/', (req, res, next) => {
  const nm = req.query.name;
  const ml = req.query.mail;
  db.User.findAll({
    // where: {
    //   [Op.or]: [
    //     { name: { [Op.like]: '%' + nm + '%' } },
    //     { mail: { [Op.like]: '%' + ml + '%' } }
    //   ]
    // }
  }).then(usrs => {
    var data = {
      title: 'ユーザー一覧',
      content: usrs
    }
    res.render('users/index', data);
  });
});

router.get('/create', (req, res, next) => {
  var data = {
    title: 'ユーザー新規作成',
    form: new db.User(),
    err: null
  }
  res.render('users/create', data);
});

router.post('/create', (req, res, next) => {
  const form = {
    name: req.body.name,
    pass: req.body.pass,
    mail: req.body.mail,
  };
  db.sequelize.sync()
    .then(() => db.User.create(form)
      .then(usr => {
        res.redirect('/users')
      })
      .catch(err => {
        var data = {
          title: 'ユーザー新規作成',
          form: form,
          err: err
        }
        res.render('users/create', data);
      })
    )
});

router.get('/update', (req, res, next) => {
  db.User.findByPk(req.query.id)
    .then(usr => {
      var data = {
        title: 'ユーザー編集',
        form: usr
      }
      res.render('users/update', data);
    });
});

router.post('/update', (req, res, next) => {
  db.User.findByPk(req.body.id)
    .then(usr => {
      usr.name = req.body.name;
      usr.mail = req.body.mail;
      usr.save().then(() => res.redirect('/users'));
    });
});

router.get('/delete', (req, res, next) => {
  db.User.findByPk(req.query.id)
    .then(usr => {
      var data = {
        title: 'ユーザー削除',
        form: usr
      }
      res.render('users/delete', data);
    });
});

router.post('/delete', (req, res, next) => {
  db.User.findByPk(req.body.id)
    .then(usr => {
      usr.destroy().then(() => res.redirect('/users'));
    });
});

router.get('/login', (req, res, next) => {
  var data = {
    title: 'ログイン',
    content: '名前とパスワードを入力下さい。'
  }
  res.render('users/login', data);
});

router.post('/login', async (req, res, next) => {
  let salt = '$2a$10$VpsqBArIfdhGzJY1YO/xyO';
  let pass = await bcrypt.hash(req.body.pass, salt);

  db.User.findOne({
    where: {
      name: req.body.name,
      pass: pass
    }
  }).then(usr => {
    if (usr != null) {
      req.session.login = usr;
      console.log(req.session);
      let back = req.session.back;
      if (back == null) {
        back = '/';
      }
      res.redirect(back);
    } else {
      var data = {
        title: 'ログイン',
        content: '名前かパスワードに問題があります。再度入力下さい。'
      }
      res.render('users/login', data);
    }
  })
});

router.get('/logout', (req, res, next) => {
  req.session.login = null
  req.session.save(function (err) {
    if (err) next(err)
    req.session.regenerate(function (err) {
      if (err) next(err)
      res.redirect('/')
    })
  })

});

module.exports = router;
