export const CargarVentasPorDni = async (dni, setVentas, { signal }) => {
  const token = localStorage.getItem("token");

  const resp = await fetch(`http://localhost:4008/cliente/ventas/${dni}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-token": token
    },
    signal
  });
 
  if (!resp.ok) {
    const errorData = await resp.json();
    throw new Error(errorData.msg || "Error al obtener ventas del cliente.");
  }

  const data = await resp.json();
  setVentas(data);
};
