# 概要

音MADを検索するためのサービスです。

評価基準になりそうなものをフィルターとして設定できます。

~~裏で [niconico コンテンツ検索 API](https://site.nicovideo.jp/search-api-docs/search.html) を呼び出しています。~~

- [廃止されました](https://blog.nicovideo.jp/niconews/143630.html)

裏で [niconico スナップショット検索 API](https://site.nicovideo.jp/search-api-docs/snapshot) を呼び出しています。

またその仕様上、検索結果ページの更新がその日の朝に一度だけになります。即時反映されません。

## パラメータの説明

以上、以下の両方を選択できる項目は、いずれか片方のみの検索にも対応しています。

### 並び替え

ソート順を選択出来ます。

人気順ソートは出来ません。

### マイリスト数

指定されたマイリスト数の範囲で検索します。

### 再生時間

指定された再生時間の範囲で検索します。

### 再生数

指定された再生数の範囲で検索します。

### 日付指定

指定された日付の範囲で検索します。

## クレジット

- [@\_naari\_](https://twitter.com/_naari_): 企画と開発
- [@readybug\_](https://twitter.com/readybug_): アイコン
- [@stysmmaker](https://github.com/stysmmaker) Introduce to i18n, English translation
