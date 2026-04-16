import GovernmentTopMetrics from "./GovernmentTopMetrics";
import ComplianceReport from "./ComplianceReport";
import GovernmentSummary from "./GovernmentSummary";
import GovernmentMap from "./GovernmentMap";
import GovernmentLocationList from "./GovernmentLocationList";

export default function GovernmentView(props) {
  return (
    <div className="space-y-6">
      <GovernmentTopMetrics {...props} />

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ComplianceReport {...props} />
        <GovernmentSummary />
      </section>

      <section className="rounded-2xl border border-borderSoft bg-panelBg shadow-sm">
        <div className="p-5 pb-3">
          <h3 className="text-base font-semibold text-greenInk">
            Geographic Distribution
          </h3>
        </div>

        <div className="p-5 pt-0">
          <GovernmentMap {...props} />

          <div className="mt-6">
            <button
              type="button"
              className="w-full rounded-2xl border border-primaryDark bg-primary py-4 font-semibold text-white shadow-sm"
            >
              GLOBAL CUMULATIVE VIEW
            </button>
          </div>

          <GovernmentLocationList {...props} />
        </div>
      </section>
    </div>
  );
}