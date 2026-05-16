"use client";

import Header from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import { monthlyMetrics, customers, getMetrics } from "@/lib/data";
import { formatCurrency, formatPercent } from "@/lib/utils";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3 text-xs">
      <p className="font-semibold text-gray-900 mb-2">{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-gray-500">{entry.name}:</span>
          <span className="font-medium text-gray-900">
            {typeof entry.value === "number" && entry.value > 100
              ? formatCurrency(entry.value)
              : typeof entry.value === "number"
              ? formatPercent(entry.value)
              : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const churnData = monthlyMetrics.map((m) => ({
  ...m,
  churnRate: ((m.churnedMrr / (m.mrr - m.newMrr + m.churnedMrr)) * 100),
  growthRate: (m.newMrr / (m.mrr - m.newMrr + m.churnedMrr)) * 100,
}));

const planPie = [
  { name: "Starter ($79)", value: customers.filter((c) => c.plan === "starter" && c.status === "active").length, color: "#e5e7eb" },
  { name: "Growth ($149)", value: customers.filter((c) => c.plan === "growth" && c.status === "active").length, color: "#7c3aed" },
  { name: "Scale ($299)", value: customers.filter((c) => c.plan === "scale" && c.status === "active").length, color: "#4f46e5" },
];

const cohortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const cohortRetention = [
  [100, 91, 87, 84, 82, 80, 78, 77, 75, 74, 72, 71],
  [100, 92, 88, 85, 83, 81, 79, 78, 76, 74, 73],
  [100, 93, 89, 86, 84, 82, 80, 79, 77, 76],
  [100, 92, 88, 85, 83, 81, 80, 78, 77],
  [100, 93, 89, 87, 85, 83, 81, 80],
  [100, 94, 90, 87, 85, 84, 82],
];

export default function AnalyticsPage() {
  const m = getMetrics();

  return (
    <div>
      <Header title="Analytics" subtitle="Deep-dive into growth, retention, and cohorts" />

      <div className="p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Quick Ratio", value: (m.newMrr / m.churnedMrr).toFixed(2), desc: "New MRR ÷ Churned MRR. >4 is excellent.", good: m.newMrr / m.churnedMrr >= 4 },
            { label: "Net Revenue Retention", value: "108%", desc: "Revenue retained + expansion from existing customers.", good: true },
            { label: "Payback Period", value: `${Math.ceil(m.cac / (m.mrr / m.totalCustomers))} months`, desc: "Months to recover CAC from gross margin.", good: true },
          ].map((s) => (
            <Card key={s.label}>
              <div className="flex items-start justify-between mb-2">
                <p className="text-xs font-medium text-gray-500">{s.label}</p>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.good ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {s.good ? "Healthy" : "Watch"}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{s.value}</p>
              <p className="text-xs text-gray-400">{s.desc}</p>
            </Card>
          ))}
        </div>

        {/* Churn & Growth rate */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">MRR Churn Rate</h3>
            <p className="text-xs text-gray-500 mb-4">Monthly net revenue churn percentage</p>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={churnData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v.toFixed(1)}%`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="churnRate" name="Churn Rate" stroke="#ef4444" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Customer Growth</h3>
            <p className="text-xs text-gray-500 mb-4">Total paying customers over time</p>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyMetrics}>
                  <defs>
                    <linearGradient id="custGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="customers" name="Customers" stroke="#7c3aed" strokeWidth={2} fill="url(#custGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Plan mix + Cohort */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Revenue Mix by Plan</h3>
            <p className="text-xs text-gray-500 mb-4">Active customer distribution across pricing tiers</p>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={planPie} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={3}>
                    {planPie.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                  <Tooltip formatter={(value) => [`${value} customers`, ""]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Cohort Retention</h3>
            <p className="text-xs text-gray-500 mb-3">% of MRR retained from each monthly cohort</p>
            <div className="overflow-x-auto">
              <table className="text-xs w-full">
                <thead>
                  <tr>
                    <th className="text-left font-medium text-gray-500 py-1 pr-3">Cohort</th>
                    {cohortMonths.slice(0, 8).map((m) => (
                      <th key={m} className="font-medium text-gray-500 py-1 px-1.5">{m}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cohortRetention.map((row, i) => {
                    const cohortLabels = ["Dec '25", "Jan '26", "Feb '26", "Mar '26", "Apr '26", "May '26"];
                    return (
                      <tr key={i}>
                        <td className="py-1 pr-3 text-gray-600 font-medium whitespace-nowrap">{cohortLabels[i]}</td>
                        {row.slice(0, 8).map((v, j) => {
                          const intensity = v / 100;
                          return (
                            <td
                              key={j}
                              className="py-1 px-1.5 text-center rounded font-medium"
                              style={{
                                backgroundColor: `rgba(124, 58, 237, ${intensity * 0.6})`,
                                color: intensity > 0.6 ? "white" : "#374151",
                              }}
                            >
                              {v}%
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
