'use client';

interface UpgradePromptProps {
  remainingAnalyses?: number;
  onUpgrade?: () => void;
}

export default function UpgradePrompt({
  remainingAnalyses = 0,
  onUpgrade,
}: UpgradePromptProps) {
  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade();
    } else {
      window.location.href = '/pricing';
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">Upgrade to Premium</h3>
          <p className="text-blue-100 mb-4">
            {remainingAnalyses > 0
              ? `You have ${remainingAnalyses} free analyses remaining today.`
              : "You've reached your daily free analysis limit."}
          </p>
          
          <ul className="space-y-2 mb-6">
            <li className="flex items-center space-x-2">
              <span className="text-green-300">✓</span>
              <span>Unlimited AI analyses</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-green-300">✓</span>
              <span>100% Ad-free experience</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-green-300">✓</span>
              <span>Access to all sports</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-green-300">✓</span>
              <span>Advanced statistics</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-green-300">✓</span>
              <span>Priority support</span>
            </li>
          </ul>

          <button
            onClick={handleUpgrade}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-lg"
          >
            Upgrade Now - $9.99/month
          </button>
        </div>

        <div className="flex-shrink-0 ml-4">
          <div className="text-5xl">💎</div>
        </div>
      </div>
    </div>
  );
}
