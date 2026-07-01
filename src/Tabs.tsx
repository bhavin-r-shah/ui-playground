import { useState } from "react";
import TicTacToe from "./TicTacToe";

const tabs = [
  {
    name: "Tic Tac Toe",
    value: "tic-tac-toe",
    content: <TicTacToe />,
  },
  {
    name: "Company",
    value: "company",
    content: "Update company settings, billing, and team details.",
  },
  {
    name: "Team Members",
    value: "team",
    content: "Invite, remove, and manage permissions for team members.",
  },
  {
    name: "Billing",
    value: "billing",
    content: "View invoices, update payment method, and manage your plan.",
  },
];

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  const activeTabData = tabs.find((tab) => tab.value === activeTab);

  return (
    <div className="w-full max-w-3xl">
      <div className="border-b border-gray-200">
        <nav aria-label="Tabs" className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const isActive = tab.value === activeTab;

            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={
                  isActive
                    ? "border-indigo-500 text-indigo-600 whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium"
                }
              >
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          {activeTabData.name}
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          {activeTabData.content}
        </p>
      </div>
    </div>
  );
}