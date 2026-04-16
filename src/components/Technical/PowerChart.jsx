import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { isFutureDate } from "../../utils/helpers";

export default function PowerChart({
  chartData,
  showPowerUsage,
  setShowPowerUsage,
  selectedDate,
}) {
  if (isFutureDate(selectedDate)) return null;

  return (
    <div className="space-y-4">
      <button
        onClick={() => setShowPowerUsage((prev) => !prev)}
        className="rounded-2xl bg-primary px-5 py-3 text-white"
      >
        {showPowerUsage ? "Hide Power Usage" : "Show Power Usage"}
      </button>

      {showPowerUsage && (
        <div className="rounded-2xl border border-borderSoft bg-panelBg">
          <div className="p-5 pb-3">
            <h3 className="text-base font-semibold text-greenInk">
              Power profile
            </h3>
          </div>

          <div className="p-5 pt-0 h-72">
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />

                <Bar dataKey="power" fill="#1fa37c" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}