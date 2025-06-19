import React, { useEffect, useState } from "react";
import {
    ResponsiveContainer,
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import axios from "axios";

const ScatterPlotChart = ({ endpoint }) => {
const [data, setData] = useState([]);

useEffect(() => {
    axios.get(endpoint).then((res) => {
    const formatted = res.data.map((item) => ({
        x: new Date(item.fechaPago).getTime(), // timestamp para eje X
        y: item.diasDeDiferencia,
        producto: item.producto,
        fechaPago: item.fechaPago,
        fechaLlegada: item.fechaLlegadaAcordada,
        }));
    setData(formatted);
    });
}, [endpoint]);

return (
    <ResponsiveContainer width="100%" height="100%">
    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid />

        {/* Eje X: Fecha de Pago */}
        <XAxis
            type="number"
            dataKey="x"
            name="Fecha de Pago"
            domain={["auto", "auto"]}
            tickFormatter={(unixTime) => {
            const date = new Date(unixTime); // Convertir milisegundos a fecha
            const day = date.getDate().toString().padStart(2, "0"); // Día con 2 dígitos
            const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Mes con 2 dígitos
            const year = date.getFullYear(); // Año
            return `${day}/${month}/${year}`; // Formato de fecha DD/MM/YYYY
            }}
        />

        {/* Eje Y: Días de Entrega */}
        <YAxis
            type="number"
            dataKey="y"
            name="Días de Entrega"
            label={{ value: "Días", angle: -90, position: "insideLeft" }}
        />

        {/* Tooltip */}
        <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            formatter={(value, name, props) => { 
            if (name === "Fecha de Pago" || name === "x") { 
                const date = new Date(value);
                const day = date.getDate().toString().padStart(2, "0");
                const month = (date.getMonth() + 1).toString().padStart(2, "0");
                const year = date.getFullYear();
                return [`${day}/${month}/${year}`, "Fecha de Pago"];
            }
            if (name === "Días de Entrega" || name === "y") { 
                return [`${value}`, "Días de Entrega"]; 
            }
            return [value, name];
        }}
        labelFormatter={(val, payload) => {
            
            const fechaPagoRaw = payload?.[0]?.payload?.fechaPago;
            const diasDeDiferencia = payload?.[0]?.payload?.y; 

            let formattedFechaPago = "";
            if (fechaPagoRaw) {
                const date = new Date(fechaPagoRaw);
                const day = date.getDate().toString().padStart(2, "0");
                const month = (date.getMonth() + 1).toString().padStart(2, "0");
                const year = date.getFullYear();
                formattedFechaPago = `${day}/${month}/${year}`;
            }
            
            return `Fecha de Pago: ${formattedFechaPago}\nDías de Entrega: ${diasDeDiferencia}`;
        }}
        />

        {/* Datos del gráfico */}
        <Scatter name="Pedidos" data={data} fill="#82ca9d" />
    </ScatterChart>
    </ResponsiveContainer>
    );
};

export default ScatterPlotChart;