import { getTreeMetricsForDate } from "../../utils/helpers";

export default function DetailPanel({
  selectedTree,
  selectedDate,
  setSelectedDate,
}) {
  const metrics = getTreeMetricsForDate(selectedTree, selectedDate);

  return (
    <section className="rounded-2xl border border-borderSoft bg-panelBg shadow-sm">
      <div className="flex flex-col gap-3 p-5 pb-3 md:flex-row md:items-center md:justify-between">
        <h3 className="text-base font-semibold text-greenInk">
          {selectedTree.city} · {selectedTree.id} detail
        </h3>

        <div className="flex items-center gap-3">
          <label htmlFor="datePicker" className="text-sm text-textSoft">
            Select date
          </label>
          <input
            id="datePicker"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="rounded-xl border border-borderSoft bg-cardBg px-3 py-2 text-sm text-greenInk outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 p-5 pt-0 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard label="Site" value={selectedTree.installedAt} />
        <InfoCard label="Province" value={selectedTree.province} />
        <InfoCard label="Today capture" value={`${metrics.todayCapture} kg`} />
        <InfoCard label="Status" value={selectedTree.online ? "Active" : "Offline"} />
      </div>
    </section>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-borderSoft bg-cardBg p-4">
      <div className="text-sm text-textSoft">{label}</div>
      <div className="mt-1 text-lg font-semibold text-greenInk">{value}</div>
    </div>
  );
}