import { useEffect, useState } from "react";
import logo from "../../assets/logo.jpg";
import { provinceOptions } from "../../data/fleetData";

export default function Header({
  view,
  setView,
  selectedProvince,
  setSelectedProvince,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const tabs = [
    { key: "technical", label: "Technical" },
    { key: "management", label: "Management" },
    { key: "government", label: "Government" },
    { key: "public", label: "Public" },
  ];

  useEffect(() => {
    setMobileOpen(false);
  }, [view]);

  return (
    <header className="w-full bg-primary text-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-4 md:hidden">
          <div className="flex min-w-0 items-center gap-3">
            <img src={logo} alt="Oxygenix Logo" className="h-10 shrink-0" />
            <div className="min-w-0">
              <div className="truncate text-base font-bold leading-tight">
                OXYGENIX <span className="text-white/90">FLEET</span>
              </div>
              <div className="truncate text-[10px] tracking-[0.2em] text-white/80">
                ENGINEERING FOR LIFE
              </div>
            </div>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 p-2 text-white"
          >
            {!mobileOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>

        <div className="mt-4 text-center md:hidden">
          <h1 className="text-lg font-semibold">Punjab Carbon Offset Tracker</h1>
          <p className="text-xs text-white/80">Real-Time Climate Action</p>
        </div>

        <div className="hidden md:flex md:items-center md:justify-between md:gap-6">
          <div className="flex min-w-0 items-center gap-3">
            <img src={logo} alt="Oxygenix Logo" className="h-10 shrink-0" />
            <div className="min-w-0">
              <div className="truncate text-lg font-bold">
                OXYGENIX <span className="text-white/90">FLEET</span>
              </div>
              <div className="truncate text-xs tracking-widest text-white/80">
                ENGINEERING FOR LIFE
              </div>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-lg font-semibold md:text-xl">
              Punjab Carbon Offset Tracker
            </h1>
            <p className="text-xs text-white/80">Real-Time Climate Action</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 rounded-full bg-white/20 px-2 py-1 backdrop-blur-md">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setView(tab.key)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  view === tab.key ? "bg-white text-primary" : "text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}

            {view !== "public" && (
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="rounded-full border border-white/30 bg-transparent px-4 py-2 text-sm text-white outline-none"
              >
                {provinceOptions.map((province) => (
                  <option
                    key={province}
                    value={province}
                    className="text-slate-900"
                  >
                    {province}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {mobileOpen && (
          <div className="mt-4 rounded-3xl border border-white/20 bg-white/10 p-3 backdrop-blur-md md:hidden">
            <div className="grid grid-cols-1 gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setView(tab.key)}
                  className={`w-full rounded-2xl px-4 py-3 text-sm font-medium ${
                    view === tab.key
                      ? "bg-white text-primary"
                      : "border border-white/10 text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}

              {view !== "public" && (
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/30 bg-transparent px-4 py-3 text-sm text-white outline-none"
                >
                  {provinceOptions.map((province) => (
                    <option
                      key={province}
                      value={province}
                      className="text-slate-900"
                    >
                      {province}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}