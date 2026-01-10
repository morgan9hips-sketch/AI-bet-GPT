'use client';

import { useState, useEffect } from 'react';

interface ApiKey {
  id: string;
  keyPrefix: string;
  planTier: string;
  callsUsed: number;
  callsLimit: number;
  resetDate: string;
  isActive: boolean;
  createdAt: string;
}

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKeyTier, setNewKeyTier] = useState<'hobby' | 'pro' | 'business' | 'enterprise'>('hobby');
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Fetch actual API keys from backend
    setApiKeys([
      {
        id: '1',
        keyPrefix: 'bet_live_abc123',
        planTier: 'pro',
        callsUsed: 2847,
        callsLimit: 10000,
        resetDate: '2026-02-01T00:00:00Z',
        isActive: true,
        createdAt: '2026-01-01T00:00:00Z',
      },
    ]);
  }, []);

  const handleCreateKey = () => {
    // TODO: Call API to create new key
    const mockKey = 'bet_live_' + Math.random().toString(36).substring(2, 15);
    setGeneratedKey(mockKey);
    setShowCreateModal(false);
  };

  const handleRevokeKey = (keyId: string) => {
    if (confirm('Are you sure you want to revoke this API key? This action cannot be undone.')) {
      // TODO: Call API to revoke key
      setApiKeys(apiKeys.filter(k => k.id !== keyId));
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">API Keys</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your API keys for accessing AI.bet-GPT services
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          + Create New Key
        </button>
      </div>

      {/* Warning */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <span className="text-yellow-600 dark:text-yellow-500 text-xl">⚠️</span>
          <div>
            <p className="text-sm text-yellow-800 dark:text-yellow-200 font-semibold">
              Keep your API keys secure
            </p>
            <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
              Never share your API keys publicly or commit them to version control. 
              If a key is compromised, revoke it immediately.
            </p>
          </div>
        </div>
      </div>

      {/* Generated Key Display */}
      {generatedKey && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h3 className="text-lg font-bold text-green-900 dark:text-green-100 mb-2">
            🎉 API Key Created Successfully!
          </h3>
          <p className="text-sm text-green-800 dark:text-green-200 mb-4">
            Make sure to copy your API key now. You won't be able to see it again!
          </p>
          <div className="flex items-center space-x-2">
            <code className="flex-1 bg-white dark:bg-gray-800 border border-green-300 dark:border-green-700 rounded px-4 py-3 text-sm font-mono">
              {generatedKey}
            </code>
            <button
              onClick={() => copyToClipboard(generatedKey)}
              className="px-4 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Copy
            </button>
          </div>
        </div>
      )}

      {/* API Keys List */}
      <div className="space-y-4">
        {apiKeys.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">🔑</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No API Keys Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create your first API key to start making requests
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Create API Key
            </button>
          </div>
        ) : (
          apiKeys.map((apiKey) => (
            <div
              key={apiKey.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <code className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded">
                      {apiKey.keyPrefix}...
                    </code>
                    <span
                      className={`text-xs px-2 py-1 rounded font-semibold ${
                        apiKey.isActive
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}
                    >
                      {apiKey.isActive ? 'Active' : 'Revoked'}
                    </span>
                    <span className="text-xs px-2 py-1 rounded font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 uppercase">
                      {apiKey.planTier}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Created on {new Date(apiKey.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {apiKey.isActive && (
                  <button
                    onClick={() => handleRevokeKey(apiKey.id)}
                    className="text-sm text-red-600 hover:text-red-700 font-semibold"
                  >
                    Revoke
                  </button>
                )}
              </div>

              {/* Usage Stats */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Usage this month</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {apiKey.callsUsed.toLocaleString()} / {apiKey.callsLimit.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${(apiKey.callsUsed / apiKey.callsLimit) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Resets on {new Date(apiKey.resetDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Key Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Create New API Key
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Select a plan tier for your new API key
            </p>

            <div className="space-y-3 mb-6">
              {(['hobby', 'pro', 'business', 'enterprise'] as const).map((tier) => (
                <label
                  key={tier}
                  className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    newKeyTier === tier
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="tier"
                    value={tier}
                    checked={newKeyTier === tier}
                    onChange={(e) => setNewKeyTier(e.target.value as any)}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900 dark:text-white capitalize">
                      {tier}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {tier === 'hobby' && '1,000 calls/mo'}
                      {tier === 'pro' && '10,000 calls/mo'}
                      {tier === 'business' && '100,000 calls/mo'}
                      {tier === 'enterprise' && 'Unlimited'}
                    </span>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateKey}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Create Key
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
