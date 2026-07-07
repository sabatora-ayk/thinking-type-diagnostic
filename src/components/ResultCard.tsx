import { useState } from 'react';
import { DiagnosticResult, AxisScores } from '@/types/diagnostic';
import { normalizeScoreForDisplay, getAxisLabel } from '@/lib/scoring';
import { copyShareText, buildXShareUrl } from '@/lib/share';

interface ResultCardProps {
  result: DiagnosticResult;
}

const AXIS_ORDER: (keyof AxisScores)[] = [
  'intuition',
  'exploration',
  'pragmatism',
  'construction',
];

export default function ResultCard({ result }: ResultCardProps) {
  const { typeInfo, scores } = result;
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>(
    'idle'
  );

  const shareUrl =
    typeof window !== 'undefined' ? window.location.href : '';

  const handleCopy = async () => {
    const success = await copyShareText(result, shareUrl);
    setCopyState(success ? 'copied' : 'failed');
    setTimeout(() => setCopyState('idle'), 2000);
  };

  const handleXShare = () => {
    const url = buildXShareUrl(result, shareUrl);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      {/* タイプ表示：傾向表現を併記し、断定を避ける（ADR-008） */}
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">{typeInfo.emoji}</div>
        <p className="text-sm text-gray-500 mb-1">今回の回答では</p>
        <h1 className="text-3xl font-bold text-gray-800 mb-1">
          {typeInfo.name}
        </h1>
        <p className="text-sm text-gray-500 mb-4">の傾向が強く出ました</p>
        <p className="text-base text-gray-700 leading-relaxed border-l-4 border-indigo-400 pl-4 py-2 bg-indigo-50 text-left">
          {typeInfo.oneLineSummary}
        </p>
      </div>

      {/* 4軸スコア */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          あなたの思考の傾向
        </h2>
        <div className="space-y-4">
          {AXIS_ORDER.map((axis) => {
            const labels = getAxisLabel(axis);
            const normalized = normalizeScoreForDisplay(scores[axis]);
            const leaning = scores[axis] >= 0 ? labels.right : labels.left;

            return (
              <div key={axis}>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span className="font-semibold">{labels.left}</span>
                  <span className="font-semibold">{labels.right}</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 transition-all duration-300"
                    style={{ width: `${normalized}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{leaning}寄りの傾向</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 仮説モデルである旨の注記（ADR-004, ADR-008） */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <p className="text-xs text-gray-600 leading-relaxed">
          この結果は、性格を確定的に分類するものではなく、今回の回答
          パターンから見えた思考の傾向を表す自己理解のためのツールです。
          設問・タイプ分類は現在も検証・改善を続けている試作段階の
          モデルに基づいています。
        </p>
      </div>

      {/* シェア機能 */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">結果をシェア</h2>
        <div className="space-y-3">
          <button
            onClick={handleCopy}
            className="w-full bg-gray-700 hover:bg-gray-800 active:bg-gray-900 text-white font-bold py-3 px-4 rounded-xl transition duration-150"
          >
            {copyState === 'copied'
              ? 'コピーしました ✓'
              : copyState === 'failed'
                ? 'コピーに失敗しました'
                : '🔗 結果テキストをコピー'}
          </button>
          <button
            onClick={handleXShare}
            className="w-full bg-black hover:bg-gray-900 active:bg-gray-800 text-white font-bold py-3 px-4 rounded-xl transition duration-150"
          >
            𝕏 でシェア
          </button>
        </div>
      </div>

      <div className="text-center">
        <a
          href="/"
          className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm underline"
        >
          もう一度診断する
        </a>
      </div>
    </div>
  );
}
