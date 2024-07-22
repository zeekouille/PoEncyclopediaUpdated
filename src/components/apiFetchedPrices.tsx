import React from "react";
import Layout from "./Layout";
import { useData } from './dataContext';

const ApiFetchedPrice: React.FC = () => {
  const { names, means, icons } = useData();

  return (
    <Layout>
      <div>
        <h1>Names, Means, and Icons</h1>
        <ul>
          {names.map((name, index) => (
            <li key={index}>
              <img src={icons[index]} alt={`${name} icon`} style={{ width: '20px', height: '20px', marginRight: '5px' }} />
              {name}: {means[index]}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default ApiFetchedPrice;
