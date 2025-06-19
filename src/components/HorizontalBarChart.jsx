import { ResponsiveBar } from "@nivo/bar";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const HorizontalBarChart = ({
  data = [],
  xKey = "total",
  yKey = "proveedor",
  isDashboard = false,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveBar
      data={data}
      keys={[xKey]}
      indexBy={yKey}
      layout="horizontal"
      margin={{ top: 20, right: 40, bottom: 50, left: 180 }} // ⬅️ espacio para nombres largos
      padding={0.3}
      colors={{ scheme: "nivo" }}
      theme={{
        axis: {
          ticks: { text: { fill: colors.grey[100] } },
          legend: { text: { fill: colors.grey[100] } },
        },
        legends: { text: { fill: colors.grey[100] } },
        tooltip: {
          container: {
            background: colors.primary[400],
            color: "#fff",
            fontSize: 14,
            borderRadius: "4px",
            padding: "6px 10px",
          },
        },
      }}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisLeft={{
        legend: isDashboard ? undefined : yKey,
        legendPosition: "middle",
        legendOffset: -70,
        tickPadding: 8,
      }}
      axisBottom={{
        legend: isDashboard ? undefined : xKey,
        legendPosition: "middle",
        legendOffset: 40,
        tickPadding: 5,
      }}
      labelSkipWidth={0}
      labelSkipHeight={0}
      labelTextColor="#000" // texto dentro de barra en negro
      tooltip={({ id, value, indexValue }) => (
        <strong>
          {indexValue}: S/. {Number(value).toFixed(2)}
        </strong>
      )}
      animate={true}
    />
  );
};

export default HorizontalBarChart;
