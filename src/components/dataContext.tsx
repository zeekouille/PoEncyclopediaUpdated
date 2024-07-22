import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import Popup from './Popup'; // Import du composant Popup

interface DataContextType {
  data: any[];
  names: string[];
  means: number[];
  icons: string[]; // Add icons array
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState<any[]>([]);
  const [names, setNames] = useState<string[]>([]);
  const [means, setMeans] = useState<number[]>([]);
  const [icons, setIcons] = useState<string[]>([]); // State for icons
  const [fetchStatus, setFetchStatus] = useState<{ success: boolean; message: string } | null>(null);

  const fetchData = async () => {
    try {
      const [currencyResponse] = await Promise.all([
        axios.get('http://localhost:3005/data'),
      ]);

      const fetchedCurrencyData = currencyResponse.data;

      const fetchedCurrencyNames = fetchedCurrencyData.map((item: any) => item.name);
      const fetchedCurrencyMeans = fetchedCurrencyData.map((item: any) => item.mean);
      const fetchedCurrencyIcons = fetchedCurrencyData.map((item: any) => item.icon);

      setData([...fetchedCurrencyData]);
      setNames([...fetchedCurrencyNames]);
      setMeans([...fetchedCurrencyMeans]);
      setIcons([...fetchedCurrencyIcons]);

      setFetchStatus({ success: true, message: 'Données récupérées avec succès!' });

      console.log('Data fetched successfully:', fetchedCurrencyData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setFetchStatus({ success: false, message: 'Échec de la récupération des données.' });
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // 60000 ms = 1 minute

    return () => clearInterval(interval);
  }, []);

  return (
    <DataContext.Provider value={{ data, names, means, icons }}>
      {children}
      {fetchStatus && (
        <Popup
          message={fetchStatus.message}
          success={fetchStatus.success}
        />
      )}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
