import { TrendingUp, TrendingDown, DollarSign, Users, Target, Percent } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { getMetrics } from "@/lib/data";
import { cn } from "@/lib/utils";

function StatCard({
  label,
  value,
  change,
  changeLabel,
  icon: Icon,
  positive,
}: {
  label: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon: React.ComponentType<{ className?: string }>;
  positive?: boolean;
}) {
  const isPositive = change !== undefined ? (positive !== false ? change > 0 : change < 0) : undefined;

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">{label}</span>
        <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center">
          <Icon className="w-4 h-4 text-violet-600" />
        </div>
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {change !== undefined && (
          <div className={cn("flex items-center gap-1 mt-1 text-xs font-medium", isPositive ? "text-green-600" : "text-red-500")}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span>{formatPercent(Math.abs(change))} {changeLabel}</span>
          </div>
        )}
      </div>
    </Card>
  );
}

export default function MetricsCards() {
  const m = getMetrics();

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        label="Monthly Recurring Revenue"
        value={formatCurrency(m.mrr)}
        change={m.mrrGrowth}
        changeLabel="vs last month"
        icon={DollarSign}
      />
      <StatCard
        label="Annual Run Rate"
        value={formatCurrency(m.arr)}
        change={m.mrrGrowth}
        changeLabel="growth"
        icon={TrendingUp}
      />
      <StatCard
        label="Active Customers"
        value={m.totalCustomers.toLocaleString()}
        change={m.customerGrowth}
        changeLabel="vs last month"
        icon={Users}
      />
      <StatCard
        label="Net Revenue Churn"
        value={formatPercent(m.churnRate)}
        change={m.churnRate}
        changeLabel="monthly"
        icon={Percent}
        positive={false}
      />
      <StatCard
        label="Customer LTV"
        value={formatCurrency(m.ltv)}
        icon={Target}
      />
      <StatCard
        label="CAC"
        value={formatCurrency(m.cac)}
        icon={DollarSign}
      />
      <StatCard
        label="LTV:CAC Ratio"
        value={`${m.ltvCacRatio.toFixed(1)}x`}
        icon={TrendingUp}
      />
      <StatCard
        label="New MRR This Month"
        value={formatCurrency(m.newMrr)}
        icon={DollarSign}
      />
    </div>
  );
}
