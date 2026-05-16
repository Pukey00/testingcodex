import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { customers, PLAN_LABELS, STATUS_LABELS, type Status, type Plan } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";

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

export default function CustomerTable({ limit = 8 }: { limit?: number }) {
  const shown = customers.slice(0, limit);

  return (
    <Card padding={false}>
      <div className="p-6 pb-0">
        <CardHeader className="mb-0">
          <CardTitle>Recent Customers</CardTitle>
          <CardDescription>Latest signups and their subscription status</CardDescription>
        </CardHeader>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-xs font-medium text-gray-500 px-6 py-3">Customer</th>
              <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Plan</th>
              <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Status</th>
              <th className="text-right text-xs font-medium text-gray-500 px-4 py-3">MRR</th>
              <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 pr-6">Joined</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((c, i) => (
              <tr key={c.id} className={i < shown.length - 1 ? "border-b border-gray-50" : ""}>
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
                <td className="px-4 py-3">
                  <Badge variant={planVariant(c.plan)}>{PLAN_LABELS[c.plan]}</Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={statusVariant(c.status)}>{STATUS_LABELS[c.status]}</Badge>
                </td>
                <td className="px-4 py-3 text-right font-medium text-gray-900">
                  {c.mrr > 0 ? formatCurrency(c.mrr) : "—"}
                </td>
                <td className="px-4 py-3 pr-6 text-gray-500">{formatDate(c.joinedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
