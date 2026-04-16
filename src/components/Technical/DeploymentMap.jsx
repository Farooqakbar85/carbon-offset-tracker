import { getTreeMetricsForDate } from "../../utils/helpers";

export default function DeploymentMap({
  selectedProvince,
  selectedTree,
  snapshot,
  visibleTrees,
  setSelectedTreeId,
  selectedDate,
}) {
  return (
    <div className="rounded-2xl border border-borderSoft bg-panelBg shadow-sm">
      <div className="flex items-center justify-between p-5 pb-3">
        <div>
          <h3 className="text-base font-semibold text-greenInk">
            Pakistan deployment map · click a tree
          </h3>

          <p className="mt-1 text-sm text-textSoft">
            <span>Filter: {selectedProvince}</span>
            <span className="mx-2">•</span>

            <span>
              Last update: {new Date(snapshot.timestamp).toLocaleTimeString()}
            </span>

            <span className="mx-2">•</span>

            <span>Selected tree: {selectedTree.id}</span>
          </p>
        </div>
      </div>

      <div className="p-5 pt-0">
        <div className="relative h-[420px] overflow-hidden rounded-2xl border border-borderSoft bg-gradient-to-br from-sky-50 via-white to-emerald-50">

          {/* Map */}
          <iframe
            title="Pakistan Map"
            className="h-full w-full rounded-2xl border-0"
            src="https://www.google.com/maps?q=Lahore,Faisalabad&z=7&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Tree markers */}
          <div className="pointer-events-none absolute inset-0 z-20">
            {visibleTrees.map((tree) => {
              const markerColor = tree.online
                ? "bg-emerald-500"
                : "bg-slate-400";

              const ringColor = tree.online
                ? "ring-emerald-200"
                : "ring-slate-200";

              const isSelected = selectedTree.id === tree.id;

              const metrics = getTreeMetricsForDate(tree, selectedDate);

              return (
                <button
                  key={tree.id}
                  type="button"
                  onClick={() => setSelectedTreeId(tree.id)}
                  title={`${tree.id} · ${tree.city}`}
                  className="pointer-events-auto absolute group"
                  style={{
                    left: `${tree.x}%`,
                    top: `${tree.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="relative flex flex-col items-center">

                    {/* Dot */}
                    <div
                      className={`h-4 w-4 rounded-full ring-4 transition-transform ${
                        isSelected ? "scale-125 shadow-lg" : "shadow"
                      } ${markerColor} ${ringColor}`}
                    />

                    {/* Hover Tooltip */}
                    <div className="pointer-events-none absolute top-6 hidden group-hover:block whitespace-nowrap rounded-xl border border-borderSoft bg-white/95 px-3 py-1 text-xs text-slate-900 shadow">
                      <div className="font-semibold text-greenInk">
                        {tree.id}
                      </div>

                      <div>{tree.city}</div>

                      <div>{metrics.todayCapture} kg</div>
                    </div>

                  </div>
                </button>
              );
            })}
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 z-30 rounded-2xl border border-borderSoft bg-white/95 p-4 text-slate-900 shadow-sm">
            <div className="text-sm font-medium">Map Legend</div>

            <div className="mt-2 space-y-2 text-xs">

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
                Active
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-slate-400"></span>
                Offline
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}