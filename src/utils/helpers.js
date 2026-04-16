import { fleetTrees } from "../data/fleetData";

export function getTodayDateString() {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function formatTime(isoString) {
  return new Date(isoString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getDateSeed(dateString) {
  return dateString.split("-").reduce((sum, part) => sum + Number(part), 0);
}

export function isFutureDate(dateString) {
  return dateString > getTodayDateString();
}

export function isToday(dateString) {
  return dateString === getTodayDateString();
}

export function getTreeMetricsForDate(tree, dateString) {
  if (!tree.online || isFutureDate(dateString)) {
    return {
      todayCapture: 0,
      efficiency: 0,
      status: tree.online ? "Active" : "Offline",
    };
  }

  const seed = getDateSeed(dateString);
  const offset = ((seed + tree.id.charCodeAt(tree.id.length - 1)) % 5) - 2;

  const todayCapture = clamp(tree.capturedTodayKg + offset * 0.35, 0, 25);
  const efficiency = clamp(tree.efficiency + offset * 0.4, 72, 79);

  return {
    todayCapture: Number(todayCapture.toFixed(1)),
    efficiency: Number(efficiency.toFixed(1)),
    status: "Active",
  };
}

export function computeDerived(snapshot) {
  const inlet = snapshot.sensors.inlet.co2_kg;
  const outlet = snapshot.sensors.outlet.co2_kg;
  const reduction = Math.max(inlet - outlet, 0);
  const efficiency = inlet > 0 ? (reduction / inlet) * 100 : 0;

  return {
    reductionKg: Number(reduction.toFixed(2)),
    efficiencyPct: Number(efficiency.toFixed(1)),
    captureRateKgh: Number((reduction * 0.998).toFixed(2)),
  };
}

export function getSelectedTreeOperationalEfficiency(tree, dateString) {
  if (!tree?.online || isFutureDate(dateString)) return 0;
  return getTreeMetricsForDate(tree, dateString).efficiency;
}

export function generateDateBasedHistory(tree, dateString) {
  const isFuture = isFutureDate(dateString);
  const active = tree.online && !isFuture;
  const base = new Date(`${dateString}T00:00:00`);
  const seed = getDateSeed(dateString) + tree.id.charCodeAt(tree.id.length - 1);
  const operationalEfficiency = getSelectedTreeOperationalEfficiency(tree, dateString);

  return Array.from({ length: 24 }).map((_, index) => {
    const pointDate = new Date(base.getTime() + index * 60 * 60 * 1000);

    if (!active) {
      return {
        time: formatTime(pointDate.toISOString()),
        timestamp: pointDate.toISOString(),
        inlet: 0,
        outlet: 0,
        delta: 0,
        efficiency: 0,
        operationalEfficiency: 0,
        power: 0,
        capture: 0,
        airflow: 0,
        tempIn: 0,
        tempOut: 0,
        rhIn: 0,
        rhOut: 0,
        dataAgeLabel: isFuture ? "No Data" : "Historical Data",
      };
    }

    const period = index / 24;
    const inlet =
      8.15 +
      Math.sin(period * Math.PI * 2 + (seed % 5) * 0.25) * 0.42 +
      ((seed + index) % 3) * 0.05;

    const outlet =
      0.06 +
      Math.cos(period * Math.PI * 2 + (seed % 4) * 0.18) * 0.03 +
      (index % 4) * 0.006;

    const safeInlet = Number(clamp(inlet, 7.7, 8.95).toFixed(2));
    const safeOutlet = Number(clamp(outlet, 0.03, 0.22).toFixed(2));
    const delta = Number((safeInlet - safeOutlet).toFixed(2));
    const capture = Number((delta * 0.998).toFixed(2));
    const power = Number(
      clamp(169 + Math.sin(period * Math.PI * 2) * 4 + (seed % 3), 164, 178).toFixed(0)
    );
    const airflow = Number(
      clamp(427 + Math.cos(period * Math.PI * 2) * 8 + (seed % 4), 410, 446).toFixed(0)
    );
    const tempIn = Number(
      clamp(31 + Math.sin(period * Math.PI * 2) * 1.1, 29.5, 33.8).toFixed(1)
    );
    const tempOut = Number((tempIn - 0.7).toFixed(1));
    const rhIn = Number(clamp(54 + Math.cos(period * Math.PI * 2) * 2.2, 48, 60).toFixed(1));
    const rhOut = Number((rhIn - 2.0).toFixed(1));

    return {
      time: formatTime(pointDate.toISOString()),
      timestamp: pointDate.toISOString(),
      inlet: safeInlet,
      outlet: safeOutlet,
      delta,
      efficiency: Number(((delta / safeInlet) * 100).toFixed(1)),
      operationalEfficiency,
      power,
      capture,
      airflow,
      tempIn,
      tempOut,
      rhIn,
      rhOut,
      dataAgeLabel: isToday(dateString) ? "" : "Historical Data",
    };
  });
}

export function getProvinceBreakdownRows(dateString) {
  const groups = {};

  fleetTrees.forEach((tree) => {
    if (!groups[tree.province]) {
      groups[tree.province] = {
        province: tree.province,
        trees: 0,
        today: 0,
        online: 0,
      };
    }

    const metrics = getTreeMetricsForDate(tree, dateString);

    groups[tree.province].trees += 1;
    groups[tree.province].today += metrics.todayCapture;
    groups[tree.province].online += tree.online ? 1 : 0;
  });

  return Object.values(groups).map((row) => ({
    ...row,
    today: Number(row.today.toFixed(1)),
  }));
}