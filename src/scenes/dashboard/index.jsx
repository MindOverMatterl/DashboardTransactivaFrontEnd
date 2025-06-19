import { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import HorizontalBarChart from "../../components/HorizontalBarChart";
import ScatterPlotChart from "../../components/ScatterPlotChart";
import axios from "axios";
import { endpoints } from "../../services/api"; // ✅ import rutas correctas
import dayjs from "dayjs";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [pagos, setPagos] = useState([]);
  const [userTypes, setUserTypes] = useState([]);
  const [monthlyPayments, setMonthlyPayments] = useState([]);
  const [pagosPorDia, setPagosPorDia] = useState([]);
  const [pagosPorProveedor, setPagosPorProveedor] = useState([]);
  const [tiempoEntrega, setTiempoEntrega] = useState([]);
  useEffect(() => {
    axios.get(endpoints.pagos).then((res) => setPagos(res.data));
    axios.get(endpoints.dashboard.userTypes).then((res) => setUserTypes(res.data));
    axios.get(endpoints.dashboard.monthlyPayments).then((res) => setMonthlyPayments(res.data));
    axios.get(endpoints.dashboard.pagosPorDia).then((res) => { setPagosPorDia(res.data); });
    axios.get(endpoints.dashboard.pagosPorProveedor).then((res) => setPagosPorProveedor(res.data));
    axios.get(endpoints.dashboard.tiempoEntrega).then((res) => setTiempoEntrega(res.data))
  }, []);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Panel de administración de TransActiva" />
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          <DownloadOutlinedIcon sx={{ mr: "10px" }} />
          Exportar Reportes
        </Button>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* Estadísticas generales */}
        <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title={pagos.length}
            subtitle="Pagos Registrados"
            progress="0.80"
            increase="+18%"
            icon={<PointOfSaleIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>

        <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title={userTypes.length}
            subtitle="Tipos de Usuario"
            progress="0.5"
            increase="+10%"
            icon={<PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>

        {/* Línea de pagos por día */}
        <Box gridColumn="span 8" gridRow="span 2" backgroundColor={colors.primary[400]}>
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                Pagos por Día
              </Typography>
              <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
                Total S/.{pagosPorDia.length > 0
                  ? pagosPorDia.reduce((acc, p) => acc + (p.totalPagado ?? 0), 0).toFixed(2)
                  : "0.00"}
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon sx={{ fontSize: "26px", color: colors.greenAccent[500] }} />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart
              data={pagosPorDia.map((p) => ({
                fecha: dayjs(p.fecha).format("DD/MM"),
                totalPagado: p.totalPagado,
              }))}
              xKey="fecha"
              yKey="totalPagado"
              isDashboard={true}
            />
          </Box>
        </Box>

        {/* BarChart de productos */}
        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]}>
          <Typography variant="h5" fontWeight="600" sx={{ padding: "30px 30px 0 30px" }} color={colors.grey[100]}>
            Productos Más Vendidos
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart endpoint={endpoints.dashboard.productosTop} isDashboard={true} />
          </Box>
        </Box>

        {/* PieChart de tipos de usuario */}
        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]} p="30px">
          <Typography variant="h5" fontWeight="600" color={colors.grey[100]} mb="15px">
            Distribución de tipos de usuario
          </Typography>
          <Box height="200px">
            <PieChart data={userTypes} dataKey="cantidad" nameKey="tipoUsuario" />
          </Box>
        </Box>

        {/* Diagrama de Dispersión: Tiempo entre pago y llegada */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
            color={colors.grey[100]}
          >
            Tiempo de Entrega vs Fecha de Pago
          </Typography>
          <Box height="250px" mt="-20px" px="10px">
            <ScatterPlotChart
              endpoint={endpoints.dashboard.tiempoEntrega}
              isDashboard={true}
            />
          </Box>
        </Box>


        {/* Pagos por proveddor */}
        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]}>
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
            color={colors.grey[100]}
          >
            Ingresos por Proveedor
          </Typography>
          <Box height="250px" mt="-20px">
            <HorizontalBarChart
              data={pagosPorProveedor
                .sort((a, b) => b.total - a.total)
                .slice(0, 5)}
              xKey="total"
              yKey="proveedor"
              isDashboard={true}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
