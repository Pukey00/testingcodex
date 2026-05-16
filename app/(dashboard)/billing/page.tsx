import Header from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { MRRChart, NewVsChurnChart } from "@/components/dashboard/RevenueChart";
import { customers, monthlyMetrics, PLAN_LABELS, PLAN_PRICES } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { TrendingUp, TrendingDown, DollarSign, ArrowUpRight } from "lucide-react";

const recentInvoices = [
  { id: "INV-2026-0042", customer: "Acme Corp", plan: "Scale", amount: 299, date: "2026-05-01", status: "paid" as const },
  { id: "INV-2026-0041", customer: "Cloudly", plan: "Scale", amount: 299, date: "2026-05-01", status: "paid" as const },
  { id: "INV-2026-0040", customer: "FlowSync", plan: "Scale", amount: 299, date: "2026-05-01", status: "paid" as const },
  { id: "INV-2026-0039", customer: "BuildFast", plan: "Growth", amount: 149, date: "2026-05-01", status: "paid" as const },
  { id: "INV-2026-0038", customer: "EdgeStack", plan: "Growth", amount: 149, date: "2026-05-01", status: "paid" as const },
  { id: "INV-2026-0037", customer: "Loopify", plan: "Growth", amount: 149, date: "2026-04-01", status: "failed" as const },
  { id: "INV-2026-0036", customer: "OpsGrid", plan: "Growth", amount: 149, date: "2026-03-01", status: "refunded" as const },
  { id: "INV-2026-0035", customer: "DevTools Co", plan: "Starter", amount: 79, date: "2026-05-01", status: "paid" as const },
];

const invoiceStatusVariant = (s: "paid" | "failed" | "refunded") => {
  if (s === "paid") return "success" as const;
  if (s === "failed") return "danger" as const;
  return "neutral" as const;
};

const planRevenue = (["starter", "growth", "scale"] as const).map((plan) => {
  const planCustomers = customers.filter((c) => c.plan === plan && c.status === "active");
  return {
    plan: PLAN_LABELS[plan],
    customers: planCustomers.length,
    mrr: planCustomers.length * PLAN_PRICES[plan],
    price: PLAN_PRICES[plan],
  };
});

const totalMrr = planRevenue.reduce((sum, p) => sum + p.mrr, 0);

export default function BillingPage() {
  const current = monthlyMetrics[monthlyMetrics.length - 1];
  const previous = monthlyMetrics[monthlyMetrics.length - 2];
  const netNew = current.newMrr - current.churnedMrr;

  return (
    <div>
      <Header title="Revenue" subtitle="MRR breakdown and invoice history" />

      <div className="p-6 space-y-6">
        {/* Top metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "MRR", value: formatCurrency(current.mrr), change: current.mrr - previous.mrr, positive: true, icon: DollarSign },
            { label: "New MRR", value: formatCurrency(current.newMrr), change: current.newMrr - previous.newMrr, positive: true, icon: TrendingUp },
            { label: "Churned MRR", value: formatCurrency(current.churnedMrr), change: current.churnedMrr - previous.churnedMrr, positive: false, icon: TrendingDown },
            { label: "Net New MRR", value: formatCurrency(netNew), change: netNew, positive: true, icon: ArrowUpRight },
          ].map((s) => (
            <Card key={s.label} className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">{s.label}</span>
                <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
                  <s.icon className="w-4 h-4 text-violet-600" />
                </div>
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{s.value}</p>
                <p className={`text-xs font-medium mt-0.5 ${s.change >= 0 === s.positive ? "text-green-600" : "text-red-500"}`}>
                  {s.change >= 0 ? "+" : ""}{formatCurrency(Math.abs(s.change))} vs last month
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <MRRChart />
          <NewVsChurnChart />
        </div>

        {/* Plan breakdown */}
        <Card>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Revenue by Plan</h3>
          <div className="space-y-3">
            {planRevenue.map((p) => {
              const pct = (p.mrr / totalMrr) * 100;
              return (
                <div key={p.plan} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{p.plan}</span>
                      <span className="text-gray-400 text-xs">{p.customers} customers @ ${p.price}/mo</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500">{pct.toFixed(1)}%</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(p.mrr)}</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Invoices */}
        <Card padding={false}>
          <div className="p-6 pb-0">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Recent Invoices</h3>
            <p className="text-xs text-gray-500">Latest billing activity across all accounts</p>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-y border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-500 px-6 py-3">Invoice</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Customer</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Plan</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Status</th>
                  <th className="text-right text-xs font-medium text-gray-500 px-4 py-3">Amount</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 pr-6">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentInvoices.map((inv, i) => (
                  <tr key={inv.id} className={`hover:bg-gray-50 ${i < recentInvoices.length - 1 ? "border-b border-gray-50" : ""}`}>
                    <td className="px-6 py-3 font-mono text-xs text-gray-600">{inv.id}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{inv.customer}</td>
                    <td className="px-4 py-3 text-gray-500">{inv.plan}</td>
                    <td className="px-4 py-3">
                      <Badge variant={invoiceStatusVariant(inv.status)}>
                        {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">${inv.amount}</td>
                    <td className="px-4 py-3 pr-6 text-gray-500">{formatDate(inv.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
