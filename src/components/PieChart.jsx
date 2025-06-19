// src/components/PieChart.jsx
import { ResponsivePie } from "@nivo/pie";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const PieChart = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Color que se adapta automáticamente al modo claro/oscuro
  const labelColor = theme.palette.mode === "light" ? "#111111" : "#e0e0e0";
  const tooltipBg = theme.palette.mode === "light" ? "#ffffff" : colors.primary[500];

  // Transformación (por si quieres colores personalizados)
  const chartData = data.map((item) => ({
    id: item.tipoUsuario,
    label: item.tipoUsuario,
    value: item.cantidad,
  }));

  return (
    <ResponsivePie
      data={chartData}
      theme={{
        axis: {
          ticks: {
            text: {
              fill: labelColor,
            },
          },
        },
        legends: {
          text: {
            fill: labelColor,
          },
        },
        tooltip: {
          container: {
            background: tooltipBg,
            color: labelColor,
          },
        },
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={labelColor}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateY: 56,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: labelColor,
          symbolSize: 18,
          symbolShape: "circle",
        },
      ]}
    />
  );
};

export default PieChart;
