import React, { useState } from 'react';
import './ListaVentasCliente.css';

export const ListaVentasCliente = ({ ventas }) => {
  const [ventaActiva, setVentaActiva] = useState(null);

  if (!Array.isArray(ventas) || ventas.length === 0) {
    return <div className="text-center text-light mt-5">No hay ventas registradas para este cliente.</div>;
  }

  const cliente = ventas[0].cliente;

  const toggleCuotas = (index) => {
    setVentaActiva(ventaActiva === index ? null : index);
  };

  return (
    <div className="ventas-container">
      {/* Tarjeta superior del cliente */}
      <div className="card bg-light shadow-sm p-4 mb-4">
        <h4 className="text-primary">Datos del Cliente</h4>
        <p><strong>Nombre:</strong> {cliente.nombre} {cliente.apellido}</p>
        <p><strong>DNI:</strong> {cliente.dni}</p>
      </div>

      {/* Lista de ventas */}
      {ventas.map((venta, index) => {
        const cuotasPagadas = venta.cuotas?.filter(c => c.estado_cuota === 'pago') || [];

        let totalPagado;
        if (venta.producto?.detalle?.venta?.banderas?.ventaDirecta) {
          totalPagado = venta.monto_suscripcion_vta_dir || 0;
        } else {
          totalPagado = cuotasPagadas.reduce((sum, c) => sum + c.montoCuota, 0);
        }

        return (
          <div key={index} className="card venta-card mb-4 shadow">
            <div className="card-body">
              <div className="row">
                {/* Columna izquierda: info de la venta */}
                <div className="col-md-6 border-end">
                  <h5 className="text-primary">Venta #{venta.numeroContrato}</h5>
                  <p><strong>Fecha:</strong> {new Date(venta.fechaRealizada).toLocaleDateString("es-AR")}</p>
                  <p><strong>Tipo:</strong> {venta.producto?.tipo || "N/A"}</p>
                  <p><strong>Monto pagado:</strong> ${totalPagado}</p>
                  <p><strong>Método de pago:</strong> {venta.metodoPago_monto_sus_vta}</p>
                  <p><strong>Estado de pago:</strong> {venta.conducta_o_instancia}</p>
                </div>

                {/* Columna derecha: producto */}
                <div className="col-md-6">
                  <h5 className="text-primary">Producto</h5>
                  <p><strong>Nombre:</strong> {venta.producto?.nombre || "N/A"}</p>

                  {/* Solo mostrar item y modelo si no es préstamo */}
                  {venta.producto?.tipo !== 'prestamo' && (
                    <>
                      <p><strong>Item:</strong> {venta.producto?.detalle?.venta?.itemInventario?.nombre || "N/A"}</p>
                      <p><strong>Modelo:</strong> {venta.producto?.detalle?.venta?.itemInventario?.modelo || "N/A"}</p>
                    </>
                  )}
                </div>
              </div>

              {/* Botón para desplegar cuotas */}
              <div className="mt-3 text-center">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => toggleCuotas(index)}
                >
                  {ventaActiva === index ? "Ocultar cuotas" : "Ver cuotas"}
                </button>
              </div>

              {/* Cuotas desplegables */}
              {ventaActiva === index && (
                <div className="cuotas-container mt-3">
                  <ul className="list-group cuotas-scroll">
                    {venta.cuotas?.map((cuota, idx) => {
                      const hoy = new Date();
                      hoy.setHours(0, 0, 0, 0);

                      const fechaCuota = new Date(cuota.fechaCobro);
                      fechaCuota.setHours(0, 0, 0, 0);

                      const esVencida =
                        cuota.fechaCobro &&
                        fechaCuota < hoy &&
                        cuota.estado_cuota !== 'pago';

                      return (
                        <li
                          key={idx}
                          className={`list-group-item ${esVencida ? 'list-group-item-danger' : ''}`}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <span>#{cuota.numeroCuota} - ${cuota.montoCuota}</span>
                            <span className={`badge ${cuota.estado_cuota === 'pago' ? 'bg-success' : 'bg-warning'} text-uppercase`}>
                              {cuota.estado_cuota}
                            </span>
                          </div>

                          <small className="text-muted">
                            📅 Fecha de cobro:&nbsp;
                            {cuota.fechaCobro
                              ? new Date(cuota.fechaCobro).toLocaleDateString('es-AR')
                              : 'No especificada'}
                          </small>

                          {esVencida && (
                            <div className="text-danger mt-1 small">
                              ⚠️ Cuota vencida
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
