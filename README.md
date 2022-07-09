# mire-bbs-basic

掲示板(Bulletin Board System)の制作を通じて、webアプリケーションの基礎を学ぶ。

### 機能
- ユーザーCRUD
- ログイン・ログアウト機能
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
- npm start
```
npm start
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
```