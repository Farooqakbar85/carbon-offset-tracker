import { getTreeMetricsForDate } from "../../utils/helpers";

export default function GovernmentLocationList({
  visibleTrees,
  selectedDate,
  selectedTree,
  setSelectedTreeId,
}) {
  return (
    <div className="mt-6 space-y-4">
      {visibleTrees.map((tree) => {
        const metrics = getTreeMetricsForDate(tree, selectedDate);

        const dotColor =
          tree.status === "healthy"
            ? "bg-emerald-500"
            : tree.status === "warning"
            ? "bg-amber-400"
            : "bg-slate-400";

        const isSelected = selectedTree.id === tree.id;

        return (
          <button
            key={tree.id}
            type="button"
            onClick={() => setSelectedTreeId(tree.id)}
            className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${
              isSelected
                ? "border-primary bg-primary/5"
                : "border-borderSoft bg-cardBg"
            }`}
          >
            <div>
              <div className="font-medium text-greenInk">
                {tree.city} ({tree.id})
              </div>
              <div className="mt-1 text-sm text-textSoft">
                {tree.installedAt}
              </div>
              <div className="mt-1 text-xs text-textSoft">
                Today: {metrics.todayCapture} kg
              </div>
            </div>

            <span className={`h-3 w-3 rounded-full ${dotColor}`}></span>
          </button>
        );
      })}
    </div>
  );
}