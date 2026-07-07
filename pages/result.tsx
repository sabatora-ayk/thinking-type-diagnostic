import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { UserAnswer, DiagnosticResult } from '@/types/diagnostic';
import { calculateDiagnosticResult } from '@/lib/scoring';
import ResultCard from '@/components/ResultCard';

export default function Result() {
  const router = useRouter();
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    const { answers } = router.query;

    if (!answers || typeof answers !== 'string') {
      router.replace('/');
      return;
    }

    try {
      const parsedAnswers: UserAnswer[] = JSON.parse(answers);
      const diagnosticResult = calculateDiagnosticResult(parsedAnswers);
      setResult(diagnosticResult);
    } catch {
      setHasError(true);
    }
  }, [router, router.isReady, router.query]);

  if (hasError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-sm">
          <p className="text-gray-700 mb-4">
            結果を読み込めませんでした。もう一度診断をお試しください。
          </p>
          <a
            href="/"
            className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm underline"
          >
            トップへ戻る
          </a>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-gray-600">結果を計算中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="max-w-md mx-auto pt-8 pb-8">
        <ResultCard result={result} />
      </div>
    </div>
  );
}
