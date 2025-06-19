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
import { endpoints } from "../services/api";

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
        <p>{`Mes: ${label}`}</p>
        <p>{`Cantidad: ${payload[0].value} usuario${payload[0].value > 1 ? "s" : ""}`}</p>
      </div>
    );
  }

  return null;
};

const UsuariosPorMesChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get(endpoints.users.all);

        const conteoPorMes = {};

        response.data.forEach((u) => {
          const fecha = new Date(u.createdAt);
          const mes = fecha.toLocaleString("es-PE", { month: "long" });
          conteoPorMes[mes] = (conteoPorMes[mes] || 0) + 1;
        });

        const dataFormateada = Object.entries(conteoPorMes).map(([mes, cantidad]) => ({
          mes,
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
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="cantidad" fill="#8884d8" activeBar={false} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default UsuariosPorMesChart;
