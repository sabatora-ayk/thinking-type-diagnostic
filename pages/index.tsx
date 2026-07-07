import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/quiz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">💭</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            思考タイプ診断
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            あなたは「どんな人」ではなく、「どう考える人」なのか。
          </p>
        </div>

        <div className="bg-indigo-50 rounded-xl p-4 mb-8 space-y-2 text-sm text-gray-700">
          <p>🕐 診断時間：3〜5分</p>
          <p>❓ 質問数：16問</p>
          <p>📱 形式：ボタン選択式</p>
          <p>✨ 結果：4つの思考の軸から、今回の傾向をお伝えします</p>
        </div>

        <button
          onClick={handleStart}
          className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold py-4 px-6 rounded-xl transition duration-150 text-lg"
        >
          診断を始める
        </button>

        <p className="text-center text-xs text-gray-500 mt-6">
          ログイン不要・結果はシェア可能
        </p>
      </div>
    </div>
  );
}
