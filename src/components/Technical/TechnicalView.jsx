import DeploymentMap from "./DeploymentMap";
import FleetSummary from "./FleetSummary";
import DetailPanel from "./DetailPanel";
import KPIGrid from "./KPIGrid";
import CO2Chart from "./CO2Chart";
import AlertsPanel from "./AlertsPanel";
import ProvinceBreakdown from "./ProvinceBreakdown";
import PowerChart from "./PowerChart";

export default function TechnicalView(props) {
  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <DeploymentMap {...props} />
        </div>
        <FleetSummary {...props} />
      </section>

      <DetailPanel {...props} />

      <KPIGrid {...props} />

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-4">
        <div className="xl:col-span-3">
          <CO2Chart {...props} />
        </div>
        <AlertsPanel {...props} />
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ProvinceBreakdown {...props} />
        <div className="lg:col-span-2">
          <PowerChart {...props} />
        </div>
      </section>
    </div>
  );
}