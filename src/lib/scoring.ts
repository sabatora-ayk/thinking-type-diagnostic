import {
  AxisScores,
  DiagnosticResult,
  UserAnswer,
  Question,
} from '@/types/diagnostic';
import { questions } from '@/data/questions';
import { typeDatabase, estimateProvisionalType } from '@/data/types';

// このスコアリングロジックが前提とするモデルのバージョン。
// docs/adr/ADR-004（設計v0.1の凍結）に対応する。
// Stage 2の検証結果によりモデルが改訂された場合、この値を更新する。
export const MODEL_VERSION = 'v0.1-hypothesis';

/**
 * ユーザーの回答から診断結果を計算する。
 *
 * 注意：この結果は確定した性格診断ではなく、v0.1仮説モデルに基づく
 * 現時点での推定である（DiagnosticResult.isProvisional参照）。
 *
 * @param answers - ユーザーの16個の回答
 * @returns 診断結果（仮説モデルに基づく推定）
 */
export function calculateDiagnosticResult(
  answers: UserAnswer[]
): DiagnosticResult {
  const answerMap = new Map(answers.map((a) => [a.questionId, a]));

  // 各軸のスコアを集計するための配列（生スコア、weight適用前）
  const axisScores: {
    intuition: number[];
    exploration: number[];
    pragmatism: number[];
    construction: number[];
  } = {
    intuition: [],
    exploration: [],
    pragmatism: [],
    construction: [],
  };

  // weight適用後の { スコア, 重み } ペアを軸ごとに集計
  const weightedByAxis: Record<
    keyof AxisScores,
    { score: number; weight: number }[]
  > = {
    intuition: [],
    exploration: [],
    pragmatism: [],
    construction: [],
  };

  for (const question of questions) {
    const answer = answerMap.get(question.id);
    if (!answer) continue;

    const selectedOption = question.answers[answer.answerIndex];
    const rawScore = selectedOption.score;
    const weight = getQuestionWeight(question);

    axisScores[question.axis].push(rawScore);
    weightedByAxis[question.axis].push({ score: rawScore, weight });
  }

  const scores: AxisScores = {
    intuition: calculateWeightedAverageScore(weightedByAxis.intuition),
    exploration: calculateWeightedAverageScore(weightedByAxis.exploration),
    pragmatism: calculateWeightedAverageScore(weightedByAxis.pragmatism),
    construction: calculateWeightedAverageScore(weightedByAxis.construction),
  };

  const type = estimateProvisionalType(
    scores.intuition,
    scores.exploration,
    scores.pragmatism,
    scores.construction
  );

  return {
    type,
    typeInfo: typeDatabase[type],
    scores,
    rawScores: axisScores,
    modelVersion: MODEL_VERSION,
    isProvisional: true,
  };
}

/**
 * 設問の重みを取得する。
 * v0.1では全設問が未設定（weight: undefined）のため、常に1.0を返す。
 * 将来、docs/design/thinking-type-v0.1-questions-16.md の検証結果に
 * 基づき questions.ts 側で個別に weight を設定した場合、
 * この関数を変更せずそのまま反映される。
 */
function getQuestionWeight(question: Question): number {
  return question.weight ?? 1.0;
}

/**
 * { score, weight } の配列から加重平均を計算し、-100〜+100に丸める。
 * 全weightが1.0の場合、単純平均と等価になる（現状の挙動を維持）。
 *
 * @param entries - スコアと重みのペアの配列
 * @returns 加重平均スコア（-100〜+100）
 */
function calculateWeightedAverageScore(
  entries: { score: number; weight: number }[]
): number {
  if (entries.length === 0) return 0;

  const weightedSum = entries.reduce(
    (sum, entry) => sum + entry.score * entry.weight,
    0
  );
  const totalWeight = entries.reduce((sum, entry) => sum + entry.weight, 0);

  if (totalWeight === 0) return 0;

  return Math.round(weightedSum / totalWeight);
}

/**
 * スコアを0-100スケールに正規化（表示用）
 * -100 → 0 / 0 → 50 / +100 → 100
 */
export function normalizeScoreForDisplay(score: number): number {
  return Math.round((score + 100) / 2);
}

/**
 * 軸の表示名を取得
 */
export function getAxisLabel(
  axis: keyof AxisScores
): { left: string; right: string } {
  const labels: Record<keyof AxisScores, { left: string; right: string }> = {
    intuition: { left: '分析', right: '直感' },
    exploration: { left: '収束', right: '探索' },
    pragmatism: { left: '規範', right: '実績' },
    construction: { left: '事前構築', right: '相互構築' },
  };
  return labels[axis];
}
