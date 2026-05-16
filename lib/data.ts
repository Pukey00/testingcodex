export type Plan = "starter" | "growth" | "scale";
export type Status = "active" | "churned" | "trial" | "paused";

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: Plan;
  status: Status;
  mrr: number;
  joinedAt: string;
  lastActive: string;
}

export interface MonthlyMetric {
  month: string;
  mrr: number;
  newMrr: number;
  churnedMrr: number;
  customers: number;
}

export const PLAN_PRICES: Record<Plan, number> = {
  starter: 79,
  growth: 149,
  scale: 299,
};

export const PLAN_LABELS: Record<Plan, string> = {
  starter: "Starter",
  growth: "Growth",
  scale: "Scale",
};

export const STATUS_LABELS: Record<Status, string> = {
  active: "Active",
  churned: "Churned",
  trial: "Trial",
  paused: "Paused",
};

export const customers: Customer[] = [
  { id: "c1", name: "Alex Johnson", email: "alex@acme.io", company: "Acme Corp", plan: "scale", status: "active", mrr: 299, joinedAt: "2024-01-15", lastActive: "2026-05-15" },
  { id: "c2", name: "Maria Chen", email: "maria@buildfast.com", company: "BuildFast", plan: "growth", status: "active", mrr: 149, joinedAt: "2024-03-02", lastActive: "2026-05-14" },
  { id: "c3", name: "James Wright", email: "james@cloudly.io", company: "Cloudly", plan: "scale", status: "active", mrr: 299, joinedAt: "2023-11-20", lastActive: "2026-05-15" },
  { id: "c4", name: "Sarah Kim", email: "sarah@devtools.co", company: "DevTools Co", plan: "starter", status: "active", mrr: 79, joinedAt: "2024-06-10", lastActive: "2026-05-13" },
  { id: "c5", name: "Tom Davis", email: "tom@edgestack.com", company: "EdgeStack", plan: "growth", status: "active", mrr: 149, joinedAt: "2024-02-28", lastActive: "2026-05-15" },
  { id: "c6", name: "Linda Park", email: "linda@flowsync.io", company: "FlowSync", plan: "scale", status: "active", mrr: 299, joinedAt: "2023-09-05", lastActive: "2026-05-14" },
  { id: "c7", name: "Carlos Ruiz", email: "carlos@growthlab.com", company: "GrowthLab", plan: "growth", status: "active", mrr: 149, joinedAt: "2024-04-18", lastActive: "2026-05-12" },
  { id: "c8", name: "Emily Tan", email: "emily@hubspot.io", company: "HubSoft", plan: "starter", status: "trial", mrr: 0, joinedAt: "2026-05-01", lastActive: "2026-05-15" },
  { id: "c9", name: "Ryan Patel", email: "ryan@inboxhero.com", company: "InboxHero", plan: "growth", status: "active", mrr: 149, joinedAt: "2024-07-22", lastActive: "2026-05-11" },
  { id: "c10", name: "Olivia Moore", email: "olivia@jettly.io", company: "Jettly", plan: "scale", status: "active", mrr: 299, joinedAt: "2024-01-08", lastActive: "2026-05-15" },
  { id: "c11", name: "Kevin Nguyen", email: "kevin@keynote.co", company: "Keynote Analytics", plan: "starter", status: "active", mrr: 79, joinedAt: "2024-09-30", lastActive: "2026-05-10" },
  { id: "c12", name: "Aisha Patel", email: "aisha@loopify.com", company: "Loopify", plan: "growth", status: "paused", mrr: 0, joinedAt: "2024-05-14", lastActive: "2026-04-28" },
  { id: "c13", name: "Daniel Lee", email: "daniel@metricai.io", company: "MetricAI", plan: "scale", status: "active", mrr: 299, joinedAt: "2023-12-01", lastActive: "2026-05-15" },
  { id: "c14", name: "Sophie Turner", email: "sophie@nodeflow.dev", company: "NodeFlow", plan: "starter", status: "active", mrr: 79, joinedAt: "2025-01-17", lastActive: "2026-05-14" },
  { id: "c15", name: "Marcus Bell", email: "marcus@opsgrid.com", company: "OpsGrid", plan: "growth", status: "churned", mrr: 0, joinedAt: "2024-03-09", lastActive: "2026-03-01" },
  { id: "c16", name: "Priya Singh", email: "priya@pipeview.io", company: "PipeView", plan: "scale", status: "active", mrr: 299, joinedAt: "2024-08-12", lastActive: "2026-05-15" },
  { id: "c17", name: "Connor Walsh", email: "connor@queryhub.com", company: "QueryHub", plan: "growth", status: "active", mrr: 149, joinedAt: "2025-02-20", lastActive: "2026-05-13" },
  { id: "c18", name: "Nina Reyes", email: "nina@rocketship.io", company: "Rocketship", plan: "starter", status: "active", mrr: 79, joinedAt: "2025-03-05", lastActive: "2026-05-12" },
  { id: "c19", name: "Jack Foster", email: "jack@stackhero.com", company: "StackHero", plan: "scale", status: "active", mrr: 299, joinedAt: "2024-10-23", lastActive: "2026-05-15" },
  { id: "c20", name: "Mia Collins", email: "mia@telepath.ai", company: "Telepath AI", plan: "growth", status: "trial", mrr: 0, joinedAt: "2026-04-30", lastActive: "2026-05-15" },
];

export const monthlyMetrics: MonthlyMetric[] = [
  { month: "Jun '25", mrr: 58200, newMrr: 8100, churnedMrr: 1200, customers: 421 },
  { month: "Jul '25", mrr: 64700, newMrr: 9300, churnedMrr: 800, customers: 469 },
  { month: "Aug '25", mrr: 71400, newMrr: 9800, churnedMrr: 1100, customers: 518 },
  { month: "Sep '25", mrr: 79600, newMrr: 11200, churnedMrr: 1000, customers: 577 },
  { month: "Oct '25", mrr: 88900, newMrr: 12100, churnedMrr: 800, customers: 645 },
  { month: "Nov '25", mrr: 97400, newMrr: 11500, churnedMrr: 3000, customers: 706 },
  { month: "Dec '25", mrr: 107200, newMrr: 13100, churnedMrr: 1300, customers: 777 },
  { month: "Jan '26", mrr: 118600, newMrr: 14200, churnedMrr: 2800, customers: 860 },
  { month: "Feb '26", mrr: 130100, newMrr: 14500, churnedMrr: 3000, customers: 943 },
  { month: "Mar '26", mrr: 143800, newMrr: 17200, churnedMrr: 3500, customers: 1043 },
  { month: "Apr '26", mrr: 159200, newMrr: 18900, churnedMrr: 3500, customers: 1154 },
  { month: "May '26", mrr: 174600, newMrr: 19400, churnedMrr: 4000, customers: 1266 },
];

export function getMetrics() {
  const current = monthlyMetrics[monthlyMetrics.length - 1];
  const previous = monthlyMetrics[monthlyMetrics.length - 2];

  const mrr = current.mrr;
  const arr = mrr * 12;
  const mrrGrowth = ((mrr - previous.mrr) / previous.mrr) * 100;

  const activeCustomers = customers.filter((c) => c.status === "active");
  const totalActiveMrr = activeCustomers.reduce((sum, c) => sum + c.mrr, 0);
  const avgRevenue = totalActiveMrr / activeCustomers.length;

  const ltv = avgRevenue * 12; // ~12 month average lifetime
  const cac = 200;
  const ltvCacRatio = ltv / cac;

  const churnRate = (current.churnedMrr / previous.mrr) * 100;
  const customerGrowth = ((current.customers - previous.customers) / previous.customers) * 100;

  return {
    mrr,
    arr,
    mrrGrowth,
    ltv,
    cac,
    ltvCacRatio,
    churnRate,
    totalCustomers: current.customers,
    customerGrowth,
    newMrr: current.newMrr,
    churnedMrr: current.churnedMrr,
  };
}
