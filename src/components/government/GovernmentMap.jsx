import { getTreeMetricsForDate } from "../../utils/helpers";

export default function GovernmentMap({
  visibleTrees,
  selectedTree,
  selectedDate,
  setSelectedTreeId,
}) {
  return (
    <div className="relative h-[420px] overflow-hidden rounded-2xl border border-borderSoft">
      {/* Same zoom as Technical Map */}
      <iframe
        title="Government Pakistan Map"
        className="h-full w-full border-0"
        src="https://www.google.com/maps?q=Lahore,Faisalabad&z=7&output=embed"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Tree markers */}
      <div className="pointer-events-none absolute inset-0 z-20">
        {visibleTrees.map((tree) => {
          const markerColor = tree.online ? "bg-emerald-500" : "bg-slate-400";
          const ringColor = tree.online ? "ring-emerald-200" : "ring-slate-200";
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
                    {tree.city}
                  </div>
                  <div>{metrics.todayCapture} kg</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}