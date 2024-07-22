import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Barnav: React.FC = () => {
  return (
    <Navbar className="ps-3" bg="dark" variant="dark" expand="lg" fixed="top">
      <Navbar.Brand href="http://localhost:3000">PoEncyclopedia</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* Ajoutez des éléments de navigation ici si nécessaire */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Barnav;
