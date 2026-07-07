import { DiagnosticResult } from '@/types/diagnostic';

const SITE_NAME = '思考タイプ診断';

/**
 * シェア用テキストを生成する。
 * ADR-008のUI表現方針に基づき、断定的な人格分類ではなく
 * 「傾向」として表現する。
 */
export function buildShareText(result: DiagnosticResult, url: string): string {
  return `${result.typeInfo.emoji} 私の思考タイプは「${result.typeInfo.name}」の傾向が強く出ました。\n\n${SITE_NAME}\n${url}`;
}

/**
 * 結果テキストをクリップボードにコピーする。
 * Stage 1原則：外部通信を発生させない、ブラウザ標準APIのみで完結。
 */
export async function copyShareText(
  result: DiagnosticResult,
  url: string
): Promise<boolean> {
  const text = buildShareText(result, url);
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * X（旧Twitter）のWeb Intent URLを生成する。
 * サーバーを経由せず、ブラウザから直接Xの共有画面を開く。
 */
export function buildXShareUrl(result: DiagnosticResult, url: string): string {
  const text = `${result.typeInfo.emoji} 私の思考タイプは「${result.typeInfo.name}」の傾向が強く出ました。\n\n${SITE_NAME}`;
  const params = new URLSearchParams({ text, url });
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

/**
 * 現在のページの結果共有用URLを組み立てる。
 * タイプをクエリパラメータとして含めることで、
 * 将来のOGP画像生成（Stage 1.5、タイプ別に静的生成する方式）が
 * このURL構造だけで対応可能になるようにしておく。
 *
 * 例：/result/share?type=explorer
 * （現時点ではリンク先の専用ページは未実装。Stage 1.5で追加する）
 */
export function buildShareUrl(origin: string, result: DiagnosticResult): string {
  return `${origin}/?type=${result.type}`;
}

/**
 * 将来の拡張ポイント（Stage 1.5、未実装）：
 * タイプ別のOGP画像URLを返す関数。
 * ビルド時に /public/og/{type}.png を静的生成する方式を想定
 * （docs/adr/ADR-006参照）。実行時のサーバー処理は発生させない。
 *
 * export function getOgImageUrl(type: DiagnosticType): string {
 *   return `/og/${type}.png`;
 * }
 */
