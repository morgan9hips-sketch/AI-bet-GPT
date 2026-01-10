export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
        Terms of Service
      </h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
        Last Updated: January 10, 2026
      </p>

      <div className="prose dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            By accessing and using AI.bet-GPT ("the Service"), you accept and agree to be bound by
            the terms and provision of this agreement. If you do not agree to these Terms of Service,
            please do not use the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            AI.bet-GPT provides AI-powered sports betting analysis and predictions. The Service is
            intended for entertainment and informational purposes only. We do not guarantee the
            accuracy of predictions or betting recommendations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">3. User Responsibilities</h2>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
            <li>You must be at least 18 years old (or 21+ in some jurisdictions) to use this Service</li>
            <li>You are responsible for maintaining the confidentiality of your account</li>
            <li>You agree to use the Service in compliance with all applicable laws and regulations</li>
            <li>You will not misuse, abuse, or attempt to circumvent the Service's features or limitations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">4. Gambling Disclaimer</h2>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
            <p className="text-red-800 dark:text-red-200 font-semibold">
              ⚠️ IMPORTANT: Gambling can be addictive. Please gamble responsibly.
            </p>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The predictions and analysis provided by AI.bet-GPT are for entertainment purposes only.
            We do not guarantee wins, accuracy, or specific outcomes. You should never bet more than
            you can afford to lose. If you have a gambling problem, please seek help.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">5. Subscription and Payment Terms</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Premium subscriptions are billed monthly or annually. You may cancel your subscription
            at any time. Refunds are not provided for partial billing periods. API subscriptions
            are billed monthly based on your selected tier.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">6. API Usage Terms</h2>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
            <li>API keys must be kept confidential and not shared publicly</li>
            <li>Rate limits apply based on your subscription tier</li>
            <li>We reserve the right to suspend or terminate API access for violations</li>
            <li>API downtime or changes may occur with reasonable notice</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">7. Intellectual Property</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            All content, features, and functionality of the Service are owned by AI.bet-GPT and are
            protected by international copyright, trademark, and other intellectual property laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            AI.bet-GPT shall not be liable for any direct, indirect, incidental, special, consequential,
            or exemplary damages resulting from your use of the Service, including but not limited to
            betting losses, loss of profits, or loss of data.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">9. Privacy Policy</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Your use of the Service is also governed by our Privacy Policy. Please review our
            Privacy Policy to understand our practices.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">10. Modifications to Terms</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We reserve the right to modify these Terms of Service at any time. We will notify users
            of material changes via email or through the Service. Your continued use of the Service
            after changes constitutes acceptance of the modified terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">11. Termination</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We may terminate or suspend your account and access to the Service immediately, without
            prior notice, for any reason, including violation of these Terms of Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">12. Governing Law</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            These Terms shall be governed by and construed in accordance with the laws of the
            jurisdiction in which AI.bet-GPT operates, without regard to its conflict of law provisions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">13. Contact Information</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Email: legal@aibet-gpt.com
          </p>
        </section>
      </div>
    </div>
  );
}
