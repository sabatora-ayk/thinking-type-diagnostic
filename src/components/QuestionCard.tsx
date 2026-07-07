import { Question } from '@/types/diagnostic';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answerIndex: 0 | 1 | 2 | 3) => void;
  disabled: boolean;
}

export default function QuestionCard({
  question,
  onAnswer,
  disabled,
}: QuestionCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <p className="text-gray-800 font-semibold text-lg leading-relaxed mb-6">
        {question.scenario}
      </p>

      <div className="space-y-3">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onAnswer(index as 0 | 1 | 2 | 3)}
            disabled={disabled}
            className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 active:bg-indigo-100 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-gray-800 text-sm leading-relaxed">
              {answer.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
