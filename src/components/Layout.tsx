import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="App" >
      <div className="sidebar">
           <ul>
          <li>
            <span>Crafting</span>
            <ul>
              <li className="sub-link-container">
                <Link to="/bow/chaosdotbow">Chaos Dot Bow</Link>
              </li>
            </ul>
          </li>
          <li className="separator"></li>
          <li>
            <span>Boss Profit</span>
            <ul>
              <li className="sub-link-container">
                <Link to="/bossprofit/shaper" className="d-flex justify-content-center">Shaper</Link>
              </li>
              <li className="sub-link-container">
                <Link to="/bossprofit/uberShaper" className="d-flex justify-content-center">Uber Shaper</Link>
              </li>
              <li className="sub-link-container">
                <Link to="/bossprofit/maven" className="d-flex justify-content-center">Maven</Link>
              </li>
              <li className="sub-link-container">
                <Link to="/bossprofit/uberMaven" className="d-flex justify-content-center">Uber Maven</Link>
              </li>
              <li className="sub-link-container">
                <Link to="/bossprofit/sirus" className="d-flex justify-content-center">Sirus</Link>
              </li>
              <li className="sub-link-container">
                <Link to="/bossprofit/UberSirus" className="d-flex justify-content-center" >Uber Sirus</Link>
              </li>
              <li className="sub-link-container">
                <Link to="/bossprofit/elder" className="d-flex justify-content-center">Elder</Link>
              </li>
              <li className="sub-link-container">
                <Link to="/bossprofit/uberElder" className="d-flex justify-content-center">Uber Elder</Link>
              </li>
              <li className="sub-link-container">
                <Link to="/bossprofit/uberUberElder" className="d-flex justify-content-center">Uber Uber Elder</Link>
              </li>
              <li className="sub-link-container">
                <Link to="/bossprofit/eaterOfWorlds" className="d-flex justify-content-center">Eater Of Worlds</Link>
              </li>
              <li className="sub-link-container">
                <Link to="/bossprofit/uberEaterOfWorlds" className="d-flex justify-content-center">Uber Eater Of Worlds</Link>
              </li>
              <li className="sub-link-container">
                <Link to="/bossprofit/theSearingExarch" className="d-flex justify-content-center">The Searing Exarch</Link>
              </li>
              <li className="sub-link-container">
                <Link to="/bossprofit/uberTheSearingExarch" className="d-flex justify-content-center">Uber The Searing Exarch</Link>
              </li>
            </ul>
          </li>
          <li className="separator"></li>
          <li>
            <span>Api</span>
            <ul>
              <li className="sub-link-container">
                <Link to="/apiFetchedPrice">Currency</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="main-content" >
        {children}
      </div>
    </div>
  );
};

export default Layout;
