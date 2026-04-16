import { fleetTrees } from "../../data/fleetData";
import { getTreeMetricsForDate } from "../../utils/helpers";

export default function ManagementInsights({ selectedDate }) {
  const provinceGroups = {};

  fleetTrees.forEach((tree) => {
    if (!provinceGroups[tree.province]) {
      provinceGroups[tree.province] = {
        province: tree.province,
        today: 0,
      };
    }

    const metrics = getTreeMetricsForDate(tree, selectedDate);
    provinceGroups[tree.province].today += metrics.todayCapture;
  });

  const provinceRows = Object.values(provinceGroups).map((row) => ({
    ...row,
    today: Number(row.today.toFixed(1)),
  }));

  const weakestProvince = [...provinceRows].sort((a, b) => a.today - b.today)[0];

  const topTree = [...fleetTrees]
    .map((tree) => ({
      tree,
      metrics: getTreeMetricsForDate(tree, selectedDate),
    }))
    .sort((a, b) => b.metrics.todayCapture - a.metrics.todayCapture)[0];

  return (
    <div className="space-y-4">
      <InsightCard
        title="Underperforming Region Identified"
        text={`${weakestProvince.province} is currently the weakest region. Recommended action: expand fleet coverage and optimize operating hours.`}
      />

      <InsightCard
        title="Top Site Performance"
        text={`${topTree.tree.installedAt} (${topTree.tree.city}) is leading current performance and can be used as the benchmark operating model.`}
      />

      <InsightCard
        title="Upcoming Regulatory Changes"
        text="Prepare monthly reporting around sequestration, AQI improvement, and site uptime for upcoming compliance reviews."
      />
    </div>
  );
}

function InsightCard({ title, text }) {
  return (
    <div className="rounded-2xl border border-borderSoft bg-cardBg p-4">
      <p className="font-semibold text-greenInk">{title}</p>
      <p className="mt-2 text-textSoft">{text}</p>
    </div>
  );
}