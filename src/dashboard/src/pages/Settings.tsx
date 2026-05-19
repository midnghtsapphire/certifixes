import { useState } from 'react';

export default function Settings() {
  const [acmeProvider, setAcmeProvider] = useState('letsencrypt');
  const [dnsProvider, setDnsProvider] = useState('cloudflare');
  const [slackEnabled, setSlackEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [pagerdutyEnabled, setPagerdutyEnabled] = useState(false);
  const [webhookEnabled, setWebhookEnabled] = useState(false);
  const [renewDaysBefore, setRenewDaysBefore] = useState(30);
  const [retryInterval, setRetryInterval] = useState(6);

  return (
    <div className="space-y-6 max-w-2xl">
      {/* ACME Provider */}
      <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
        <h2 className="text-sm font-semibold text-gray-200 mb-4">ACME Provider</h2>
        <div className="space-y-3">
          {['letsencrypt', 'zerossl', 'buypass', 'digicert'].map(p => (
            <label key={p} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="acme"
                value={p}
                checked={acmeProvider === p}
                onChange={() => setAcmeProvider(p)}
                className="text-green-500"
              />
              <span className="text-sm text-gray-300 capitalize">{p}</span>
            </label>
          ))}
        </div>
      </div>

      {/* DNS Provider */}
      <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
        <h2 className="text-sm font-semibold text-gray-200 mb-4">DNS Provider</h2>
        <select
          value={dnsProvider}
          onChange={e => setDnsProvider(e.target.value)}
          className="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-300 w-full focus:outline-none"
        >
          <option value="cloudflare">Cloudflare</option>
          <option value="route53">AWS Route53</option>
          <option value="gcloud">Google Cloud DNS</option>
          <option value="azure">Azure DNS</option>
          <option value="digitalocean">DigitalOcean DNS</option>
        </select>
      </div>

      {/* Alert Channels */}
      <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
        <h2 className="text-sm font-semibold text-gray-200 mb-4">Alert Channels</h2>
        <div className="space-y-4">
          {[
            { label: 'Slack', enabled: slackEnabled, set: setSlackEnabled },
            { label: 'Email', enabled: emailEnabled, set: setEmailEnabled },
            { label: 'PagerDuty', enabled: pagerdutyEnabled, set: setPagerdutyEnabled },
            { label: 'Webhook', enabled: webhookEnabled, set: setWebhookEnabled },
          ].map(ch => (
            <div key={ch.label} className="flex items-center justify-between">
              <span className="text-sm text-gray-300">{ch.label}</span>
              <button
                onClick={() => ch.set(!ch.enabled)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                  ch.enabled ? 'bg-green-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                    ch.enabled ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Renewal Settings */}
      <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
        <h2 className="text-sm font-semibold text-gray-200 mb-4">Renewal Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Renew {renewDaysBefore} days before expiry</label>
            <input
              type="range"
              min={7}
              max={60}
              value={renewDaysBefore}
              onChange={e => setRenewDaysBefore(Number(e.target.value))}
              className="w-full accent-green-500"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Retry interval: {retryInterval}h</label>
            <input
              type="range"
              min={1}
              max={24}
              value={retryInterval}
              onChange={e => setRetryInterval(Number(e.target.value))}
              className="w-full accent-green-500"
            />
          </div>
        </div>
      </div>

      <button className="bg-green-700 hover:bg-green-600 text-white text-sm font-medium px-5 py-2 rounded-md transition-colors">
        Save Settings
      </button>
    </div>
  );
}
