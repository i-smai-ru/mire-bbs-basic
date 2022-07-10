# mire-bbs-basic

掲示板(Bulletin Board System)の制作を通じて、webアプリケーションの基礎を学ぶ。

### 機能
- ユーザーCRUD
- ログイン・ログアウト機能(簡易) 
- 投稿機能(ログイン時のみ)
- 閲覧と検索(非ログイン可)

### 学べること
- http通信の基礎(html,css含む)
- javascriptの基礎
- node.jsの基礎
- クッキーとセッションの基礎
- expressの基礎
- DBの基礎(sqlite3)
- ORMの基礎
- webアプリケーションのセキュリティの基礎


### 環境構築
- [volta](https://volta.sh/)インストール
- nodeインストール
- [sqlitebrowser](https://sqlitebrowser.org/dl/)インストール
- git clon or ダウンロード
- cd final && npm intall
```
npm install
```
- npm run dev
```
npm run dev
```

### 開発メモ
- Express Generatorのインストール
```
npm install -g express-generator
```
- アプリケーション作成
```
express --view=ejs final
```
- MIRE-BBS-BASIC直下にファイルを移動してbbsは削除
- 必要なパッケージのインストール
```
npm install express-session
npm install sqlite3
npm install sequelize
npm install sequelize-cli
npm install bcrypt
npm install -D nodemon
```
- Sequelizeの初期化
```
npx sequelize-cli init
```

- Userモデル作成
```
npx sequelize-cli model:generate --name User --attributes name:string,pass:string,mail:string
```

```javascript:models/user.js
User.associate = function (models) {
    User.hasMany(models.Post);
};
```

- Postモデル
```
npx sequelize-cli model:generate --name Post --attributes userId:integer,message:string
```
```javascript:models/post.js
Post.associate = function (models) {
    Post.belongsTo(models.User);
};
```

- シード作成
```
npx sequelize-cli seed:generate --name sample-user
npx sequelize-cli seed:generate --name sample-post
```

- migrationとシーディングの実行
```
npx sequelize-cli db:migrate --env development
npx sequelize-cli db:seed:all
```