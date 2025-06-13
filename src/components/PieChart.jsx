// src/components/PieChart.jsx
import { ResponsivePie } from "@nivo/pie";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const PieChart = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Transformación (opcional, por si quieres colores personalizados)
  const chartData = data.map((item, index) => ({
    id: item.tipoUsuario,
    label: item.tipoUsuario,
    value: item.cantidad,
    color: ["#f47560", "#e8c1a0", "#97e3d5", "#61cdbb"][index % 4], // puedes extender colores
  }));

  return (
    <ResponsivePie
      data={chartData}
      theme={{
        axis: {
          ticks: {
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            background: colors.primary[500],
            color: colors.grey[100],
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
      arcLinkLabelsTextColor={colors.grey[100]}
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
          itemTextColor: colors.grey[100],
          symbolSize: 18,
          symbolShape: "circle",
        },
      ]}
    />
  );
};

export default PieChart;
