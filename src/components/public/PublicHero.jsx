export default function PublicHero({ fleetSummary }) {
  const peopleImpact = Math.round(fleetSummary.totalCapturedTodayKg * 4.2);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-primary p-6 text-white shadow-sm sm:p-8 lg:p-10">
      <div className="absolute bottom-[-70px] right-[-60px] h-[320px] w-[320px] rounded-full border-[28px] border-white/10"></div>
      <div className="absolute bottom-[-20px] right-[110px] h-[180px] w-[180px] rounded-full border-[24px] border-white/10"></div>

      <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
        The Breath of Pakistan
      </h2>

      <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
        Every minute, our network cleans air equal to the work of mature and indoor trees for healthier communities across Pakistan.
      </p>

      <div className="mt-12 sm:mt-14">
        <p className="text-sm uppercase tracking-[0.2em] text-white/70">
          Impact for People
        </p>

        <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:gap-4">
          <span className="text-5xl font-bold leading-none sm:text-6xl lg:text-7xl">
            {peopleImpact}
          </span>
          <span className="text-xl font-semibold sm:text-2xl md:text-3xl">
            People Breathe Cleanly
          </span>
        </div>
      </div>
    </div>
  );
}