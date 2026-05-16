"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { customers, PLAN_LABELS, STATUS_LABELS, type Status, type Plan } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Search, Filter, Download, UserPlus } from "lucide-react";

function statusVariant(status: Status) {
  const map: Record<Status, "success" | "danger" | "info" | "warning"> = {
    active: "success",
    churned: "danger",
    trial: "info",
    paused: "warning",
  };
  return map[status];
}

function planVariant(plan: Plan) {
  const map: Record<Plan, "neutral" | "default" | "info"> = {
    starter: "neutral",
    growth: "default",
    scale: "info",
  };
  return map[plan];
}

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [planFilter, setPlanFilter] = useState<Plan | "all">("all");

  const filtered = customers.filter((c) => {
    const matchSearch =
      search === "" ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    const matchPlan = planFilter === "all" || c.plan === planFilter;
    return matchSearch && matchStatus && matchPlan;
  });

  const totalMrr = filtered.filter((c) => c.status === "active").reduce((sum, c) => sum + c.mrr, 0);

  return (
    <div>
      <Header title="Customers" subtitle={`${customers.length} total accounts`} />

      <div className="p-6 space-y-4">
        {/* Summary row */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total", value: customers.length, color: "text-gray-900" },
            { label: "Active", value: customers.filter((c) => c.status === "active").length, color: "text-green-700" },
            { label: "Trial", value: customers.filter((c) => c.status === "trial").length, color: "text-blue-700" },
            { label: "Churned", value: customers.filter((c) => c.status === "churned").length, color: "text-red-600" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500 mb-1">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters + actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as Status | "all")}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="trial">Trial</option>
              <option value="paused">Paused</option>
              <option value="churned">Churned</option>
            </select>

            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value as Plan | "all")}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
            >
              <option value="all">All Plans</option>
              <option value="starter">Starter</option>
              <option value="growth">Growth</option>
              <option value="scale">Scale</option>
            </select>

            <div className="ml-auto flex items-center gap-2">
              <Button variant="secondary" size="sm">
                <Download className="w-3.5 h-3.5" />
                Export
              </Button>
              <Button size="sm">
                <UserPlus className="w-3.5 h-3.5" />
                Add Customer
              </Button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing <strong className="text-gray-900">{filtered.length}</strong> customers &middot; {formatCurrency(totalMrr)}/mo active MRR
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-500 px-6 py-3">Customer</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Email</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Plan</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Status</th>
                  <th className="text-right text-xs font-medium text-gray-500 px-4 py-3">MRR</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Joined</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 pr-6">Last Active</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr key={c.id} className={`hover:bg-gray-50 transition-colors ${i < filtered.length - 1 ? "border-b border-gray-50" : ""}`}>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center shrink-0">
                          <span className="text-white text-xs font-bold">
                            {c.name.split(" ").map((n) => n[0]).join("")}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{c.name}</p>
                          <p className="text-xs text-gray-500">{c.company}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{c.email}</td>
                    <td className="px-4 py-3">
                      <Badge variant={planVariant(c.plan)}>{PLAN_LABELS[c.plan]}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant(c.status)}>{STATUS_LABELS[c.status]}</Badge>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">
                      {c.mrr > 0 ? formatCurrency(c.mrr) : "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{formatDate(c.joinedAt)}</td>
                    <td className="px-4 py-3 pr-6 text-gray-500">{formatDate(c.lastActive)}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-400 text-sm">
                      No customers match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
