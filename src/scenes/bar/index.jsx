import { Box } from "@mui/material";
import Header from "../../components/Header";
import UsuariosPorDiaChart from "../../components/BarChart";

const Bar = () => {
  return (
    <Box m="20px">
      <Header title="Usuarios por Día" subtitle="Cantidad de usuarios registrados cada día" />
      <Box height="75vh">
        <UsuariosPorDiaChart />
      </Box>
    </Box>
  );
};

export default Bar;