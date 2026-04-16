import { fleetTrees } from "../../data/fleetData";

export default function AlertsPanel() {
  const offline = fleetTrees.filter((tree) => !tree.online);

  const alerts = [
    "All primary trees operating within target range.",
    `Offline trees: ${offline.length} site(s) currently offline.`,
    "Fleet efficiency remains within the configured operating band.",
  ];

  return (
    <div className="rounded-2xl border border-borderSoft bg-panelBg shadow-sm">
      <div className="p-5 pb-3">
        <h3 className="text-base font-semibold text-greenInk">
          Technical alerts
        </h3>
      </div>

      <div className="space-y-3 p-5 pt-0">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className="rounded-2xl border border-borderSoft bg-cardBg p-4 text-slate-700"
          >
            {alert}
          </div>
        ))}
      </div>
    </div>
  );
}