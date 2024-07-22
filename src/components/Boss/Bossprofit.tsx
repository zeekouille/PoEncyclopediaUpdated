import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Bossprofit.css';

export default function Bossprofit() {
  const boxStyle: React.CSSProperties = {
    width: '100%',
    paddingTop: '0%',
    backgroundColor: 'lightgrey',
    borderRadius: '10px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    overflow: 'hidden',
  };

  const containerStyle: React.CSSProperties = {
    marginTop: '20px',
  };

  const [fadeClass, setFadeClass] = useState<string[]>([]);

  useEffect(() => {
    const timer: NodeJS.Timeout[] = [];
    for (let i = 0; i < 6; i++) {
      timer.push(
        setTimeout(() => {
          setFadeClass((prev) => [...prev, 'fade-in']);
        }, i * 300) // délai de 300ms entre chaque élément
      );
    }

    return () => {
      timer.forEach(clearTimeout);
    };
  }, []);

  return (
    <Container style={containerStyle}>
      <Row>
        <Col sm={4} className={fadeClass[0]}>
          <Link to="/bossprofit/shaper" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={boxStyle}>
              Shaper ({'In progress'})
            </div>
          </Link>
        </Col>
        <Col sm={4} className={fadeClass[1]}>
          <Link to="/ts2" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={boxStyle}>
              Uber Shaper ({'Later'})
            </div>
          </Link>
        </Col>
        <Col sm={4} className={fadeClass[2]}>
          <Link to="/ts3" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={boxStyle}>
              Maven ({'Later'})
            </div>
          </Link>
        </Col>
        <Col sm={4} className={fadeClass[3]}>
          <Link to="/ts4" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={boxStyle}>
              Uber Maven ({'Later'})
            </div>
          </Link>
        </Col>
        <Col sm={4} className={fadeClass[4]}>
          <Link to="/ts4" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={boxStyle}>
              Sirus ({'Later'})
            </div>
          </Link>
        </Col>
        <Col sm={4} className={fadeClass[5]}>
          <Link to="/ts4" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={boxStyle}>
              Uber Sirus({'Later'})
            </div>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
