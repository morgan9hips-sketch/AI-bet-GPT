export default function ResponsibleGamblingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
        Responsible Gambling
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        We're committed to promoting responsible gambling and providing resources to help you stay in control.
      </p>

      <div className="prose dark:prose-invert max-w-none">
        <section className="mb-8">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-4">
              ✅ Gamble Responsibly
            </h2>
            <p className="text-green-800 dark:text-green-200">
              Gambling should be fun and entertaining. Follow our guidelines to ensure your betting
              remains a positive experience.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Key Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-bold mb-2">💰 Set a Budget</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Only bet money you can afford to lose. Set a strict budget and never exceed it.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-bold mb-2">⏰ Set Time Limits</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Decide in advance how long you'll spend gambling and stick to it.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-bold mb-2">🚫 Don't Chase Losses</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Accept that losses are part of gambling. Never try to win back losses with bigger bets.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-bold mb-2">🎯 Keep it Fun</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Gambling should be entertainment, not a way to make money or solve financial problems.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Self-Assessment Quiz</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Answer these questions honestly to assess your gambling habits:
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-3">
            <div className="flex items-start space-x-3">
              <span className="text-gray-600 dark:text-gray-400">1.</span>
              <p className="text-gray-700 dark:text-gray-300">
                Have you ever bet more than you could afford to lose?
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-gray-600 dark:text-gray-400">2.</span>
              <p className="text-gray-700 dark:text-gray-300">
                Do you need to bet with larger amounts to get the same excitement?
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-gray-600 dark:text-gray-400">3.</span>
              <p className="text-gray-700 dark:text-gray-300">
                Have you tried to cut back on gambling but found it difficult?
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-gray-600 dark:text-gray-400">4.</span>
              <p className="text-gray-700 dark:text-gray-300">
                Has gambling caused problems in your relationships or work?
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-gray-600 dark:text-gray-400">5.</span>
              <p className="text-gray-700 dark:text-gray-300">
                Have you borrowed money or sold possessions to gamble?
              </p>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mt-4 italic">
            If you answered "yes" to one or more questions, you may want to seek help from the
            resources listed below.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Warning Signs</h2>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg p-6">
            <p className="text-red-900 dark:text-red-100 font-semibold mb-3">
              Seek help if you experience:
            </p>
            <ul className="list-disc pl-6 text-red-800 dark:text-red-200 space-y-2">
              <li>Preoccupation with gambling</li>
              <li>Increasing bet amounts to achieve excitement</li>
              <li>Failed attempts to control or stop gambling</li>
              <li>Restlessness or irritability when trying to cut down</li>
              <li>Gambling to escape problems or relieve negative emotions</li>
              <li>Chasing losses</li>
              <li>Lying about gambling activities</li>
              <li>Jeopardizing relationships or opportunities because of gambling</li>
              <li>Relying on others for money after gambling losses</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Help & Support Resources</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-3">
                🇺🇸 United States
              </h3>
              <div className="space-y-2 text-blue-800 dark:text-blue-200">
                <p>
                  <strong>National Council on Problem Gambling (NCPG)</strong><br />
                  24/7 Confidential Helpline: <strong className="text-2xl">1-800-522-4700</strong><br />
                  Website: <a href="https://www.ncpgambling.org" className="underline">www.ncpgambling.org</a><br />
                  Text: "GAMBLER" to 53342
                </p>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-300 dark:border-purple-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-purple-900 dark:text-purple-100 mb-3">
                🌍 International
              </h3>
              <div className="space-y-3 text-purple-800 dark:text-purple-200">
                <p>
                  <strong>Gamblers Anonymous</strong><br />
                  <a href="https://www.gamblersanonymous.org" className="underline">www.gamblersanonymous.org</a>
                </p>
                <p>
                  <strong>BeGambleAware (UK)</strong><br />
                  <a href="https://www.begambleaware.org" className="underline">www.begambleaware.org</a>
                </p>
                <p>
                  <strong>GamCare (UK)</strong><br />
                  Helpline: 0808 8020 133<br />
                  <a href="https://www.gamcare.org.uk" className="underline">www.gamcare.org.uk</a>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Self-Exclusion Programs</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Many jurisdictions offer self-exclusion programs that allow you to voluntarily ban
            yourself from gambling establishments and websites. Consider these options:
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
            <li><strong>GamStop (UK):</strong> Self-exclusion from all UK licensed gambling sites</li>
            <li><strong>National Self-Exclusion Database (US):</strong> Multi-state self-exclusion</li>
            <li><strong>Gambling site controls:</strong> Most sites offer deposit limits, time limits, and self-exclusion</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Tips for Family & Friends</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            If someone you know has a gambling problem:
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
            <li>Approach them with empathy and without judgment</li>
            <li>Encourage them to seek professional help</li>
            <li>Set boundaries about financial assistance</li>
            <li>Don't enable their gambling behavior</li>
            <li>Consider attending support groups for families</li>
          </ul>
        </section>

        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white mt-8">
          <h3 className="text-2xl font-bold mb-3">Remember</h3>
          <p className="text-lg">
            Gambling addiction is treatable. Help is available, and recovery is possible.
            Don't hesitate to reach out for support.
          </p>
        </div>
      </div>
    </div>
  );
}
