import Link from "next/link";
import {
  BarChart3,
  TrendingUp,
  Users,
  Zap,
  Shield,
  Bell,
  Check,
  ArrowRight,
  LineChart,
  Star,
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Revenue Analytics",
    description: "Track MRR, ARR, new MRR, and churned MRR with beautiful charts and real-time data.",
  },
  {
    icon: TrendingUp,
    title: "LTV & CAC Tracking",
    description: "Monitor your unit economics. Know your LTV:CAC ratio at a glance and optimize acquisition.",
  },
  {
    icon: Users,
    title: "Customer Intelligence",
    description: "Segment customers by plan, status, and revenue. Identify expansion and churn risk early.",
  },
  {
    icon: Bell,
    title: "Churn Alerts",
    description: "Get notified the moment a customer shows signs of churn. Act before it's too late.",
  },
  {
    icon: Shield,
    title: "Revenue Protection",
    description: "Dunning management and payment recovery built-in. Reduce involuntary churn by up to 30%.",
  },
  {
    icon: Zap,
    title: "Instant Setup",
    description: "Connect Stripe in 60 seconds. Import your data and start tracking revenue immediately.",
  },
];

const plans = [
  {
    name: "Starter",
    price: 79,
    description: "Perfect for early-stage SaaS",
    features: [
      "Up to 100 customers",
      "Core revenue metrics",
      "MRR & ARR tracking",
      "Email support",
    ],
    cta: "Start free trial",
    highlight: false,
  },
  {
    name: "Growth",
    price: 149,
    description: "For scaling SaaS teams",
    features: [
      "Up to 1,000 customers",
      "Everything in Starter",
      "Churn prediction alerts",
      "LTV & CAC analytics",
      "5 team members",
      "Priority support",
    ],
    cta: "Start free trial",
    highlight: true,
  },
  {
    name: "Scale",
    price: 299,
    description: "For high-growth companies",
    features: [
      "Unlimited customers",
      "Everything in Growth",
      "Custom dashboards",
      "API access",
      "Unlimited team members",
      "Dedicated CSM",
    ],
    cta: "Start free trial",
    highlight: false,
  },
];

const testimonials = [
  {
    quote: "Metric helped us spot churn signals 3 weeks earlier. We recovered $18K MRR in the first month.",
    author: "Sarah K.",
    role: "CEO, DevTools Co",
    avatar: "SK",
  },
  {
    quote: "Finally, a revenue dashboard that actually makes sense. Our whole team checks it every morning.",
    author: "James W.",
    role: "Head of Growth, Cloudly",
    avatar: "JW",
  },
  {
    quote: "Setup took 5 minutes. We had our first actionable insight within an hour. Incredible product.",
    author: "Priya S.",
    role: "Founder, PipeView",
    avatar: "PS",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
              <LineChart className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg">Metric</span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-gray-900 transition-colors">Customers</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-sm bg-violet-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-violet-700 transition-colors"
            >
              Start free trial
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-200 rounded-full px-4 py-1.5 text-sm text-violet-700 font-medium mb-8">
            <Star className="w-3.5 h-3.5 fill-violet-500 text-violet-500" />
            Trusted by 1,200+ B2B SaaS companies
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Revenue intelligence
            <br />
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              built for SaaS
            </span>
          </h1>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Track MRR, ARR, LTV, CAC, and churn in one powerful dashboard. Spot problems
            early, grow faster, and build a business worth keeping.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-xl font-semibold text-base hover:bg-violet-700 transition-colors shadow-lg shadow-violet-200"
            >
              Start free trial
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-gray-700 border border-gray-300 px-6 py-3 rounded-xl font-semibold text-base hover:bg-gray-50 transition-colors"
            >
              View live demo
            </Link>
          </div>

          <p className="mt-4 text-sm text-gray-400">14-day free trial &middot; No credit card required &middot; Cancel anytime</p>
        </div>
      </section>

      {/* Metrics bar */}
      <section className="py-10 bg-gray-950">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "$10M+", label: "ARR tracked" },
              { value: "1,200+", label: "SaaS companies" },
              { value: "2.3%", label: "Avg churn rate" },
              { value: "5.1x", label: "Avg LTV:CAC ratio" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything you need to grow</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Stop flying blind. Metric gives your team the data it needs to make confident decisions every day.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-2xl border border-gray-100 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-50 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center mb-4 group-hover:bg-violet-100 transition-colors">
                  <f.icon className="w-5 h-5 text-violet-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Loved by SaaS founders</h2>
            <p className="text-lg text-gray-500">Real results from real companies using Metric.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.author} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.author}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-lg text-gray-500">Start free. Upgrade as you grow.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 border-2 relative ${
                  plan.highlight
                    ? "border-violet-600 shadow-2xl shadow-violet-100"
                    : "border-gray-200"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-1">{plan.name}</h3>
                  <p className="text-sm text-gray-500">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-500 text-sm">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-violet-600 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-colors ${
                    plan.highlight
                      ? "bg-violet-600 text-white hover:bg-violet-700"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gray-950">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Start tracking your revenue today
          </h2>
          <p className="text-lg text-gray-400 mb-10">
            Join 1,200+ SaaS companies using Metric to grow faster and churn less.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-violet-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-violet-700 transition-colors"
          >
            Get started free
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-4 text-sm text-gray-600">14-day trial &middot; No credit card &middot; Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-violet-600 flex items-center justify-center">
              <LineChart className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-gray-400 text-sm font-medium">Metric</span>
          </div>
          <p className="text-gray-600 text-sm">&copy; 2026 Metric, Inc. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
