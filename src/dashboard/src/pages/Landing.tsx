import { Link } from 'react-router-dom';

const features = [
  {
    icon: '🔄',
    title: 'Auto-Renewal',
    desc: 'Zero-touch certificate renewal via ACME. Certs rotate before they expire — guaranteed.',
  },
  {
    icon: '🔗',
    title: 'Chain Repair',
    desc: 'Detects and repairs broken certificate chains, missing intermediates, and trust issues automatically.',
  },
  {
    icon: '📡',
    title: 'OCSP Stapling',
    desc: 'Configures and monitors OCSP stapling across all servers for optimal TLS performance.',
  },
  {
    icon: '🌐',
    title: 'Multi-Environment',
    desc: 'Bare metal, Docker containers, and Kubernetes — one agent manages them all.',
  },
  {
    icon: '🏷️',
    title: 'SAN Management',
    desc: 'Audits Subject Alternative Names and alerts when domains are missing or uncovered.',
  },
  {
    icon: '🔔',
    title: 'Smart Alerts',
    desc: 'Slack, email, PagerDuty, and webhooks. Know about issues before your users do.',
  },
];

const steps = [
  { step: '01', title: 'Install', desc: "npm install -g certifixes or pull the Docker image. Works on any Linux server in minutes." },
  { step: '02', title: 'Configure', desc: "Point certifixes at your domains and ACME provider. Supports Let's Encrypt, ZeroSSL, Buypass, and DigiCert." },
  { step: '03', title: 'Monitor', desc: 'The daemon watches your fleet 24/7. Open the dashboard to see cert health at a glance.' },
];

const pricing = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    highlight: false,
    features: ["Up to 5 domains", "Let's Encrypt only", 'Email alerts', 'CLI access', 'Community support'],
    cta: 'Get Started',
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    highlight: true,
    features: ['Unlimited domains', 'All ACME providers', 'Slack + PagerDuty alerts', 'Web dashboard', 'Docker & K8s support', 'Priority support'],
    cta: 'Start Free Trial',
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    highlight: false,
    features: ['Everything in Pro', 'Multi-team / SSO', 'DigiCert EV support', 'Audit logs', 'SLA guarantee', 'Dedicated support'],
    cta: 'Contact Sales',
  },
];

const testimonials = [
  {
    quote: "certifixes eliminated the 3 AM pages about expired certs. Our fleet of 400+ domains renews automatically — I haven't touched a cert in months.",
    name: 'Marcus T.',
    role: 'Principal SRE, Series B Fintech',
  },
  {
    quote: "The chain repair feature caught a broken intermediate CA that would have taken down our payment gateway. Saved us before customers noticed.",
    name: 'Priya S.',
    role: 'DevOps Lead, E-commerce Platform',
  },
  {
    quote: "We migrated 80 domains from a manual cert rotation process to certifixes in an afternoon. The Kubernetes operator is dead simple.",
    name: 'Jordan R.',
    role: 'Infrastructure Engineer, SaaS Startup',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Nav */}
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-green-400 text-xl">🔐</span>
          <span className="font-bold text-xl text-white">certifixes</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="https://github.com/midnghtsapphire/certifixes" className="hover:text-white transition-colors">GitHub</a>
        </div>
        <Link
          to="/dashboard"
          className="bg-green-600 hover:bg-green-500 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
        >
          Open Dashboard
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-green-950 border border-green-800 text-green-400 text-xs font-medium px-3 py-1 rounded-full mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
          Now in public beta — free for up to 5 domains
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
          Never lose sleep over<br />
          <span className="text-green-400">SSL certificates</span> again
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          certifixes monitors, auto-renews, and repairs SSL/TLS certificates across your entire infrastructure —
          bare metal, Docker, and Kubernetes — before issues reach your users.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/dashboard"
            className="bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-lg"
          >
            Get Started Free
          </Link>
          <Link
            to="/dashboard"
            className="border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors text-lg"
          >
            View Demo →
          </Link>
        </div>
        {/* Terminal preview */}
        <div className="mt-16 max-w-2xl mx-auto bg-gray-900 rounded-xl border border-gray-700 text-left overflow-hidden shadow-2xl">
          <div className="flex items-center gap-1.5 px-4 py-3 bg-gray-800 border-b border-gray-700">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-yellow-500" />
            <span className="h-3 w-3 rounded-full bg-green-500" />
            <span className="ml-3 text-xs text-gray-400 font-mono">certifixes scan</span>
          </div>
          <div className="p-4 font-mono text-sm space-y-1">
            <p className="text-gray-400">$ certifixes scan --fleet</p>
            <p className="text-green-400">✓ api.acmecorp.io — healthy (72 days)</p>
            <p className="text-green-400">✓ *.acmecorp.io — healthy (55 days, wildcard)</p>
            <p className="text-yellow-400">⚠ mail.oldcompany.org — expiring in 10 days</p>
            <p className="text-red-400">✗ api.legacyapp.io — URGENT: expires in 6 days</p>
            <p className="text-red-400">✗ portal.deadproject.com — EXPIRED 5 days ago</p>
            <p className="text-gray-500 mt-2">Scanned 12 domains in 2.4s</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Everything you need for cert management</h2>
          <p className="text-gray-400 max-w-xl mx-auto">From first-time setup to enterprise fleet management, certifixes handles the full lifecycle.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(f => (
            <div key={f.title} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-colors">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Up and running in minutes</h2>
            <p className="text-gray-400">No complex configuration. No DevOps expertise required.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map(s => (
              <div key={s.step} className="text-center">
                <div className="text-5xl font-extrabold text-green-900 mb-4">{s.step}</div>
                <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Simple, transparent pricing</h2>
          <p className="text-gray-400">Start free. Scale as you grow. No surprise bills.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricing.map(p => (
            <div
              key={p.name}
              className={`rounded-xl border p-6 flex flex-col ${
                p.highlight
                  ? 'border-green-500 bg-green-950/30'
                  : 'border-gray-700 bg-gray-900'
              }`}
            >
              {p.highlight && (
                <div className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-3">Most Popular</div>
              )}
              <h3 className="text-xl font-bold text-white">{p.name}</h3>
              <div className="mt-2 mb-6">
                <span className="text-4xl font-extrabold text-white">{p.price}</span>
                <span className="text-gray-400 text-sm">{p.period}</span>
              </div>
              <ul className="space-y-3 flex-1">
                {p.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-green-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/dashboard"
                className={`mt-8 block text-center py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                  p.highlight
                    ? 'bg-green-600 hover:bg-green-500 text-white'
                    : 'border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white'
                }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Trusted by SREs and DevOps teams</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <p className="text-gray-300 text-sm leading-relaxed mb-6">"{t.quote}"</p>
                <div>
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to stop worrying about certificates?</h2>
        <p className="text-gray-400 mb-8">Join teams that have eliminated SSL-related incidents.</p>
        <Link
          to="/dashboard"
          className="inline-block bg-green-600 hover:bg-green-500 text-white font-semibold px-10 py-4 rounded-lg transition-colors text-lg"
        >
          Get Started Free →
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span className="text-green-400">🔐</span>
            <span>certifixes © 2024 MIDNGHTSAPPHIRE</span>
          </div>
          <div className="flex gap-6">
            <a href="https://github.com/midnghtsapphire/certifixes" className="hover:text-gray-300 transition-colors">GitHub</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Docs</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
