export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
        Privacy Policy
      </h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
        Last Updated: January 10, 2026
      </p>

      <div className="prose dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            AI.bet-GPT ("we," "our," or "us") is committed to protecting your privacy. This Privacy
            Policy explains how we collect, use, disclose, and safeguard your information when you
            use our Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
          
          <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mb-4">
            <li>Email address</li>
            <li>Account credentials</li>
            <li>Payment information (processed securely through Stripe)</li>
            <li>API keys and usage data</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">Usage Information</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mb-4">
            <li>Betting predictions requested</li>
            <li>Sports and teams queried</li>
            <li>API calls and endpoints accessed</li>
            <li>Device information and IP address</li>
            <li>Browser type and operating system</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We use the collected information to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
            <li>Provide, maintain, and improve our Service</li>
            <li>Process payments and manage subscriptions</li>
            <li>Generate AI-powered predictions and analysis</li>
            <li>Send administrative notifications and updates</li>
            <li>Monitor and analyze usage patterns</li>
            <li>Detect and prevent fraud or abuse</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">4. Data Sharing and Disclosure</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We do not sell your personal information. We may share your information with:
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
            <li>Service providers (e.g., Stripe for payments, Supabase for database)</li>
            <li>Third-party analytics services</li>
            <li>Law enforcement when required by law</li>
            <li>Business partners with your consent</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">5. Cookies and Tracking</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We use cookies and similar tracking technologies to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
            <li>Remember your preferences and settings</li>
            <li>Analyze site traffic and usage patterns</li>
            <li>Deliver personalized content and advertisements</li>
            <li>Improve security and prevent fraud</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 mt-4">
            You can control cookies through your browser settings. However, disabling cookies may
            affect the functionality of the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">6. Data Security</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We implement industry-standard security measures to protect your information, including:
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
            <li>Encryption of data in transit and at rest</li>
            <li>Secure authentication protocols</li>
            <li>Regular security audits and updates</li>
            <li>Limited access to personal information</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 mt-4">
            However, no method of transmission over the Internet is 100% secure. We cannot guarantee
            absolute security of your information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">7. Your Rights (GDPR & CCPA)</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Depending on your location, you may have the following rights:
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to data processing</li>
            <li>Data portability</li>
            <li>Withdraw consent</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 mt-4">
            To exercise these rights, please contact us at privacy@aibet-gpt.com
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">8. Children's Privacy</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Our Service is not intended for users under 18 years of age (or 21+ in some jurisdictions).
            We do not knowingly collect information from children. If you believe we have collected
            information from a child, please contact us immediately.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">9. International Data Transfers</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Your information may be transferred to and processed in countries other than your own.
            These countries may have different data protection laws. By using our Service, you
            consent to such transfers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">10. Data Retention</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We retain your personal information for as long as necessary to provide the Service and
            comply with legal obligations. You may request deletion of your account at any time.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">11. Changes to This Policy</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We may update this Privacy Policy from time to time. We will notify you of material
            changes by posting the new policy on this page and updating the "Last Updated" date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">12. Contact Us</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            If you have questions about this Privacy Policy, please contact us:
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Email: privacy@aibet-gpt.com<br />
            Address: [Your Business Address]
          </p>
        </section>
      </div>
    </div>
  );
}
