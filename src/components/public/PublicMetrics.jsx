export default function PublicMetrics({ fleetSummary }) {
  const totalOxygenLiters = Math.round(fleetSummary.totalCapturedTodayKg * 32.6);

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        title="Fleet Sequestration"
        value={`${fleetSummary.totalCapturedTodayKg} kg`}
        subtitle="Total cumulative"
      />

      <EfficiencyCard value={fleetSummary.avgEfficiency} />

      <MetricCard
        title="Network Status"
        value={`${fleetSummary.onlineTrees}/${fleetSummary.totalTrees}`}
        subtitle="Nodes operational"
      />

      <MetricCard
        title="Total Oxygen"
        value={`${totalOxygenLiters} L`}
        subtitle="O₂ released"
      />
    </section>
  );
}

function MetricCard({ title, value, subtitle }) {
  return (
    <div className="rounded-2xl border border-borderSoft bg-panelBg p-6 shadow-sm">
      <p className="text-sm uppercase tracking-wide text-textSoft">{title}</p>
      <div className="mt-3 text-4xl font-bold text-greenInk">{value}</div>
      <p className="mt-2 text-xs text-textSoft">{subtitle}</p>
    </div>
  );
}

function EfficiencyCard({ value }) {
  return (
    <div className="rounded-2xl border border-borderSoft bg-panelBg p-6 shadow-sm">
      <p className="text-sm uppercase tracking-wide text-textSoft">
        Average Efficiency
      </p>

      <div className="mt-3 text-4xl font-bold text-greenInk">{value}%</div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-cardBg">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}