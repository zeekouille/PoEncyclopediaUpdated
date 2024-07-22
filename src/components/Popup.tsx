import React, { useEffect, useState } from 'react';
import './Popup.css'; // Importez le fichier CSS

interface PopupProps {
  message: string;
  success: boolean;
}

const Popup: React.FC<PopupProps> = ({ message, success }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000); // Disparition automatique après 3 secondes

    return () => clearTimeout(timer);
  }, []);

  const popupClass = `popup ${!visible ? 'hide' : ''}`;
  const backgroundColor = success ? '#4CAF50' : '#F44336'; // Couleur en fonction du succès

  return (
    <div
      className={popupClass}
      style={{ backgroundColor }}
    >
      {message}
    </div>
  );
};

export default Popup;
