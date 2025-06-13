import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Tooltip personalizado
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#2c2c2c",
          padding: "10px",
          border: "1px solid #555",
          borderRadius: "4px",
          color: "#fff",
          fontSize: "14px",
        }}
      >
        <p>{`Fecha: ${label}`}</p>
        <p>{`Cantidad: ${payload[0].value} usuario${payload[0].value > 1 ? "s" : ""}`}</p>
      </div>
    );
  }

  return null;
};

const UsuariosPorDiaChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("https://localhost:7278/api/users");

        // Agrupar por fecha (día)
        const conteoPorDia = {};

        response.data.forEach((u) => {
          const fecha = new Date(u.createdAt).toLocaleDateString("es-PE");
          conteoPorDia[fecha] = (conteoPorDia[fecha] || 0) + 1;
        });

        const dataFormateada = Object.entries(conteoPorDia).map(([fecha, cantidad]) => ({
          fecha,
          cantidad,
        }));

        setData(dataFormateada);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="fecha" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="cantidad" fill="#8884d8" activeBar={false} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default UsuariosPorDiaChart;
