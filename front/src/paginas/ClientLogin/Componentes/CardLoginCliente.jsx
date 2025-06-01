import { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { PersonBadge } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Logo from "../../../assets/Logo1-removebg-preview.png";
import { starLoginCliente } from "../Helpers/StarLogin";
// import { useSessionCheck } from "../../../hooks/useSessionCheck";

export const CardLoginCliente = () => {
  const [dni, setDni] = useState("");
  const navigate = useNavigate();
  // const { checkSessionError } = useSessionCheck();

  const onInputChange = (e) => {
    setDni(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validación simple del DNI
    if (!/^\d{8}$/.test(dni)) {
      Swal.fire({
        title: "¡Error!",
        text: "El DNI debe contener exactamente 8 dígitos numéricos.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    // ✅ Llamar al helper para login
    const { ok, cliente, token, error } = await starLoginCliente(dni);

    console.log("🟩 Resultado del login:", { ok, cliente, token, error });

    if (ok) {
      // ✅ Navegar a la pantalla de ventas del cliente pasando el DNI
      navigate("/venta", {
        state: { dni: dni }, // Pasar el DNI que necesita ClienteVentas
      });
    } else {
      // 🔴 Chequear si es sesión expirada - comentado temporalmente
      // if (checkSessionError(error)) return;

      // ⚠️ Otros errores
      const errorMessage =
        error?.response?.data?.msg ||
        error?.message ||
        "Error al iniciar sesión. Intente nuevamente.";

      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
        background: "#f9f9f9",
        confirmButtonColor: "#ffc107",
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: "23rem" }} className="shadow-lg rounded-5">
        <Card.Body>
          <Card.Title className="text-center">
            <img
              className="logo img-fluid"
              style={{ width: "300px", height: "150px", objectFit: "cover" }}
              src={Logo}
              alt="Logo"
            />
          </Card.Title>
          <Card.Subtitle className="text-muted text-center">
            Ingreso exclusivo para clientes
          </Card.Subtitle>

          <Form onSubmit={onSubmit} className="p-5 p-sm-4 m-3">
            <Form.Group className="mb-3">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su DNI"
                  maxLength={8}
                  minLength={8}
                  value={dni}
                  onChange={onInputChange}
                />
                <InputGroup.Text>
                  <PersonBadge />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group className="pt-4 d-flex justify-content-center align-items-center">
              <Button variant="primary" type="submit">
                Ingresar
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};