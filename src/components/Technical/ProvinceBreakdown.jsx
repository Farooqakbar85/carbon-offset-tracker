import { getTreeMetricsForDate } from "../../utils/helpers";
import { fleetTrees } from "../../data/fleetData";

export default function ProvinceBreakdown({ selectedDate }) {
  const groups = {};

  fleetTrees.forEach((tree) => {
    if (!groups[tree.province]) {
      groups[tree.province] = {
        province: tree.province,
        trees: 0,
        today: 0,
        online: 0,
      };
    }

    const metrics = getTreeMetricsForDate(tree, selectedDate);

    groups[tree.province].trees += 1;
    groups[tree.province].today += metrics.todayCapture;
    groups[tree.province].online += tree.online ? 1 : 0;
  });

  const rows = Object.values(groups).map((row) => ({
    ...row,
    today: Number(row.today.toFixed(1)),
  }));

  return (
    <div className="rounded-2xl border border-borderSoft bg-panelBg shadow-sm">
      <div className="p-5 pb-3">
        <h3 className="text-base font-semibold text-greenInk">
          Province breakdown
        </h3>
      </div>

      <div className="space-y-3 p-5 pt-0">
        {rows.map((row) => (
          <div
            key={row.province}
            className="rounded-2xl border border-borderSoft bg-cardBg p-4 text-sm"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-greenInk">{row.province}</span>
              <span className="text-textSoft">{row.trees} trees</span>
            </div>

            <div className="mt-2 flex items-center justify-between text-textSoft">
              <span>Today</span>
              <span>{row.today} kg</span>
            </div>

            <div className="mt-1 flex items-center justify-between text-textSoft">
              <span>Online</span>
              <span>{row.online}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}