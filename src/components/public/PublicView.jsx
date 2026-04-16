import PublicMetrics from "./PublicMetrics";
import PublicHero from "./PublicHero";
import TreeEquivalentCard from "./TreeEquivalentCard";

export default function PublicView(props) {
  return (
    <div className="space-y-6">
      <PublicMetrics {...props} />

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <PublicHero {...props} />
        </div>

        <TreeEquivalentCard {...props} />
      </section>
    </div>
  );
}