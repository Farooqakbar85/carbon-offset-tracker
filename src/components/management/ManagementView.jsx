import EfficiencyTrendChart from "./EfficiencyTrendChart";
import RegionalOffsetChart from "./RegionalOffsetChart";
import FleetHealthChart from "./FleetHealthChart";
import ManagementImpactChart from "./ManagementImpactChart";
import ManagementInsights from "./ManagementInsights";

export default function ManagementView(props) {
  return (
    <div className="space-y-6">
      {/* Top cards */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <EfficiencyTrendChart {...props} />
        <RegionalOffsetChart {...props} />
        <FleetHealthChart {...props} />
      </section>

      {/* Bottom sections kept as before */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ManagementImpactChart {...props} />
        </div>

        <ManagementInsights {...props} />
      </section>
    </div>
  );
}