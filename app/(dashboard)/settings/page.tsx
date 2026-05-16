"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { Check, CreditCard, Users, Bell, Shield, Zap, Globe } from "lucide-react";

const plans = [
  { name: "Starter", price: 79, features: ["100 customers", "Core metrics", "Email support"] },
  { name: "Growth", price: 149, features: ["1,000 customers", "Churn alerts", "LTV & CAC", "5 team members"] },
  { name: "Scale", price: 299, features: ["Unlimited customers", "Custom dashboards", "API access", "Unlimited seats", "CSM"] },
];

const teamMembers = [
  { name: "Alex Johnson", email: "alex@acme.io", role: "Owner", avatar: "AJ" },
  { name: "Maria Chen", email: "maria@acme.io", role: "Admin", avatar: "MC" },
  { name: "Ryan Patel", email: "ryan@acme.io", role: "Member", avatar: "RP" },
];

export default function SettingsPage() {
  const [currentPlan] = useState("growth");
  const [activeTab, setActiveTab] = useState("account");

  const tabs = [
    { id: "account", label: "Account", icon: Globe },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "team", label: "Team", icon: Users },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <div>
      <Header title="Settings" subtitle="Manage your account, billing, and team" />

      <div className="p-6">
        <div className="flex gap-6">
          {/* Sidebar tabs */}
          <div className="w-44 shrink-0">
            <nav className="space-y-0.5">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === id
                      ? "bg-violet-50 text-violet-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-6">
            {activeTab === "account" && (
              <>
                <Card>
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Company Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Company name", value: "Acme Corp" },
                      { label: "Website", value: "acme.io" },
                      { label: "Industry", value: "B2B SaaS" },
                      { label: "Company size", value: "11–50 employees" },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
                        <input
                          defaultValue={value}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button size="sm">Save changes</Button>
                  </div>
                </Card>

                <Card>
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Integrations</h3>
                  <div className="space-y-3">
                    {[
                      { name: "Stripe", desc: "Sync revenue and subscription data", connected: true },
                      { name: "Slack", desc: "Get churn alerts in your Slack channels", connected: true },
                      { name: "HubSpot", desc: "Sync customer data to your CRM", connected: false },
                      { name: "Intercom", desc: "Connect customer conversations to revenue", connected: false },
                    ].map((int) => (
                      <div key={int.name} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{int.name}</p>
                          <p className="text-xs text-gray-500">{int.desc}</p>
                        </div>
                        {int.connected ? (
                          <Badge variant="success">Connected</Badge>
                        ) : (
                          <Button variant="secondary" size="sm">Connect</Button>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}

            {activeTab === "billing" && (
              <>
                <Card>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">Current Plan</h3>
                      <p className="text-xs text-gray-500 mt-0.5">Growth — $149/month &middot; Renews June 1, 2026</p>
                    </div>
                    <Badge variant="success">Active</Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {plans.map((plan) => {
                      const isCurrent = plan.name.toLowerCase() === currentPlan;
                      return (
                        <div
                          key={plan.name}
                          className={`rounded-xl border-2 p-4 ${
                            isCurrent ? "border-violet-600 bg-violet-50" : "border-gray-200"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                            {isCurrent && (
                              <Badge variant="default">Current</Badge>
                            )}
                          </div>
                          <p className="text-2xl font-bold text-gray-900 mb-3">${plan.price}<span className="text-sm font-normal text-gray-500">/mo</span></p>
                          <ul className="space-y-1.5 mb-4">
                            {plan.features.map((f) => (
                              <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                                <Check className="w-3.5 h-3.5 text-violet-600 shrink-0" />
                                {f}
                              </li>
                            ))}
                          </ul>
                          {!isCurrent && (
                            <Button size="sm" variant={plan.price > 149 ? "primary" : "secondary"} className="w-full">
                              {plan.price > 149 ? (
                                <><Zap className="w-3.5 h-3.5" />Upgrade</>
                              ) : "Downgrade"}
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </Card>

                <Card>
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Payment Method</h3>
                  <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                    <CreditCard className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Visa ending in 4242</p>
                      <p className="text-xs text-gray-500">Expires 12/2028</p>
                    </div>
                    <Button variant="secondary" size="sm" className="ml-auto">Update</Button>
                  </div>
                </Card>
              </>
            )}

            {activeTab === "team" && (
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900">Team Members</h3>
                  <Button size="sm">Invite member</Button>
                </div>
                <div className="space-y-3">
                  {teamMembers.map((member) => (
                    <div key={member.email} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{member.avatar}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{member.name}</p>
                          <p className="text-xs text-gray-500">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={member.role === "Owner" ? "default" : "neutral"}>{member.role}</Badge>
                        {member.role !== "Owner" && (
                          <Button variant="ghost" size="sm">Remove</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === "notifications" && (
              <Card>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  {[
                    { label: "Churn alerts", desc: "When a customer cancels or goes at-risk", enabled: true },
                    { label: "New customer", desc: "When a trial converts or a new account signs up", enabled: true },
                    { label: "Failed payments", desc: "When an invoice payment fails", enabled: true },
                    { label: "MRR milestones", desc: "When MRR crosses a significant threshold", enabled: false },
                    { label: "Weekly digest", desc: "A weekly summary of key metrics", enabled: true },
                  ].map((n) => (
                    <div key={n.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{n.label}</p>
                        <p className="text-xs text-gray-500">{n.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={n.enabled} className="sr-only peer" />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-violet-600" />
                      </label>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === "security" && (
              <Card>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Security Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-50">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Two-factor authentication</p>
                      <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <Button size="sm" variant="secondary">Enable 2FA</Button>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-50">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Change password</p>
                      <p className="text-xs text-gray-500">Last changed 30 days ago</p>
                    </div>
                    <Button size="sm" variant="secondary">Update</Button>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm font-medium text-red-600">Delete account</p>
                      <p className="text-xs text-gray-500">Permanently delete your account and all data</p>
                    </div>
                    <Button size="sm" variant="danger">Delete</Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
