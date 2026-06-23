import {
  isFutureDate,
  isToday,
  getSelectedTreeOperationalEfficiency,
} from "../../utils/helpers";

export default function KPIGrid({
  selectedTree,
  snapshot,
  derived,
  selectedDate,
}) {
  const future = isFutureDate(selectedDate);

  if (future) {
    return (
      <div className="rounded-2xl border bg-panelBg p-8 text-center">
        <p className="text-xl font-semibold text-greenInk">
          No telemetry data available yet for this date.
        </p>
      </div>
    );
  }

  if (!selectedTree.online) {
    return (
      <div className="rounded-2xl border bg-panelBg p-8 text-center">
        <p className="text-xl font-semibold text-greenInk">
          This site is currently not operational.
        </p>
        <p className="mt-2 text-textSoft">
          It will be operational in the near future.
        </p>
      </div>
    );
  }

  const operationalEfficiency = getSelectedTreeOperationalEfficiency(
    selectedTree,
    selectedDate
  );

  const dataAge = isToday(selectedDate)
    ? `${snapshot.status.last_update_age_sec} s`
    : "Historical Data";

  const cards = [
    ["CO₂ Inlet", snapshot.sensors.inlet.co2_kg, "g"],
    ["CO₂ Outlet", snapshot.sensors.outlet.co2_kg, "g"],
    ["CO₂ Reduction", derived.reductionKg, "g"],
    ["Operational Efficiency", operationalEfficiency, "%"],
    ["Airflow", snapshot.sensors.airflow_m3h, "m³/h"],
    ["CO₂ Capture", derived.captureRateKgh, "g/h"],
    ["Power", snapshot.sensors.power_w, "W"],
    ["Data Age", dataAge, ""],
  ];

  return (
    <section className="grid min-h-screen grid-cols-1 gap-8 py-10 md:grid-cols-2 xl:grid-cols-4">
      {cards.map(([title, value, unit]) => (
        <div
          key={title}
          className="flex min-h-[260px] items-center rounded-2xl border border-borderSoft bg-panelBg shadow-sm"
        >
          <div className="p-9">
            <p className="text-2xl text-textSoft">{title}</p>

            <div className="mt-7 flex items-end gap-3">
              <span className="text-7xl font-semibold text-greenInk">
                {value}
              </span>

              {unit && (
                <span className="pb-3 text-2xl text-textSoft">{unit}</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}