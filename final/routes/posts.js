const express = require('express');
const router = express.Router();
const db = require('../models/index');
const { Op } = require("sequelize");

const pnum = 10;

// ログインのチェック
function check(req, res) {
    if (req.session.login == null) {
        req.session.back = '/posts';
        res.redirect('/users/login');
        return true;
    } else {
        return false;
    }
}
// ログイン情報の取得 todo: 後で共通化
async function getLogin(req, res) {
    if (req.session === undefined || req.session.login === undefined || req.session.login === null) {
        return null;
    } else {
        return req.session.login;
    }
}

// トップページ
router.get('/', (req, res, next) => {
    res.redirect('/posts/0');
});

// トップページにページ番号をつけてアクセス
router.get('/:page', async (req, res, next) => {

    // ログイン情報の取得
    let login = await getLogin(req, res);

    const pg = req.params.page * 1;
    db.Post.findAll({
        offset: pg * pnum,
        limit: pnum,
        order: [
            ['createdAt', 'DESC']
        ],
        include: [{
            model: db.User,
            required: true,
            paranoid: false
        }]
    }).then(posts => {
        var data = {
            title: '投稿',
            login: login,
            content: posts,
            page: pg
        }
        res.render('posts/index', data);
    });
});

// メッセージフォームの送信処理
router.post('/create', (req, res, next) => {
    if (check(req, res)) { return };
    db.sequelize.sync()
        .then(() => db.Post.create({
            userId: req.session.login.id,
            message: req.body.msg
        })
            .then(brd => {
                res.redirect('/posts');
            })
            .catch((err) => {
                res.redirect('/posts');
            })
        )
});


module.exports = router;