import { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import PieChart from "../../components/PieChart";
import axios from "axios";

const Pie = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [userTypes, setUserTypes] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:7278/api/Dashboard/usertypes")
      .then((res) => setUserTypes(res.data))
      .catch((err) => console.error("Error al obtener datos de tipos de usuario", err));
  }, []);

  return (
    <Box m="20px">
      <Typography variant="h3" color={colors.grey[100]} fontWeight="bold" mb="20px">
        Gráfico Pastel de Tipos de Usuario
      </Typography>

      <Box height="400px">
        <PieChart data={userTypes || []} />
      </Box>
    </Box>
  );
};

export default Pie;
