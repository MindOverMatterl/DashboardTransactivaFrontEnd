import { Box } from "@mui/material";
import Header from "../../components/Header";
import UsuariosPorDiaChart from "../../components/BarChart";

const Bar = () => {
  return (
    <Box m="20px">
      <Header title="Usuarios por Día" subtitle="Cantidad de usuarios registrados cada día" />
      <Box
        height="50vh"
        width="80%"         // ⬅️ menor que 100%
        mx="auto"           // ⬅️ centrado horizontalmente
        display="flex"
        alignItems="center" // ⬅️ centrado vertical dentro del contenedor
        justifyContent="center"
      >
        <UsuariosPorDiaChart />
      </Box>
    </Box>
  );
};

export default Bar;