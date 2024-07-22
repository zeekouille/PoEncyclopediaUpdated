// src/components/Navbar.tsx
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Barnav: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Navbar.Brand href="http://localhost:3000">PoEncyclopedia</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      
  
   
    </Navbar>
  );
};

export default Barnav;
