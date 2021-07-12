# otomad-search

[https://otomad-search.vercel.app/](https://otomad-search.vercel.app/)

## 概要

音 MAD を検索するためのサービスです。

評価基準になりそうなものをフィルターとして設定できます。

裏で [niconico コンテンツ検索 API](https://site.nicovideo.jp/search-api-docs/search.html) を呼び出しています。

またその仕様上、17 ページ(1700 件目)以降を確認することは出来ません。

## パラメータの説明

以上、以下の両方を選択できる項目は、いずれか片方のみの検索にも対応しています。

### 並び替え

ソート順を選択出来ます。

人気順ソートは出来ません。

### マイリスト数

指定されたマイリスト数の範囲で検索します。

### 再生時間

指定された再生時間の範囲で検索します。

### 日付指定

指定された日付の範囲で検索します。

# Development

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Credit

- [@naari3](https://github.com/naari3) develop, maintenance
- [tw @readybug\_](https://twitter.com/readybug_) logo design
- [@stysmmaker](https://github.com/stysmmaker) Introduce to i18n, English translation
