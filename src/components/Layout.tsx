import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="App">
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
                <Link to="/bossprofit/shaper">Shaper</Link>
              </li>
              <li className="sub-link-container">
                <Link to="/bossprofit/uberShaper">Uber Shaper</Link>
              </li>
              <li className="sub-link-container">
                <Link to="/bossprofit/maven">Maven</Link>
              </li>
              <li className="sub-link-container">
                <Link to="/bossprofit/uberMaven">Uber Maven</Link>
              </li>
              <li className="sub-link-container">
                <Link to="/bossprofit/sirus">Sirus</Link>
              </li>
              <li className="sub-link-container">
                <Link to="/bossprofit/UberSirus">Uber Sirus</Link>
              </li>
              <li className="sub-link-container">
                <Link to="/bossprofit/elder">Elder</Link>
              </li>
              <li className="sub-link-container">
                <Link to="/bossprofit/uberElder">Uber Elder</Link>
              </li>
              <li className="sub-link-container">
                <Link to="/bossprofit/uberUberElder">Uber Uber Elder</Link>
              </li>
              <li className="sub-link-container">
                <Link to="/bossprofit/eaterOfWorlds">Eater Of Worlds</Link>
              </li>
              <li className="sub-link-container">
                <Link to="/bossprofit/uberEaterOfWorlds">Uber Eater Of Worlds</Link>
              </li>
              <li className="sub-link-container">
                <Link to="/bossprofit/theSearingExarch">The Searing Exarch</Link>
              </li>
              <li className="sub-link-container">
                <Link to="/bossprofit/uberTheSearingExarch">Uber The Searing Exarch</Link>
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
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
