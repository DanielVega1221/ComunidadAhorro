import React from 'react'
import { HomeLogin } from '../paginas/HomeLogin/HomeLogin'
import { BrowserRouter, HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Creador } from '../paginas/Creater/Creador'
import { Gerente } from '../paginas/Gerencia/Gerente'
import { GestEmpleado } from '../paginas/Gerencia/GestEmpleado'
import { GestClientes } from '../paginas/Gerencia/GestClientes'
import { GestProductos } from '../paginas/Gerencia/GestProductos'
import { RegistrarVenta } from '../paginas/Gerencia/RegistrarVenta'
import { GestCobranza } from '../paginas/Gerencia/GestCobranza'
import { Notificaciones } from '../paginas/Gerencia/Notificaciones'
import { GestStock } from '../paginas/Gerencia/GestStock'
import GestRendiciones from '../paginas/Gerencia/GestRendiciones'
import { CobranzaCobrador } from '../paginas/Cobrador/CobranzaCorador'
import { SupReporte } from '../paginas/Supervisor/SupReporte'
import { ReportCobrador } from '../paginas/Cobrador/ReportCobrador'
import { VendedorRep } from '../paginas/Vendedor/VendedorRep'
import { GestGastos } from '../paginas/Gerencia/GestGastos'
import { ReportVentas } from '../paginas/Gerencia/ReportVentas'
import { ReportPrestamos } from '../paginas/Gerencia/ReportPrestamos'
import { GestorInventario } from '../paginas/Gerencia/GestInventario'
import { ClientLogin } from '../paginas/ClientLogin/ClientLogin'
import { ClienteVentas } from '../paginas/ClientLogin/ClienteVentas'
/*
http://localhost:5176/#/Cliente

Solucion para el f5 de vercel

Reemplaza BrowserRouter por HashRouter

Las URLs tendrán un # antes de la ruta:

Antes: tudominio.com/gerencia

Ahora: tudominio.com/#/gerencia

Ventajas:

 Soluciona el error 404 al recargar: El servidor solo ve la parte antes del # (siempre cargará index.html).

 Zero configuración en Vercel: No necesitas tocar vercel.json.

Desventajas:

 URLs menos limpias (con #).

 No recomendado para SEO (pero si es una app privada, no hay problema).

*/


// Componente para detectar el contexto y redirigir apropiadamente
const SmartRedirect = () => {
  const currentPath = window.location.hash;
  const hasClientData = localStorage.getItem("cliente");
  
  // Si la URL sugiere contexto de cliente, redirigir al login de cliente
  if (currentPath.includes("Cliente") || currentPath.includes("venta")) {
    return <Navigate to="/Cliente" replace />;
  }
  
  // Si hay datos de cliente pero está en ruta desconocida, 
  // asumir que quiere ir a sus ventas
  if (hasClientData) {
    return <Navigate to="/venta" replace />;
  }
  
  // Por defecto, redirigir al login de administrador
  return <Navigate to="/" replace />;
};

// Componente para proteger la ruta de ventas del cliente
const ProtectedClienteVentas = () => {
  const token = localStorage.getItem("token");
  const cliente = localStorage.getItem("cliente");
  
  // Si no hay token o cliente, redirigir al login de cliente
  if (!token || !cliente) {
    return <Navigate to="/Cliente" replace />;
  }
  
  return <ClienteVentas />;
};

export const AppRouter = () => {
  return (
    <HashRouter>
        <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<HomeLogin />} />
        
        {/* Rutas de sistema */}
        <Route path="/creador" element={<Creador />} />
        <Route path="/gerencia" element={<Gerente />} />
        <Route path="/gest-emp" element={<GestEmpleado />} />
        <Route path="/gest-cli" element={<GestClientes />} />
        <Route path="/gest-prod" element={<GestProductos />} />
        <Route path="/gest-venta" element={<RegistrarVenta />} />
        <Route path="/gest-cobro" element={<GestCobranza />} />
        <Route path="/gest-noti" element={<Notificaciones />} />
        <Route path="/gest-rendi" element={<GestRendiciones />} />
        <Route path="/gest-gastos" element={<GestGastos />} />
        <Route path="/report-vtas" element={<ReportVentas />} />
        <Route path="/report-prest" element={<ReportPrestamos />} />
        <Route path="/gest-inv" element={<GestorInventario />} />
        <Route path="/cobrador" element={<CobranzaCobrador />} />
        <Route path="/rep-cobrador" element={<ReportCobrador />} />
        <Route path="/sup" element={<SupReporte />} /> 
        <Route path="/vendedor" element={<VendedorRep />} />

        {/* Rutas de cliente */}
        <Route path="/Cliente" element={<ClientLogin/>} />
        <Route path="/venta" element={<ProtectedClienteVentas/>} />
        
        {/* Ruta catch-all - redirige inteligentemente según el contexto */}
        <Route path="*" element={<SmartRedirect />} />
      </Routes>
    </HashRouter>
  )
}