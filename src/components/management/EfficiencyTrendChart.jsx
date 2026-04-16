import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function EfficiencyTrendChart({ fleetSummary, chartData }) {
  return (
    <div className="rounded-2xl border border-borderSoft bg-panelBg p-5 shadow-sm">
      <h3 className="text-base font-semibold text-greenInk">
        Overall Efficiency Trend
      </h3>

      <div className="mt-3 text-4xl font-bold text-greenInk">
        {fleetSummary.avgEfficiency}%
      </div>

      <div className="mt-4 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid stroke="rgba(31,163,124,0.08)" />
            <XAxis dataKey="time" tick={{ fill: "#5f7d73", fontSize: 12 }} />
            <YAxis tick={{ fill: "#5f7d73", fontSize: 12 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="efficiency"
              stroke="#1fa37c"
              strokeWidth={2.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}