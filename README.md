# management-app
体重と運動距離を記録してグラフで表示してくれるアプリです

## アプリ概要
運動距離データと体重データをグラフで視覚化する事で、危機意識とモチベーション向上を図るアプリです。

**デモ**

デモページ公開中です。
本来であれば登録ユーザの情報を表示するアプリですが、デモページ向け専用のデータを表示する仕様にしております。<br>
https://www.management-app.work/users/sign_in

## 機能
**Ruby on Railsで制作したアプリとなります**

- 機能1　ユーザー登録時に体重、身長、運動距離を入力する事で、ユーザテーブルにでーたを代入
- 機能2　投稿された体重や運動距離のデータを元に、自動的にグラフ描写(Chart.js,gonを使用）
- 機能3　日付を元に絞り込み機能実装

## 使い方
1.画面右上の「新規登録」ボタンよりユーザ登録<br>
2.「新規記録」ボタンより、本日の体重、身長、運動距離を投稿<br>
3.投稿されたデータがグラフで表示される
## インストール
```
$ https://github.com/ryutarooooo/management_app.git
$ cd management_app
$ bundle install
```
その他
本コードはデモページ作成用に一部機能を制限したコードとなっております。

## 作者
<a href="https://twitter.com/ryutaro_nagata" class="twitter" target="_blank">永田　隆太朗:Twitter</a>


## ライセンス
This project is licensed free.<br>
ご自由にご利用ください