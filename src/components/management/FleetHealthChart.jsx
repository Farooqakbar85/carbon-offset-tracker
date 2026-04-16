import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { fleetTrees } from "../../data/fleetData";

export default function FleetHealthChart() {

  const healthy = fleetTrees.filter(tree => tree.online).length;
  const offline = fleetTrees.filter(tree => !tree.online).length;

  const data = [
    { name: "Healthy", value: healthy },
    { name: "Offline", value: offline }
  ];

  const COLORS = [
    "#1fa37c", // green healthy
    "#ef4444"  // red offline
  ];

  return (
    <div className="rounded-2xl border border-borderSoft bg-panelBg shadow-sm">
      <div className="p-5 pb-3">
        <h3 className="text-base font-semibold text-greenInk">
          Fleet Health Index
        </h3>
      </div>

      <div className="p-5 pt-0 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Pie
              data={data}
              innerRadius={80}
              outerRadius={110}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
            />

          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}