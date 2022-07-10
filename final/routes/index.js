var express = require('express');
var router = express.Router();

// ログイン情報の取得 後で共通化
async function getLogin(req, res) {
  if (req.session === undefined || req.session.login === undefined || req.session.login === null) {
    return null;
  } else {
    return req.session.login;
  }
}


/* GET home page. */
router.get('/', async function (req, res, next) {
  // ログイン情報の取得
  let login = await getLogin(req, res);
  console.log(login);
  res.render('index', { title: 'Express', login: login });
});

module.exports = router;
