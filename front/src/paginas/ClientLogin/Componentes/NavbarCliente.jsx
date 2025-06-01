import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../assets/Logo1_Black-removebg-preview.png';

export const NavbarCliente = () => {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cliente");
    navigate("/Cliente");
  };

  return (
    <Navbar collapseOnSelect expand="lg" sticky="top" className="navbar-dark fondo_nav_footer">
      <Container fluid>
        <Navbar.Brand onClick={cerrarSesion}>
          <div className="">
            <img
              className="logo img-fluid"
              style={{ width: '200px', height: '100px', objectFit: 'cover' }}
              src={Logo}
              alt="Logo"
            />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="custom-navbar-toggle text-light" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Button
            className="m-2 rounded-3 custom-dropdown-toggle"
            variant="outline-light"
            onClick={cerrarSesion}
          >
            <i className="bi bi-box-arrow-left"> </i> Salir
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
