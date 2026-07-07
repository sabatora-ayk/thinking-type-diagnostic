/** @type {import('next').NextConfig} */
const nextConfig = {
  // Stage 1原則（docs/adr/ADR-006）：Static Export可能な
  // Next.jsアプリであることをゴールとする。
  // Cloudflare Pages / GitHub Pages / Netlify / Vercel(静的ホスティング)
  // いずれにも無修正でデプロイできる状態を維持する。
  output: 'export',

  // GitHub Pages等、末尾スラッシュの有無でルーティング挙動が
  // 変わる静的ホストとの互換性を高めるため、常にtrailingSlashを付与する。
  trailingSlash: true,

  images: {
    // next/imageの自動最適化はサーバー処理を必要とするため、
    // Static Export環境（サーバーなし）では使用できない。
    // 本アプリではnext/image自体を使用していないが、
    // 将来誤って使用された場合にビルドが失敗しないよう明示的に無効化する。
    unoptimized: true,
  },

  // GitHub Pagesの user/org 配下でない「プロジェクトページ」として
  // 公開する場合（例: username.github.io/repo-name/）は
  // 以下のようにbasePathの設定が必要になる。
  // Vercel・Cloudflare Pages・カスタムドメイン運用では不要なため、
  // v0.1ではコメントアウトのままとし、デプロイ先確定時に判断する。
  // basePath: '/thinking-type-diagnostic',
};

module.exports = nextConfig;
