import { DiagnosticType, DiagnosticTypeInfo } from '@/types/diagnostic';

// MVPスコープ：タイプ名・絵文字・一言サマリーのみ（強み/苦手/役割/AI相性はStage 1に含めない）
export const typeDatabase: Record<DiagnosticType, DiagnosticTypeInfo> = {
  explorer: {
    id: 'explorer',
    name: '冒険者',
    emoji: '🧭',
    oneLineSummary:
      'パターンで素早く判断し、新しい可能性を求めて動きながら理解を深める。',
    axisCombo: {
      intuition: true,
      exploration: true,
      pragmatism: true,
      construction: true,
    },
  },
  innovator: {
    id: 'innovator',
    name: '創造者',
    emoji: '💡',
    oneLineSummary:
      'パターン認識から生まれるアイデアを、じっくり形にしてから世に出す。',
    axisCombo: {
      intuition: true,
      exploration: true,
      pragmatism: true,
      construction: false,
    },
  },
  catalyst: {
    id: 'catalyst',
    name: '触媒',
    emoji: '🔥',
    oneLineSummary:
      '直感で全体を掴み、動きながら周りを巻き込んで可能性を広げる。',
    axisCombo: {
      intuition: true,
      exploration: true,
      pragmatism: false,
      construction: true,
    },
  },
  architect: {
    id: 'architect',
    name: '構想者',
    emoji: '🏗️',
    oneLineSummary:
      'パターンから将来像を描き、全体の設計図を練り上げてから動く。',
    axisCombo: {
      intuition: true,
      exploration: true,
      pragmatism: false,
      construction: false,
    },
  },
  pragmatist: {
    id: 'pragmatist',
    name: '実践者',
    emoji: '⚡',
    oneLineSummary:
      'パターンで目標を絞り込み、動きながら結果で確かめていく。',
    axisCombo: {
      intuition: true,
      exploration: false,
      pragmatism: true,
      construction: true,
    },
  },
  designer: {
    id: 'designer',
    name: '設計者',
    emoji: '✨',
    oneLineSummary:
      '直感でゴールを見つけ、それをじっくり完成させてから形にする。',
    axisCombo: {
      intuition: true,
      exploration: false,
      pragmatism: true,
      construction: false,
    },
  },
  leader: {
    id: 'leader',
    name: 'リーダー',
    emoji: '👑',
    oneLineSummary:
      '全体像を掴み、目標を絞り込んで、動きながらチームを導く。',
    axisCombo: {
      intuition: true,
      exploration: false,
      pragmatism: false,
      construction: true,
    },
  },
  strategist: {
    id: 'strategist',
    name: '戦略家',
    emoji: '♟️',
    oneLineSummary:
      '直感で要点を掴み、明確な目標へ向けて緻密に練り上げる。',
    axisCombo: {
      intuition: true,
      exploration: false,
      pragmatism: false,
      construction: false,
    },
  },
  investigator: {
    id: 'investigator',
    name: '研究者',
    emoji: '🔬',
    oneLineSummary:
      '細部から仮説を立て、動きながら可能性を試していく。',
    axisCombo: {
      intuition: false,
      exploration: true,
      pragmatism: true,
      construction: true,
    },
  },
  researcher: {
    id: 'researcher',
    name: '探究者',
    emoji: '📚',
    oneLineSummary:
      '論理的に分析し、可能性をじっくり深掘りしてから形にする。',
    axisCombo: {
      intuition: false,
      exploration: true,
      pragmatism: true,
      construction: false,
    },
  },
  analyst: {
    id: 'analyst',
    name: '調査者',
    emoji: '📊',
    oneLineSummary:
      'ファクトを集め、動きながら複数の可能性を検証していく。',
    axisCombo: {
      intuition: false,
      exploration: true,
      pragmatism: false,
      construction: true,
    },
  },
  scholar: {
    id: 'scholar',
    name: '知識者',
    emoji: '🎓',
    oneLineSummary:
      '徹底分析から可能性を理論化し、じっくり体系立てる。',
    axisCombo: {
      intuition: false,
      exploration: true,
      pragmatism: false,
      construction: false,
    },
  },
  craftsman: {
    id: 'craftsman',
    name: '職人',
    emoji: '🛠️',
    oneLineSummary:
      '論理的に完成形を追求し、手を動かしながら仕上げていく。',
    axisCombo: {
      intuition: false,
      exploration: false,
      pragmatism: true,
      construction: true,
    },
  },
  perfectionist: {
    id: 'perfectionist',
    name: '完成者',
    emoji: '💎',
    oneLineSummary:
      '徹底的に分析して、唯一の完璧な答えをじっくり作り上げる。',
    axisCombo: {
      intuition: false,
      exploration: false,
      pragmatism: true,
      construction: false,
    },
  },
  optimizer: {
    id: 'optimizer',
    name: '改革者',
    emoji: '🚀',
    oneLineSummary:
      'ファクトから問題解決策を導き出し、動きながら実装していく。',
    axisCombo: {
      intuition: false,
      exploration: false,
      pragmatism: false,
      construction: true,
    },
  },
  guardian: {
    id: 'guardian',
    name: '検証者',
    emoji: '🛡️',
    oneLineSummary:
      '徹底検証から確実な結論を導き、じっくり固めてから進める。',
    axisCombo: {
      intuition: false,
      exploration: false,
      pragmatism: false,
      construction: false,
    },
  },
};

/**
 * 4軸のスコアから、現時点の仮説モデル（v0.1）に基づく推定タイプを算出する。
 *
 * 注意：これは「診断を確定する」関数ではない。
 * v0.1は検証待ちの仮説モデルであり（docs/adr/ADR-004参照）、
 * この関数が返す値はあくまで現行モデルに基づく推定ラベルである。
 * Stage 2の統計検証結果により、軸の統合・再定義が行われた場合、
 * この関数のロジック自体が置き換えられる可能性がある。
 */
export function estimateProvisionalType(
  intuitionScore: number,
  explorationScore: number,
  pragmatismScore: number,
  constructionScore: number
): DiagnosticType {
  const intuition = intuitionScore > 0;
  const exploration = explorationScore > 0;
  const pragmatism = pragmatismScore > 0;
  const construction = constructionScore > 0;

  if (intuition && exploration && pragmatism && construction) return 'explorer';
  if (intuition && exploration && pragmatism && !construction) return 'innovator';
  if (intuition && exploration && !pragmatism && construction) return 'catalyst';
  if (intuition && exploration && !pragmatism && !construction) return 'architect';
  if (intuition && !exploration && pragmatism && construction) return 'pragmatist';
  if (intuition && !exploration && pragmatism && !construction) return 'designer';
  if (intuition && !exploration && !pragmatism && construction) return 'leader';
  if (intuition && !exploration && !pragmatism && !construction) return 'strategist';
  if (!intuition && exploration && pragmatism && construction) return 'investigator';
  if (!intuition && exploration && pragmatism && !construction) return 'researcher';
  if (!intuition && exploration && !pragmatism && construction) return 'analyst';
  if (!intuition && exploration && !pragmatism && !construction) return 'scholar';
  if (!intuition && !exploration && pragmatism && construction) return 'craftsman';
  if (!intuition && !exploration && pragmatism && !construction) return 'perfectionist';
  if (!intuition && !exploration && !pragmatism && construction) return 'optimizer';

  return 'guardian';
}
