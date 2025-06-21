// src/services/api.js
//const BASE_URL = "https://localhost:7278/api"; // ✅ correcto
const BASE_URL = "https://dashboardtransactiva-production.up.railway.app/api";

export const endpoints = {
  dashboard: {
    users: `${BASE_URL}/Dashboard/users`,
    userTypes: `${BASE_URL}/Dashboard/usertypes`,
    monthlyPayments: `${BASE_URL}/Dashboard/payments/monthly`,
    pedidosEstado: `${BASE_URL}/Dashboard/pedidos/estado`,
    productosTop: `${BASE_URL}/Dashboard/productos/top`,
    enviosEstado: `${BASE_URL}/Dashboard/envios/estado`,
    compradoresTop: `${BASE_URL}/Dashboard/compradores/top`,
    pagosEmpresa: `${BASE_URL}/Dashboard/pagos/empresa`,
    pagosEstado: `${BASE_URL}/Dashboard/pagos/estado`,
    pagosPorDia: `${BASE_URL}/Dashboard/pagos/por-dia`,
    pagosPorProveedor: `${BASE_URL}/Dashboard/pagos-por-proveedor`,
    tiempoEntrega: `${BASE_URL}/Dashboard/tiempo-entrega`,
  },
  users: {
    all: `${BASE_URL}/Users`,
    byId: (id) => `${BASE_URL}/Users/${id}`,
    bulk: `${BASE_URL}/Users/bulk`,
  },
  pedidos: {
    byUserId: (id) => `${BASE_URL}/Pedidos/usuario/${id}`,
  },
  pagos: `${BASE_URL}/Pagos`,
  envios: `${BASE_URL}/Envios`,
};
