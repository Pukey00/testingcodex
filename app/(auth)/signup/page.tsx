import Link from "next/link";
import { LineChart, Check } from "lucide-react";

const benefits = [
  "14-day free trial, no credit card",
  "Connect Stripe in under 60 seconds",
  "Track MRR, ARR, LTV, and CAC instantly",
  "Cancel anytime",
];

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center">
              <LineChart className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-xl">Metric</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">Start your free trial</h1>
          <p className="mt-1 text-sm text-gray-500">No credit card required. Cancel anytime.</p>
        </div>

        {/* Benefits */}
        <div className="mb-6 grid grid-cols-2 gap-2">
          {benefits.map((b) => (
            <div key={b} className="flex items-center gap-2 text-xs text-gray-600">
              <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
              {b}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <form action="/dashboard" method="get" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1.5">
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Alex"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Johnson"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Work email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@company.com"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1.5">
                Company name
              </label>
              <input
                id="company"
                type="text"
                placeholder="Acme Corp"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Min. 8 characters"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="plan" className="block text-sm font-medium text-gray-700 mb-1.5">
                Plan
              </label>
              <select
                id="plan"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
              >
                <option value="starter">Starter — $79/mo</option>
                <option value="growth" selected>Growth — $149/mo (Most popular)</option>
                <option value="scale">Scale — $299/mo</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-violet-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-violet-700 transition-colors mt-2"
            >
              Start free trial
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="text-violet-600 font-medium hover:text-violet-700">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          By signing up, you agree to our{" "}
          <a href="#" className="underline">Terms</a> and{" "}
          <a href="#" className="underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
