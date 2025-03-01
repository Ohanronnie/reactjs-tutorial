import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
export default function ShippingPerformanceChart() {
  const data = [
    { name: "Jan", best: 40, average: 30, poor: 30 },
    { name: "Feb", best: 35, average: 25, poor: 40 },
    { name: "Mar", best: 50, average: 30, poor: 20 },
    { name: "Apr", best: 45, average: 35, poor: 20 },
    { name: "May", best: 38, average: 32, poor: 30 },
    { name: "Jun", best: 42, average: 28, poor: 30 },
    { name: "Jul", best: 37, average: 33, poor: 30 },
    { name: "Aug", best: 40, average: 30, poor: 30 },
    { name: "Sep", best: 30, average: 25, poor: 45 },
  ];

  return (
    <BarChart width={500} height={400} data={data} layout="vertical" barCategoryGap={20}>
      <XAxis type="number" />
      <YAxis dataKey="name" type="category" />
      <Tooltip />
      <Legend />
      <Bar dataKey="best" stackId="a" fill="#4CAF50" name="Best" radius={[10, 10, 10, 10]} barSize={16} />
      <Bar dataKey="average" stackId="a" fill="#FFC107" name="Average" radius={[10, 10, 10, 10]} barSize={16} />
      <Bar dataKey="poor" stackId="a" fill="#F44336" name="Poor" radius={[10, 10, 10, 10]} barSize={16} />
    </BarChart>
  );
}
