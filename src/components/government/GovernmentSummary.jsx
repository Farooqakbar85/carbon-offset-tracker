export default function GovernmentSummary() {
  const notes = [
    "Verified installations align with current provincial environmental targets.",
    "Punjab network contributes the largest monitored share in the current reporting period.",
    "Oxygen generation and sequestration values are derived from the active fleet telemetry layer.",
    "Current dashboard status supports public-sector reporting and policy communication use.",
  ];

  return (
    <div className="rounded-2xl border border-borderSoft bg-panelBg shadow-sm">
      <div className="p-5 pb-3">
        <h3 className="text-base font-semibold text-greenInk">
          Government Summary Notes
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-4 p-5 pt-0 md:grid-cols-2">
        {notes.map((note, index) => (
          <div
            key={index}
            className="rounded-2xl border border-borderSoft bg-cardBg p-4 text-textSoft"
          >
            {note}
          </div>
        ))}
      </div>
    </div>
  );
}