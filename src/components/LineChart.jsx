import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

/**
 * Props:
 * - data: Array de objetos (tu dataset sin formatear)
 * - xKey: campo a usar como eje X
 * - yKey: campo a usar como eje Y
 * - isCustomLineColors: opcional, si quieres forzar color
 * - isDashboard: opcional, si estás en modo dashboard
 */
const LineChart = ({
  data = [],
  xKey = "x",
  yKey = "y",
  isCustomLineColors = false,
  isDashboard = false,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const formattedData = [
    {
      id: "Pagos",
      color: tokens("dark").greenAccent[500],
      data: data.map((item) => ({
        x: item[xKey],
        y: item[yKey],
      })),
    },
  ];

  const formatoSoles = new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
  });

  return (
    <ResponsiveLine
      data={formattedData}
      theme={{
        axis: {
          domain: { line: { stroke: colors.grey[100] } },
          legend: { text: { fill: colors.grey[100] } },
          ticks: {
            line: { stroke: colors.grey[100], strokeWidth: 1 },
            text: { fill: colors.grey[100] },
          },
        },
        legends: {
          text: { fill: colors.grey[100] },
        },
        tooltip: {
          container: {
            background: "#2d2d2d",
            color: "#fff",
            padding: "6px 12px",
            borderRadius: "4px",
            fontSize: "14px",
          },
        },
      }}
      tooltip={({ point }) => (
        <div
          style={{
            background: "#2d2d2d",
            color: "#fff",
            padding: "6px 12px",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        >
          <strong>{formatoSoles.format(point.data.y)}</strong>
          <br />
          Fecha: {point.data.x}
        </div>
      )}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : xKey,
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : yKey,
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={true}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          translateX: 100,
          translateY: 0,
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
