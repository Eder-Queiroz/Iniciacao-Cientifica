import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";

export default function Navigator() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="shadow p-3 mb-5 bg-body rounded">
      <Navbar style={{ width: "100%" }}>
        <NavbarBrand>
          <Link to="/">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZp9hvtFQuU6dfBhN6m_lY4elI7Fs9n7_n-iOAwIzd&s"
              alt="Logo"
              className="img-thumbnail"
              style={{ width: "60px", height: "60px" }}
            />
          </Link>
        </NavbarBrand>
        <Nav className="me-auto desktop-menu" navbar style={{ width: "90%" }}>
          <NavItem className="d-flex justify-content-between">
            <div className="d-flex gap-3">
              <Link to="/professores" className="nav-link">
                Professores
              </Link>
              <Link to="/cursos" className="nav-link">
                Cursos
              </Link>
              <Link to="/turmas" className="nav-link">
                Turmas
              </Link>
              <Link to="/disciplinas" className="nav-link">
                Disciplinas
              </Link>
              <Link to="/restricoes" className="nav-link">
                Restrições
              </Link>
              <Link to="/salas" className="nav-link">
                Salas
              </Link>
              <Link to="/aulas" className="nav-link">
                aulas
              </Link>
            </div>
            <Link to="/grade" className="nav-link">
              <Button color="primary">Gerar grade</Button>
            </Link>
          </NavItem>
        </Nav>
        <NavbarToggler
          onClick={toggle}
          className="mobile-menu"
          style={{ display: "none" }}
        />
        <Collapse isOpen={isOpen} navbar>
          <div className="d-flex justify-content-center aling-itens-center">
            <Nav navbar>
              <Link className="nav-link" to="/professores">
                Professores
              </Link>
              <Link className="nav-link" to="/cursos">
                Cursos
              </Link>
              <Link className="nav-link" to="/turmas">
                Turmas
              </Link>
              <Link className="nav-link" to="/disciplinas">
                Disciplinas
              </Link>
              <Link className="nav-link" to="/restricoes">
                Restrições
              </Link>
              <Link className="nav-link" to="/salas">
                Salas
              </Link>
              <Link className="nav-link" to="/grade">
                <Button color="primary">Gerar grade</Button>
              </Link>
            </Nav>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
}
