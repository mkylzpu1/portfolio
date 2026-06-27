# Portfolio

React + TypeScript + Vite を使用して開発したポートフォリオサイトです。

自身のスキルや開発実績を紹介するために制作しました。Three.js を活用したパーティクル演出やスクロールアニメーションを取り入れ、デザイン性と操作性を両立したサイトを目指しています。

---

## Website

ポートフォリオサイトはこちらからご覧いただけます。
🔗 https://mkylzpu1.github.io/portfolio/

---

## 技術スタック

| Category             | Technology                   |
| -------------------- | ---------------------------- |
| Frontend             | React 18, TypeScript 5, Vite |
| 3D Graphics          | Three.js                     |
| Animation            | GSAP, ScrollTrigger          |
| Routing              | React Router                 |
| Styling              | CSS Modules                  |
| Internationalization | i18next, react-i18next       |
| Quality              | ESLint, Prettier             |
| Development          | Docker, Docker Compose       |
| CI/CD                | GitHub Actions               |
| Hosting              | GitHub Pages                 |

---

## フォルダ構成

```
portfolio/
├── public/
│   ├── image/
│   └── music/
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

### Docker開発の場合

```bash
git clone <repository-url>
cd portfolio

docker compose up
```

Application:

```text
http://localhost:5173
```

---

### Node.js開発の場合

```bash
npm install
npm run dev
```

Application:

```text
http://localhost:5173
```
---

## License

This project is provided as a personal portfolio.
