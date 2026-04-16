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

import { isFutureDate } from "../../utils/helpers";

export default function CO2Chart({
  chartData,
  range,
  setRange,
  selectedTree,
  selectedDate,
}) {
  const future = isFutureDate(selectedDate);

  if (future || !selectedTree.online) return null;

  const ranges = ["15M", "1H", "6H", "24H"];

  return (
    <div className="rounded-2xl border border-borderSoft bg-panelBg shadow-sm">
      <div className="flex justify-between p-5 pb-3">
        <h3 className="text-base font-semibold text-greenInk">
          CO₂ Inlet vs Outlet
        </h3>

        <div className="grid grid-cols-4 rounded-xl border">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-2 ${
                range === r ? "bg-primary text-white" : ""
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 pt-0 h-80">
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="inlet"
              name="Inlet CO₂ (kg)"
              stroke="#1fa37c"
              strokeWidth={2}
            />

            <Line
              type="monotone"
              dataKey="outlet"
              name="Outlet CO₂ (kg)"
              stroke="#6bc4a5"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}