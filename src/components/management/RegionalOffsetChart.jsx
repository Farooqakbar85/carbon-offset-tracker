import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { fleetTrees } from "../../data/fleetData";
import { getTreeMetricsForDate } from "../../utils/helpers";

export default function RegionalOffsetChart({ fleetSummary, selectedDate }) {
  const groups = {};

  fleetTrees.forEach((tree) => {
    if (!groups[tree.province]) {
      groups[tree.province] = {
        province: tree.province,
        today: 0,
      };
    }

    const metrics = getTreeMetricsForDate(tree, selectedDate);
    groups[tree.province].today += metrics.todayCapture;
  });

  const data = Object.values(groups).map((row) => ({
    ...row,
    today: Number(row.today.toFixed(1)),
  }));

  const barColors = ["#1fa37c", "#6bc4a5", "#9dd9c3", "#c2eadb", "#d8f2e8"];

  return (
    <div className="rounded-2xl border border-borderSoft bg-panelBg p-5 shadow-sm">
      <h3 className="text-base font-semibold text-greenInk">
        Regional Offset Performance
      </h3>

      <div className="mt-3 text-4xl font-bold text-greenInk">
        {fleetSummary.totalCapturedTodayKg} kg
      </div>

      <div className="mt-4 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid stroke="rgba(31,163,124,0.08)" />
            <XAxis dataKey="province" tick={{ fill: "#5f7d73", fontSize: 12 }} />
            <YAxis tick={{ fill: "#5f7d73", fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="today" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={entry.province} fill={barColors[index % barColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}