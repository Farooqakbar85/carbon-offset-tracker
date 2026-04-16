import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CostBenefitChart({ fleetSummary }) {
  const efficiency = Math.round(fleetSummary.avgEfficiency);
  const data = [
    { name: "Cost", value: Math.max(25, 100 - efficiency) },
    { name: "Savings", value: efficiency },
  ];

  const costBenefitValue = Math.round(fleetSummary.totalMonthKg * 0.95);

  return (
    <div className="rounded-2xl border border-borderSoft bg-panelBg p-5 shadow-sm">
      <h3 className="text-base font-semibold text-greenInk">
        Cost-Benefit Analysis
      </h3>

      <div className="mt-3 text-4xl font-bold text-greenInk">
        {costBenefitValue} kg
      </div>

      <div className="mt-4 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
            >
              <Cell fill="#6bc4a5" />
              <Cell fill="#f4b740" />
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex items-center justify-center gap-4 text-sm text-textSoft">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#6bc4a5]"></span>
          Cost
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#f4b740]"></span>
          Savings
        </div>
      </div>
    </div>
  );
}