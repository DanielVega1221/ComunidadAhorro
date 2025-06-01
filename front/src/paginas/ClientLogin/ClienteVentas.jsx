import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CargarVentasPorDni } from './Helpers/CargarVentasPorDni';
import { ListaVentasCliente } from './Componentes/ListaVentasCliente';
import { NavbarCliente } from './Componentes/NavbarCliente';

export const ClienteVentas = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dni = location.state?.dni;

  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para manejar errores de sesión
  const handleSessionError = (error) => {
    // Si el token no existe o es inválido, redirigir al login
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("cliente");
      navigate("/Cliente");
      return true;
    }
    return false;
  };

  useEffect(() => {
    // Si no hay DNI, redirigir al login
    if (!dni) {
      navigate("/Cliente");
      return;
    }

    // Si no hay token, redirigir al login
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/Cliente");
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        await CargarVentasPorDni(dni, setVentas, { signal });
      } catch (error) {
        if (handleSessionError(error)) return;

        if (error.name !== 'AbortError') {
          setError("Error cargando tus ventas.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [dni, navigate]);

  return (
    <>
      <NavbarCliente />

      <div className="container mt-4">
        <h2 className="text-center mb-4">Mis Ventas y Cuotas</h2>

        {loading && <p className="text-center">Cargando...</p>}
        {error && <p className="text-danger text-center">{error}</p>}
        {!loading && !error && <ListaVentasCliente ventas={ventas} />}
      </div>
    </>
  );
};