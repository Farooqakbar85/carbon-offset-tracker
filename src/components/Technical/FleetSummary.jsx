export default function FleetSummary({ fleetSummary, selectedProvince }) {
  const rows = [
  ["Total trees", fleetSummary.totalTrees],
  ["Online", fleetSummary.onlineTrees],
  [
    selectedProvince === "All Pakistan"
      ? "Pods in Pakistan"
      : `Pods in ${selectedProvince}`,
    fleetSummary.podsInSelectedProvince,
  ],
  ["CO₂ captured today", `${fleetSummary.totalCapturedTodayKg} kg`],
  ["This month", `${fleetSummary.totalMonthKg} kg`],
  ["Lifetime", `${fleetSummary.totalLifetimeKg} kg`],
  ["Average efficiency", `${fleetSummary.avgEfficiency}%`],
];
  return (
    <div className="rounded-2xl border border-borderSoft bg-panelBg shadow-sm">
      <div className="p-5 pb-3">
        <h3 className="text-base font-semibold text-greenInk">
          Fleet cumulative summary
        </h3>
      </div>

      <div className="space-y-4 p-5 pt-0">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-2xl border border-borderSoft bg-cardBg px-4 py-3"
          >
            <span className="text-sm text-textSoft">{label}</span>
            <span className="text-lg font-semibold text-greenInk">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}