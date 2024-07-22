import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Box() {
  const boxStyle = {
    width: '100%',
    paddingTop: '100%',
    backgroundColor: 'lightgrey',
    borderRadius: '10px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  };

  const containerStyle = {
    marginTop: '20px',
  };

  return (
    <Container style={containerStyle}>
      <Row>
        <Col sm={4}>
          {/* Utilisez la balise Link pour créer un lien cliquable */}
          <Link to="/bow/chaosdotbow" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={boxStyle}>
              Chaos Dot Bow
            </div>
          </Link>
        </Col>
        <Col sm={4}>
          <Link to="/ts2" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={boxStyle}>
              TS2
            </div>
          </Link>
        </Col>
        <Col sm={4}>
          <Link to="/ts3" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={boxStyle}>
              TS3
            </div>
          </Link>
        </Col>
        <Col sm={4}>
          <Link to="/ts4" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={boxStyle}>
              TS4
            </div>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
