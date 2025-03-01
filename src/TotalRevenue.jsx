
/*
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
*/
const data = [
  { name: "Jan", uv: 3050000, pv: 3020000, amt: 3100000 },
  { name: "Feb", uv: 3120000, pv: 3095000, amt: 3152000 },
  { name: "Mar", uv: 3085000, pv: 3060000, amt: 3123000 },
  { name: "Apr", uv: 3150000, pv: 3122000, amt: 3180000 },
  { name: "May", uv: 3102000, pv: 3085000, amt: 3145000 },
  { name: "Jun", uv: 3180000, pv: 3160000, amt: 3215000 },
  { name: "Jul", uv: 3175000, pv: 3158000, amt: 3207000 },
  { name: "Aug", uv: 3200000, pv: 3182000, amt: 3235000 },
  { name: "Sep", uv: 3188000, pv: 3170000, amt: 3220000 },
  { name: "Oct", uv: 3250000, pv: 3230000, amt: 3285000 },
  { name: "Nov", uv: 3225000, pv: 3212000, amt: 3260000 },
  { name: "Dec", uv: 3300000, pv: 3280000, amt: 3335000 },
  { name: "Jan", uv: 3280000, pv: 3265000, amt: 3312000 },
  { name: "Feb", uv: 3350000, pv: 3325000, amt: 3385000 },
  { name: "Mar", uv: 3320000, pv: 3300000, amt: 3360000 },
  { name: "Apr", uv: 3400000, pv: 3380000, amt: 3445000 },
  { name: "May", uv: 3385000, pv: 3365000, amt: 3420000 },
  { name: "Jun", uv: 3450000, pv: 3435000, amt: 3485000 }
];


// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #cccccc',
        borderRadius: '8px',
        padding: '8px',
        boxShadow: '0px 4px 12px rgba(8, 8, 8, 0.1)',
        fontFamily: 'Arial, sans-serif',
      }}>
        <div style={{ marginTop: '8px' }}>
          {[payload[0]].map((entry, index) => (
            <p key={index} style={{ margin: 0, color: entry.color }}>
              <strong>{entry.value.toLocaleString()}</strong>
            </p>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
// Shift the data up and down
const shiftData = (data, key, offset) => {
  return data.map((item) => ({
    ...item,
    [key]: item[key] + offset, // Add or subtract the offset
  }));
};

const shiftedDataUp = shiftData(data, 'pv', 100000); // Shift pv values up by 100,000
const shiftedDataDown = shiftData(data, 'pv', -100000); // Shift pv values down by 100,000

const DoubleLineChart = () => {
  return (
    <LineChart
      width={800}
      height={400}
      data={data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <Tooltip content={<CustomTooltip />} />
      {/* Original Line */}
      <Line
        type="monotone"
        data={shiftedDataUp}
        dataKey="pv"
        stroke="#82ca9d"
        name="Data"
        dot={false}
      />
      {/* Shifted Line (Down) */}
      <Line
        type="monotone"
        data={shiftedDataDown}
        dataKey="pv"
        stroke="#ff7300"
        name="Data"
        dot={false}
      />
    </LineChart>
  );
};

export default DoubleLineChart