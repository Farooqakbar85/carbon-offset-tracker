import { useEffect, useMemo, useState } from "react";
import Header from "./components/layout/header.jsx";
import TechnicalView from "./components/Technical/TechnicalView";
import ManagementView from "./components/management/ManagementView";
import GovernmentView from "./components/government/GovernmentView";
import PublicView from "./components/public/PublicView";
import { fleetTrees } from "./data/fleetData";
import {
  getTodayDateString,
  getTreeMetricsForDate,
  computeDerived,
  formatTime,
  clamp,
  generateDateBasedHistory,
  getSelectedTreeOperationalEfficiency,
  getProvinceBreakdownRows,
  isFutureDate,
  isToday,
} from "./utils/helpers";

const SAMPLE_INTERVAL_MS = 180000;
const HISTORY_LIMIT = 24;

function generateNextSnapshot(prev, selectedTree) {
  const isActive = selectedTree?.online;
  if (!isActive) {
    return {
      ...prev,
      timestamp: new Date().toISOString(),
      status: { ...prev.status, last_update_age_sec: 0 },
    };
  }

  const inlet = clamp(prev.sensors.inlet.co2_kg + (Math.random() * 0.16 - 0.08), 7.8, 8.95);
  const outlet = clamp(prev.sensors.outlet.co2_kg + (Math.random() * 0.04 - 0.02), 0.03, 0.22);
  const airflow = clamp(prev.sensors.airflow_m3h + (Math.random() * 8 - 4), 410, 446);
  const power = clamp(prev.sensors.power_w + (Math.random() * 4 - 2), 164, 178);
  const tempIn = clamp(prev.sensors.inlet.temperature_c + (Math.random() * 0.6 - 0.3), 29.5, 33.8);
  const tempOut = clamp(tempIn - 0.7, 28.5, 33.0);
  const rhIn = clamp(prev.sensors.inlet.humidity_rh + (Math.random() * 1.2 - 0.6), 48, 60);
  const rhOut = clamp(rhIn - 2.0, 44, 58);

  return {
    timestamp: new Date().toISOString(),
    status: {
      system_health: "healthy",
      connectivity: "online",
      mode: "auto",
      last_update_age_sec: 0,
    },
    sensors: {
      inlet: {
        co2_kg: Number(inlet.toFixed(2)),
        temperature_c: Number(tempIn.toFixed(1)),
        humidity_rh: Number(rhIn.toFixed(1)),
      },
      outlet: {
        co2_kg: Number(outlet.toFixed(2)),
        temperature_c: Number(tempOut.toFixed(1)),
        humidity_rh: Number(rhOut.toFixed(1)),
      },
      airflow_m3h: Number(airflow.toFixed(0)),
      fan_rpm: 1460,
      fan_duty_pct: 67,
      pressure_drop_pa: 41.2,
      power_w: Number(power.toFixed(0)),
    },
  };
}

export default function App() {
  const [view, setView] = useState("technical");
  const [range, setRange] = useState("1H");
  const [selectedProvince, setSelectedProvince] = useState("All Pakistan");
  const [selectedTreeId, setSelectedTreeId] = useState("OXY-001");
  const [selectedDate, setSelectedDate] = useState(getTodayDateString());
  const [showPowerUsage, setShowPowerUsage] = useState(false);

  const selectedTree = useMemo(
    () => fleetTrees.find((tree) => tree.id === selectedTreeId) || fleetTrees[0],
    [selectedTreeId]
  );

  const isFutureSelected = useMemo(() => isFutureDate(selectedDate), [selectedDate]);
  const isTodaySelected = useMemo(() => isToday(selectedDate), [selectedDate]);

  const [snapshot, setSnapshot] = useState({
    timestamp: new Date().toISOString(),
    status: {
      system_health: "healthy",
      connectivity: "online",
      mode: "auto",
      last_update_age_sec: 0,
    },
    sensors: {
      inlet: { co2_kg: 8.42, temperature_c: 31.2, humidity_rh: 54.1 },
      outlet: { co2_kg: 0.11, temperature_c: 30.6, humidity_rh: 51.7 },
      airflow_m3h: 432,
      fan_rpm: 1460,
      fan_duty_pct: 67,
      pressure_drop_pa: 41.2,
      power_w: 171,
    },
  });

  const [history, setHistory] = useState(() =>
    generateDateBasedHistory(selectedTree, getTodayDateString())
  );

  useEffect(() => {
    const generated = generateDateBasedHistory(selectedTree, selectedDate);
    setHistory(generated);

    const lastPoint = generated[generated.length - 1];

    if (!selectedTree.online || isFutureSelected) {
      setSnapshot((prev) => ({
        ...prev,
        timestamp: new Date().toISOString(),
        status: {
          ...prev.status,
          last_update_age_sec: 0,
        },
        sensors: {
          ...prev.sensors,
          inlet: { co2_kg: 0, temperature_c: 0, humidity_rh: 0 },
          outlet: { co2_kg: 0, temperature_c: 0, humidity_rh: 0 },
          airflow_m3h: 0,
          power_w: 0,
        },
      }));
      return;
    }

    setSnapshot({
      timestamp: new Date().toISOString(),
      status: {
        system_health: "healthy",
        connectivity: "online",
        mode: "auto",
        last_update_age_sec: 0,
      },
      sensors: {
        inlet: {
          co2_kg: lastPoint.inlet,
          temperature_c: lastPoint.tempIn,
          humidity_rh: lastPoint.rhIn,
        },
        outlet: {
          co2_kg: lastPoint.outlet,
          temperature_c: lastPoint.tempOut,
          humidity_rh: lastPoint.rhOut,
        },
        airflow_m3h: lastPoint.airflow,
        fan_rpm: 1460,
        fan_duty_pct: 67,
        pressure_drop_pa: 41.2,
        power_w: lastPoint.power,
      },
    });
  }, [selectedDate, selectedTree, isFutureSelected]);

  useEffect(() => {
    if (!selectedTree.online || !isTodaySelected) return;

    const liveTimer = setInterval(() => {
      setSnapshot((prev) => {
        const next = generateNextSnapshot(prev, selectedTree);
        const nextDerived = computeDerived(next);

        setHistory((current) => {
          const updated = [
            ...current.slice(-(HISTORY_LIMIT - 1)),
            {
              time: formatTime(next.timestamp),
              timestamp: next.timestamp,
              inlet: next.sensors.inlet.co2_kg,
              outlet: next.sensors.outlet.co2_kg,
              delta: nextDerived.reductionKg,
              efficiency: nextDerived.efficiencyPct,
              operationalEfficiency: getSelectedTreeOperationalEfficiency(
                selectedTree,
                selectedDate
              ),
              power: next.sensors.power_w,
              capture: nextDerived.captureRateKgh,
              airflow: next.sensors.airflow_m3h,
              tempIn: next.sensors.inlet.temperature_c,
              tempOut: next.sensors.outlet.temperature_c,
              rhIn: next.sensors.inlet.humidity_rh,
              rhOut: next.sensors.outlet.humidity_rh,
              dataAgeLabel: "",
            },
          ];
          return updated;
        });

        return next;
      });
    }, SAMPLE_INTERVAL_MS);

    const ageTimer = setInterval(() => {
      setSnapshot((prev) => ({
        ...prev,
        status: {
          ...prev.status,
          last_update_age_sec: prev.status.last_update_age_sec + 1,
        },
      }));
    }, 1000);

    return () => {
      clearInterval(liveTimer);
      clearInterval(ageTimer);
    };
  }, [selectedTree, selectedDate, isTodaySelected]);

  const visibleTrees = useMemo(() => {
    if (selectedProvince === "All Pakistan") return fleetTrees;
    return fleetTrees.filter((tree) => tree.province === selectedProvince);
  }, [selectedProvince]);

  const fleetSummary = useMemo(() => {
  const totalTrees = fleetTrees.length;
  const onlineTrees = fleetTrees.filter((tree) => tree.online).length;

  const totalCapturedTodayKg = fleetTrees.reduce((sum, tree) => {
    return sum + getTreeMetricsForDate(tree, selectedDate).todayCapture;
  }, 0);

  const podsInSelectedProvince =
    selectedProvince === "All Pakistan"
      ? fleetTrees.length
      : fleetTrees.filter((tree) => tree.province === selectedProvince).length;

  return {
    totalTrees,
    onlineTrees,
    totalCapturedTodayKg: Number(totalCapturedTodayKg.toFixed(1)),
    totalMonthKg: Number((totalCapturedTodayKg * 24).toFixed(1)),
    totalLifetimeKg: 1170,
    avgEfficiency: 78.6,
    podsInSelectedProvince,
  };
}, [selectedDate, selectedProvince]);

  const derived = useMemo(() => computeDerived(snapshot), [snapshot]);

  const chartData = useMemo(() => {
    if (range === "15M") return history.slice(-5);
    if (range === "6H") return history.slice(-6);
    if (range === "24H") return history.slice(-24);
    return history.slice(-8);
  }, [history, range]);

  const provinceRows = useMemo(
    () => getProvinceBreakdownRows(selectedDate),
    [selectedDate]
  );

  const sharedProps = {
    view,
    setView,
    range,
    setRange,
    selectedProvince,
    setSelectedProvince,
    selectedTreeId,
    setSelectedTreeId,
    selectedDate,
    setSelectedDate,
    visibleTrees,
    selectedTree,
    snapshot,
    history,
    chartData,
    derived,
    fleetSummary,
    showPowerUsage,
    setShowPowerUsage,
    provinceRows,
    isFutureSelected,
    isTodaySelected,
  };

  return (
    <div className="min-h-screen bg-softBg text-slate-900">
      <Header {...sharedProps} />

      <main className="mx-auto max-w-7xl p-4 sm:p-6 md:p-8">
        {view === "technical" && <TechnicalView {...sharedProps} />}
        {view === "management" && <ManagementView {...sharedProps} />}
        {view === "government" && <GovernmentView {...sharedProps} />}
        {view === "public" && <PublicView {...sharedProps} />}
      </main>
    </div>
  );
}