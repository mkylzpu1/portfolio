# Portfolio

Three.js パーティクルアニメーションを中心とした、React + TypeScript 製のポートフォリオサイトです。  
10,000個の粒子が訪問者を迎え、スクロールに応じて形状が変化します。

---

## 使用技術

| カテゴリ | ライブラリ / ツール | バージョン |
|----------|---------------------|-----------|
| UI フレームワーク | React | 18.x |
| 言語 | TypeScript | 5.x |
| ビルドツール | Vite | 5.x |
| 3D / WebGL | Three.js | 0.166.x |
| アニメーション | GSAP + ScrollTrigger | 3.12.x |
| ルーティング | React Router DOM | 6.x |
| Lint | ESLint (flat config) | 8.x |
| フォーマット | Prettier | 3.x |
| コンテナ | Docker + Docker Compose | - |
| パッケージマネージャー | npm | - |
| Node.js | LTS (22.x) | - |

---

## ディレクトリ構成

```
portfolio/
├── public/
│   └── models/          # .objファイル（パーティクルの形状）
├── src/
│   ├── assets/
│   │   └── shaders/     # GLSL頂点・フラグメントシェーダー
│   ├── components/
│   │   ├── canvas/      # Three.jsキャンバスのラッパー
│   │   ├── layout/      # ナビゲーションなどレイアウト系
│   │   ├── sections/    # スクロールアニメーション付きセクション
│   │   └── ui/          # 汎用UIコンポーネント（ローディング、フォームなど）
│   ├── hooks/           # カスタムフック（Three.jsシーン管理、タイピングアニメ）
│   ├── pages/           # ページコンポーネント（Home, About, Contact）
│   ├── routes/          # ルーティング定義
│   ├── styles/          # グローバルCSS・ページ共通スタイル
│   ├── types/           # TypeScript型定義・GLSLモジュール宣言
│   ├── utils/           # Three.jsのStage・ParticleMeshクラス
│   ├── App.tsx          # ローディング制御・アプリルート
│   └── main.tsx         # エントリーポイント
├── .env.example
├── .dockerignore
├── .gitignore
├── .prettierrc
├── Dockerfile
├── docker-compose.yml
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## ローカル開発手順

### Docker を使う場合（推奨）

```bash
# 1. リポジトリをクローン
git clone <repository-url>
cd portfolio

# 2. 環境変数をコピー
cp .env.example .env

# 3. コンテナ起動（初回はイメージビルドが走ります）
docker compose up

# 4. ブラウザでアクセス
open http://localhost:5173
```

ホットリロード対応済みです。ファイルを保存すると即時ブラウザに反映されます。

### ローカル（Node.js）を使う場合

```bash
npm install
cp .env.example .env
npm run dev
# → http://localhost:5173
```

---

## 開発コマンド

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | 本番ビルド（`dist/` に出力） |
| `npm run preview` | ビルド済みファイルをプレビュー |
| `npm run lint` | ESLint 実行 |
| `npm run lint:fix` | ESLint 自動修正 |
| `npm run format` | Prettier 整形 |
| `npm run format:check` | Prettier チェックのみ |

---

## 環境変数

`.env.example` をコピーして `.env` を作成し、値を設定してください。

| 変数名 | 説明 | 必須 |
|--------|------|------|
| `VITE_CONTACT_API_URL` | お問い合わせフォームの送信先 API エンドポイント | 任意 |

---

## OBJ モデルについて

`public/models/` に以下のファイルを配置することでパーティクルの形状変形が動作します。

```
public/models/
├── fourth1.obj   # 初期形状
├── desk.obj      # 第2形状
└── post.obj      # 第3形状
```

モデルファイルがない場合はランダムな星空パーティクルのみが表示されます。

---

## ライブラリ移行について

| 旧ライブラリ | 移行先 | 理由 |
|------------|--------|------|
| Webpack + Babel | Vite | 高速な HMR・設定量の削減 |
| `@barba/core` | React Router DOM | React のルーティングと統合。Barba は vanilla JS 向けで React では不要 |
| `@babel/polyfill`（非推奨） | なし | モダンブラウザを対象とするため不要 |
| `webpack-glsl-loader` | `vite-plugin-glsl` | Vite 対応の GLSL ローダー |
| `raw-loader` | なし | Vite は標準で raw import をサポート |
| `glslify-loader` | なし | シェーダーの複雑度が低いため不要 |
