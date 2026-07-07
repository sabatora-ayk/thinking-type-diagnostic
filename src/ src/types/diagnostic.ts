// 4軸の定義（v0.1）
// intuition   : 直感←→分析（類似性照合 vs 属性分解）
// exploration : 探索←→収束（選択肢の並行保持 vs 早期絞込）
// pragmatism  : 実績←→規範（内的検証 vs 外的検証）
// construction: 事前構築←→相互構築（理解の完成タイミング）
export type AxisName =
  | 'intuition'
  | 'exploration'
  | 'pragmatism'
  | 'construction';

// スコア（-100 〜 +100）
export type AxisScore = number;

// 軸スコアオブジェクト
export interface AxisScores {
  intuition: AxisScore;
  exploration: AxisScore;
  pragmatism: AxisScore;
  construction: AxisScore;
}

// 質問の回答選択肢（強弱4段階：+100/+50/-50/-100）
export interface AnswerOption {
  text: string;
  score: AxisScore;
}

// 質問
export interface Question {
  id: string;
  index: number; // 1-16
  scenario: string;
  axis: AxisName;
  answers: [AnswerOption, AnswerOption, AnswerOption, AnswerOption];
  // 設問の重み（識別力）。v0.1では全設問1.0固定として扱う。
  // 将来Stage 2の因子分析・IRT的検証で設問ごとの識別力に差があると
  // 判明した場合、この値を更新するだけでスコアリング式自体は
  // 変更せずに反映できるようにする。省略時は1.0として扱う。
  weight?: number;
}

// ユーザーの回答
export interface UserAnswer {
  questionId: string;
  answerIndex: 0 | 1 | 2 | 3;
}

// 診断結果（16タイプのいずれか）
export type DiagnosticType =
  | 'explorer'
  | 'innovator'
  | 'catalyst'
  | 'architect'
  | 'pragmatist'
  | 'designer'
  | 'leader'
  | 'strategist'
  | 'investigator'
  | 'researcher'
  | 'analyst'
  | 'scholar'
  | 'craftsman'
  | 'perfectionist'
  | 'optimizer'
  | 'guardian';

// タイプの詳細情報（MVPスコープ：タイプ名・一言のみ）
export interface DiagnosticTypeInfo {
  id: DiagnosticType;
  name: string;
  emoji: string;
  oneLineSummary: string;
  axisCombo: {
    intuition: boolean; // true=直感, false=分析
    exploration: boolean; // true=探索, false=収束
    pragmatism: boolean; // true=実績, false=規範
    construction: boolean; // true=相互構築, false=事前構築
  };
}

// 診断結果のレスポンス
//
// 重要：この結果は「確定した性格診断」ではなく、
// docs/adr/ADR-004 で定義された「検証待ちの仮説モデル v0.1」に基づく
// 現時点での推定値である。type/typeInfoはユーザー向けの表示用ラベルだが、
// isProvisional/modelVersionにより、この推定が固定的な分類ではなく
// 今後Stage 2の実データ検証（内的一貫性・因子分析・軸間相関・
// 判別的妥当性）により変わりうるものであることをコード上で明示する。
export interface DiagnosticResult {
  type: DiagnosticType;
  typeInfo: DiagnosticTypeInfo;
  scores: AxisScores;
  rawScores: {
    intuition: AxisScore[];
    exploration: AxisScore[];
    pragmatism: AxisScore[];
    construction: AxisScore[];
  };
  // 使用した設計モデルのバージョン（ADR-004のv0.1に対応）
  modelVersion: string;
  // 常にtrue（v0.1段階では確定モデルが存在しないため）。
  // Stage 2検証を経てモデルが確定した場合にのみfalseへの変更を検討する。
  isProvisional: true;
}
