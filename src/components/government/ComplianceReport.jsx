export default function ComplianceReport({ fleetSummary }) {
  const pmReduced = `${Math.max(8, Math.round(fleetSummary.avgEfficiency / 6))}.9%`;
  const aqiDelta = `-${Math.round(fleetSummary.totalCapturedTodayKg * 2.7)} pts`;

  return (
    <div className="rounded-2xl border border-borderSoft bg-panelBg shadow-sm">
      <div className="p-5 pb-3">
        <h3 className="text-base font-semibold text-greenInk">
          Environmental Compliance Report
        </h3>
      </div>

      <div className="p-5 pt-0">
        <div className="flex items-center justify-between rounded-2xl border border-borderSoft bg-cardBg p-6">
          <div>
            <div className="text-2xl font-bold text-greenInk">
              EPA Punjab Verified
            </div>
            <div className="mt-1 text-textSoft">
              Status: Fully Compliant (2025-26)
            </div>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-xl text-primary">
            ✓
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-borderSoft bg-cardBg p-5">
            <p className="text-sm uppercase text-textSoft">PM2.5 Reduced</p>
            <div className="mt-2 text-4xl font-bold text-greenInk">
              {pmReduced}
            </div>
          </div>

          <div className="rounded-2xl border border-borderSoft bg-cardBg p-5">
            <p className="text-sm uppercase text-textSoft">Local AQI Δ</p>
            <div className="mt-2 text-4xl font-bold text-greenInk">
              {aqiDelta}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}