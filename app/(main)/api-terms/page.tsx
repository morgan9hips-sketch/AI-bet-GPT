export default function ApiTermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
        API Terms of Service
      </h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
        Last Updated: January 10, 2026
      </p>

      <div className="prose dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">1. API License and Usage</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            By accessing the AI.bet-GPT API, you are granted a limited, non-exclusive,
            non-transferable license to use the API in accordance with these terms and your
            subscription plan.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">2. API Key Security</h2>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
            <li>API keys are confidential and must not be shared, published, or exposed publicly</li>
            <li>You are responsible for all activity under your API keys</li>
            <li>Lost or compromised keys must be reported and revoked immediately</li>
            <li>API keys should be stored securely (e.g., environment variables, secure vaults)</li>
            <li>Never commit API keys to version control systems</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">3. Rate Limits and Quotas</h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-700 rounded-lg p-4 mb-4">
            <p className="text-blue-900 dark:text-blue-100 font-semibold mb-2">Plan Limits:</p>
            <ul className="text-blue-800 dark:text-blue-200 space-y-1 text-sm">
              <li><strong>Hobby:</strong> 1,000 calls/month (~33/day)</li>
              <li><strong>Pro:</strong> 10,000 calls/month (~333/day)</li>
              <li><strong>Business:</strong> 100,000 calls/month (~3,333/day)</li>
              <li><strong>Enterprise:</strong> Unlimited (custom)</li>
            </ul>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Exceeding your rate limit will result in 429 (Too Many Requests) responses. Quotas
            reset monthly on your billing anniversary date. Systematic attempts to circumvent
            rate limits may result in API access suspension.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">4. Acceptable Use Policy</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">You may NOT use the API to:</p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
            <li>Violate any laws or regulations</li>
            <li>Infringe on intellectual property rights</li>
            <li>Transmit malicious code or conduct security attacks</li>
            <li>Scrape, harvest, or systematically download data</li>
            <li>Resell or redistribute API access without authorization</li>
            <li>Create a competitive service</li>
            <li>Mislead users about the source of predictions</li>
            <li>Promote illegal gambling or underage betting</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">5. Data Usage and Privacy</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            When using our API:
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
            <li>Your API requests and responses may be logged for security and debugging</li>
            <li>We may use aggregated, anonymized data for analytics and improvements</li>
            <li>You must comply with privacy laws when handling user data</li>
            <li>You are responsible for obtaining necessary user consents</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">6. Attribution Requirements</h2>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg p-4 mb-4">
            <p className="text-yellow-900 dark:text-yellow-100 font-semibold">
              Free and Hobby tier users must display "Powered by AI.bet-GPT" attribution.
            </p>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Pro, Business, and Enterprise tiers have optional white-label capabilities. Contact
            us for white-label licensing.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">7. Service Level and Availability</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We strive to maintain 99.9% uptime but do not guarantee uninterrupted service.
            Enterprise plans include SLA guarantees. We reserve the right to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
            <li>Perform scheduled maintenance with advance notice</li>
            <li>Make emergency updates for security or stability</li>
            <li>Throttle or suspend service during high-traffic periods</li>
            <li>Modify API endpoints with reasonable deprecation notice</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">8. Intellectual Property</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            All API responses, algorithms, and underlying technology remain the intellectual
            property of AI.bet-GPT. You may not:
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
            <li>Reverse engineer or attempt to extract our algorithms</li>
            <li>Cache responses beyond recommended TTL periods</li>
            <li>Use our data to train competing AI models</li>
            <li>Claim ownership of API-generated content</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">9. Payment and Billing</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            API subscriptions are billed monthly in advance. Payment terms:
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
            <li>Payment is processed via Stripe</li>
            <li>Billing occurs on the same day each month</li>
            <li>Failed payments result in immediate API suspension</li>
            <li>No refunds for partial billing periods</li>
            <li>Downgrades take effect at next billing cycle</li>
            <li>Upgrades are prorated and effective immediately</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">10. Support and Documentation</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Support levels by plan:
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
            <li><strong>Hobby:</strong> Email support (48-hour response)</li>
            <li><strong>Pro:</strong> Email support (24-hour response)</li>
            <li><strong>Business:</strong> Priority email + Slack channel (4-hour response)</li>
            <li><strong>Enterprise:</strong> Dedicated support + 24/7 phone (1-hour response)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">11. API Changes and Versioning</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We use semantic versioning (v1, v2, etc.). Major version changes:
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
            <li>Announced at least 90 days in advance</li>
            <li>Old versions supported for minimum 6 months after announcement</li>
            <li>Backward-compatible changes made within same major version</li>
            <li>Breaking changes require new major version</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">12. Suspension and Termination</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We may suspend or terminate API access if:
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
            <li>You violate these terms</li>
            <li>Your account has outstanding payment issues</li>
            <li>Your usage patterns indicate abuse</li>
            <li>Required by law or to protect our systems</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 mt-4">
            You may cancel your API subscription at any time through the billing portal.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">13. Liability and Warranties</h2>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg p-4 mb-4">
            <p className="text-red-900 dark:text-red-100 font-semibold">
              THE API IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND.
            </p>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We do not guarantee accuracy, reliability, or fitness for any particular purpose.
            In no event shall AI.bet-GPT be liable for indirect, incidental, or consequential
            damages including lost profits, data loss, or business interruption.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">14. Indemnification</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            You agree to indemnify and hold harmless AI.bet-GPT from any claims arising from:
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
            <li>Your use of the API</li>
            <li>Your violation of these terms</li>
            <li>Your infringement of third-party rights</li>
            <li>Content you submit through the API</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">15. Contact Information</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            For API-related questions or concerns:
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Developer Support: api@aibet-gpt.com<br />
            Technical Issues: support@aibet-gpt.com<br />
            Enterprise Sales: enterprise@aibet-gpt.com
          </p>
        </section>

        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-6 mt-8">
          <p className="text-gray-700 dark:text-gray-300 font-semibold">
            By using the AI.bet-GPT API, you acknowledge that you have read, understood, and
            agree to be bound by these API Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
}
