import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ManagementImpactChart({ chartData }) {
  const data = chartData.map((item, index) => {
    const actual = Number((item.capture * 10).toFixed(1));
    const projected = Number((actual + index * 1.8).toFixed(1));
    const target = Number((actual * 0.75 + index * 1.2).toFixed(1));

    return {
      time: item.time,
      actual,
      projected,
      target,
    };
  });

  return (
    <div className="rounded-2xl border border-borderSoft bg-panelBg shadow-sm">
      <div className="p-5 pb-3">
        <h3 className="text-base font-semibold text-greenInk">
          Impact Trend and Projection
        </h3>
      </div>

      <div className="p-5 pt-0">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid stroke="rgba(31,163,124,0.08)" />
              <XAxis dataKey="time" tick={{ fill: "#5f7d73", fontSize: 12 }} />
              <YAxis tick={{ fill: "#5f7d73", fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="projected"
                name="Projected Goal"
                stroke="#1fa37c"
                strokeWidth={2.5}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="target"
                name="Target Trend"
                stroke="#f4b740"
                strokeWidth={2.5}
                strokeDasharray="6 4"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="actual"
                name="Actual"
                stroke="#6bc4a5"
                strokeWidth={2.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}