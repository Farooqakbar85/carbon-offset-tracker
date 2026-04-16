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
        <p className="text-textSoft mt-2">
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
    ["CO₂ Inlet", snapshot.sensors.inlet.co2_kg, "kg"],
    ["CO₂ Outlet", snapshot.sensors.outlet.co2_kg, "kg"],
    ["CO₂ Reduction", derived.reductionKg, "kg"],
    ["Operational Efficiency", operationalEfficiency, "%"],
    ["Airflow", snapshot.sensors.airflow_m3h, "m³/h"],
    ["CO₂ Capture", derived.captureRateKgh, "kg/h"],
    ["Power", snapshot.sensors.power_w, "W"],
    ["Data Age", dataAge, ""],
  ];

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-8">
      {cards.map(([title, value, unit]) => (
        <div
          key={title}
          className="rounded-2xl border border-borderSoft bg-panelBg shadow-sm"
        >
          <div className="p-5">
            <p className="text-sm text-textSoft">{title}</p>

            <div className="mt-2 flex items-end gap-2">
              <span className="text-3xl font-semibold text-greenInk">
                {value}
              </span>
              <span className="text-sm text-textSoft">{unit}</span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}