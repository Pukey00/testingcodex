import Header from "@/components/layout/Header";
import MetricsCards from "@/components/dashboard/MetricsCards";
import { MRRChart, NewVsChurnChart } from "@/components/dashboard/RevenueChart";
import CustomerTable from "@/components/dashboard/CustomerTable";
import { getMetrics } from "@/lib/data";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { TrendingUp, Users, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default function DashboardPage() {
  const m = getMetrics();

  return (
    <div>
      <Header
        title="Overview"
        subtitle="May 2026 — real-time revenue intelligence"
      />

      <div className="p-6 space-y-6">
        {/* Alert banner */}
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />
          <span>
            <strong>Churn alert:</strong> 3 Growth-plan customers haven&apos;t logged in for 14+ days.{" "}
            <a href="/customers" className="underline font-medium">View at-risk accounts &rarr;</a>
          </span>
        </div>

        {/* KPI cards */}
        <MetricsCards />

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <MRRChart />
          <NewVsChurnChart />
        </div>

        {/* Bottom row */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick stats */}
          <div className="space-y-4">
            <Card className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">ARR Target Progress</p>
                <p className="text-lg font-bold text-gray-900">{formatCurrency(m.arr)}</p>
                <p className="text-xs text-gray-500">of $10M goal</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-sm font-semibold text-green-600">{formatPercent((m.arr / 10_000_000) * 100)}</p>
              </div>
            </Card>

            <Card className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                <Users className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Customers to $10M ARR</p>
                <p className="text-lg font-bold text-gray-900">
                  {(10_000_000 / 12 / (m.mrr / m.totalCustomers)).toFixed(0)}
                </p>
                <p className="text-xs text-gray-500">total needed</p>
              </div>
            </Card>

            <Card>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Unit Economics</p>
              <div className="space-y-2.5">
                {[
                  { label: "LTV", value: formatCurrency(m.ltv) },
                  { label: "CAC", value: formatCurrency(m.cac) },
                  { label: "LTV:CAC", value: `${m.ltvCacRatio.toFixed(1)}x` },
                  { label: "Payback Period", value: `${Math.ceil(m.cac / (m.mrr / m.totalCustomers))} months` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-semibold text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Customer table */}
          <div className="lg:col-span-2">
            <CustomerTable limit={6} />
          </div>
        </div>
      </div>
    </div>
  );
}
