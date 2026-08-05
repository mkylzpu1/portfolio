# i18n 構造について

## これまでの構造（問題点）

`ja.json` / `en.json` に静的なUI文言（nav, home, about など）を書きつつ、
プロジェクト詳細（`projectData.<id>.*`）だけは `i18n/index.ts` の中で
CMSコンテンツ（`data/projects.ts` の `rawProjectContent`）から**実行時に動的生成**して
マージするという二重構造になっていた。

```
ja.json / en.json ─┬─ 静的UI文言（そのまま使う）
                    └─ projectData.common（静的・見出しラベルのみ）

data/projects.ts（CMS） ─→ i18n/index.ts が動的に
                             projectData.<id>.* を組み立てて注入
```

この設計自体（CMSコンテンツをi18nリソースとして扱う）は妥当だが、
「なぜ `projectData` の中身が ja.json に定義されていないのか」が
ファイルを跨がないと分からず、読み手にとって分かりにくかった。

## 見直し後の方針

構造そのもの（動的マージ）は変更しない。CMSと連携させる以上、
ビルド時ではなく実行時にマージする設計は理にかなっている。
その代わり、**責務の境界を名前とコメントで明示する**ことで可読性を上げる。

1. `i18n/locales/*.json` には **「CMSと無関係な静的UI文言」のみ** を置く、
   というルールをコメントで明記する（下記 `ja.json` 冒頭コメント参照）。
2. `projectData.<id>.*` の生成ロジックは `i18n/index.ts` 内に留めず、
   `i18n/buildProjectResources.ts` として関数を独立させ、
   「CMSデータをi18nextのリソース形式に変換する」責務を1ファイルに閉じ込める。
3. `i18n/index.ts` は「静的リソースと動的リソースをマージしてi18nextを初期化するだけ」
   の薄いファイルにする。

## 新しいファイル構成

```
i18n/
  index.ts                  # i18next初期化。静的+動的リソースをマージするだけ
  buildProjectResources.ts  # CMSデータ(rawProjectContent) → projectData.* への変換ロジック
  locales/
    ja.json                 # 静的UI文言のみ（projectData.common含む）
    en.json                 # 同上
  README.md                 # このファイル
```

## 注意: JSONファイルにコメントは書けないため

`ja.json` / `en.json` 自体にコメントは入れられないので、
「ここはCMSと無関係な静的文言専用」というルールは README とこのファイルの
`buildProjectResources.ts` 側のコメントで担保する。
