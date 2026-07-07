import { useState } from 'react';
import { useRouter } from 'next/router';
import { questions } from '@/data/questions';
import { UserAnswer } from '@/types/diagnostic';
import QuestionCard from '@/components/QuestionCard';
import ProgressBar from '@/components/ProgressBar';

export default function Quiz() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const handleAnswer = (answerIndex: 0 | 1 | 2 | 3) => {
    if (isTransitioning) return;

    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      answerIndex,
    };
    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (currentIndex === totalQuestions - 1) {
      // 最終問題完了。回答データはURLクエリで結果画面へ引き渡す
      // （Stage 1原則：サーバー保存を行わず、ブラウザ内のみで完結させる）
      setIsTransitioning(true);
      router.push({
        pathname: '/result',
        query: { answers: JSON.stringify(updatedAnswers) },
      });
      return;
    }

    setCurrentIndex(currentIndex + 1);
  };

  const handleBack = () => {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
    setAnswers(answers.slice(0, -1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="mb-6">
          <ProgressBar current={currentIndex + 1} total={totalQuestions} />
          <p className="text-center text-sm text-gray-600 mt-2">
            {currentIndex + 1} / {totalQuestions}
          </p>
        </div>

        <QuestionCard
          question={currentQuestion}
          onAnswer={handleAnswer}
          disabled={isTransitioning}
        />

        <div className="text-center">
          <button
            onClick={handleBack}
            disabled={currentIndex === 0 || isTransitioning}
            className="text-gray-600 hover:text-gray-800 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ← 前の質問に戻る
          </button>
        </div>
      </div>
    </div>
  );
}
