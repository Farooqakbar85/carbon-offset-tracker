export default function TreeEquivalentCard({ fleetSummary }) {
  const podsActive = fleetSummary.onlineTrees;
  const matureTreesEquivalent = podsActive * 7;
  const indoorTreesEquivalent = podsActive * 21;
  const treeEquivalentImpact = matureTreesEquivalent + indoorTreesEquivalent;

  return (
    <div className="rounded-3xl border border-borderSoft bg-panelBg p-8 text-center shadow-sm">
      <p className="text-sm uppercase tracking-wide text-textSoft">
        Tree Equivalent
      </p>

      <div className="mt-8 text-5xl font-bold text-primary sm:text-6xl md:text-7xl">
        {treeEquivalentImpact}
      </div>

      <p className="mt-4 text-sm text-textSoft">Tree-equivalent impact</p>

      <div className="mt-8 space-y-2 text-sm text-textSoft">
        <p>Pods active: {podsActive}</p>
        <p>{podsActive} pods = {matureTreesEquivalent} mature trees</p>
        <p>{podsActive} pods = {indoorTreesEquivalent} indoor trees</p>
      </div>

      <div className="mx-auto mt-8 grid max-w-[180px] grid-cols-4 gap-2">
        {Array.from({ length: 12 }).map((_, index) => (
          <span
            key={index}
            className="h-3 w-3 rounded-full bg-primary/20"
          ></span>
        ))}
      </div>
    </div>
  );
}