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

export default function Navigator() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="shadow p-3 mb-5 bg-body rounded">
      <Navbar style={{ width: "100%" }}>
        <NavbarBrand href="/">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZp9hvtFQuU6dfBhN6m_lY4elI7Fs9n7_n-iOAwIzd&s"
            alt="Logo"
            className="img-thumbnail"
            style={{ width: "60px", height: "60px" }}
          />
        </NavbarBrand>
        <Nav className="me-auto desktop-menu" navbar style={{ width: "90%" }}>
          <NavItem className="d-flex justify-content-between">
            <div className="d-flex gap-3">
              <NavLink href="/components/">Professores</NavLink>
              <NavLink href="#">Cursos</NavLink>
              <NavLink href="#">Turmas</NavLink>
              <NavLink href="#">Disciplinas</NavLink>
              <NavLink href="#">Restrições</NavLink>
            </div>
            <NavLink href="#">
              <Button color="primary">Gerar grade</Button>
            </NavLink>
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
              <NavLink href="/components/">Professores</NavLink>
              <NavLink href="#">Cursos</NavLink>
              <NavLink href="#">Turmas</NavLink>
              <NavLink href="#">Disciplinas</NavLink>
              <NavLink href="#">Restrições</NavLink>
              <NavLink href="#">
                <Button color="primary">Gerar grade</Button>
              </NavLink>
            </Nav>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
}
