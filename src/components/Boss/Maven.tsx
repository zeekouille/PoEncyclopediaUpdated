import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useData } from "../dataContext";
import "./bossProfitStyles.css"; // Assurez-vous d'importer votre fichier CSS

interface ItemIcons {
  mavensWrit: string;
  orbOfConflict: string;
  legacyOfFury: string;
  gravensSecret: string;
  arnsAnguish: string;
  oleysasDelight: string;
  doppelgangerGuise: string;
  echoForge: string;
 

}

interface ItemPrices {

  mavensWrit: number;
  orbOfConflict: number;
  legacyOfFury: number;
  gravensSecret: number;
  arnsAnguish: number;
  oleysasDelight: number;
  doppelgangerGuise: number;
  echoForge: number;

}

const Maven = () => {
  const { data } = useData();

  const [itemIcons, setItemIcons] = useState<ItemIcons>({
 
    mavensWrit: "",
    orbOfConflict: "",
    legacyOfFury: "",
    gravensSecret: "",
    arnsAnguish: "",
    oleysasDelight: "",
    doppelgangerGuise: "",
    echoForge: "",
   
  });

  const [itemPrices, setItemPrices] = useState<ItemPrices>({

    mavensWrit: 0,
    orbOfConflict: 0,
    legacyOfFury: 0,
    gravensSecret: 0,
    arnsAnguish: 0,
    oleysasDelight: 0,
    doppelgangerGuise: 0,
    echoForge: 0,
  

  });

  const rewardValues: ItemPrices = {
    mavensWrit: 0.35,
    orbOfConflict: 0.45,
    legacyOfFury: 0.16,
    gravensSecret: 0.16,
    arnsAnguish: 0.16,
    oleysasDelight: 0.16,
    doppelgangerGuise: 0.06,
    echoForge: 0.01,
    
 

  };

  useEffect(() => {
    const itemsToFetch = [
   
      { itemName: "The Maven's Writ", stateKey: "mavensWrit" },
      { itemName: "Legacy of Fury", stateKey: "legacyOfFury" },
      { itemName: "Orb of Conflict", stateKey: "orbOfConflict" },
      { itemName: "Graven's Secret", stateKey: "gravensSecret" },
      { itemName: "Arn's Anguish", stateKey: "arnsAnguish" },
      { itemName: "Olesya's Delight", stateKey: "oleysasDelight" },
      { itemName: "Doppelgänger Guise", stateKey: "doppelgangerGuise" },
      { itemName: "Echoforge", stateKey: "echoForge" },

   
      
    ];

    const newPrices: Partial<ItemPrices> = {};
    const newIcons: Partial<ItemIcons> = { ...itemIcons };

    itemsToFetch.forEach((item) => {
      const itemData = data.find((d) => d.name === item.itemName);
      if (itemData) {
        newPrices[item.stateKey as keyof ItemPrices] = itemData.mean;
        newIcons[item.stateKey as keyof ItemIcons] = itemData.icon;
      }
    });

    setItemPrices((prevState) => ({
      ...prevState,
      ...newPrices,
    }));

    setItemIcons(newIcons as ItemIcons);
  }, [data]);

  const [profitPerBoss, setProfitPerBoss] = useState<number>(0);

  const calculateProfitPerBoss = () => {
    const pricePerRun =
itemPrices.mavensWrit
    const rewardPerRun =
itemPrices.arnsAnguish * rewardValues.arnsAnguish +
itemPrices.doppelgangerGuise * rewardValues.arnsAnguish +
itemPrices.echoForge * rewardValues.arnsAnguish +
itemPrices.gravensSecret * rewardValues.gravensSecret +
itemPrices.legacyOfFury * rewardValues.legacyOfFury + 
itemPrices.oleysasDelight * rewardValues.oleysasDelight +
itemPrices.orbOfConflict * rewardValues.orbOfConflict
     

    const profitPerBoss = Math.round(rewardPerRun - pricePerRun);
    console.log("Profit per boss:", profitPerBoss);

    setProfitPerBoss(profitPerBoss);
  };

  const handlePriceChange = (itemName: keyof ItemPrices, value: string) => {
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      setItemPrices((prevPrices) => ({
        ...prevPrices,
        [itemName]: parsedValue,
      }));
    }
  };

  return (
    <Layout>
      <div className="centered-text">Maven</div>
      <table className="centered-table">
        <thead>
          <tr>
            <th className="centered-text">Item Name</th>
            <th className="centered-text">Icon</th>
            <th className="centered-text">Price</th>
            <th className="centered-text">Drop per run</th>
            <th className="centered-text">Set Price</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(itemPrices).map((key) => (
            <tr key={key}>
              <td>{key}</td>
              <td>
                {itemIcons[key as keyof ItemIcons] && (
                  <img
                    style={{
                      textAlign: "center",
                      display: "block",
                      margin: "0 auto",
                    }}
                    src={itemIcons[key as keyof ItemIcons]}
                    alt={`${key} icon`}
                    //style={{ width: "50px", height: "50px" }}
                  />
                )}
              </td>
              <td>
                {itemPrices[key as keyof ItemPrices]}

                <img
                  style={{ width: "50px", height: "50px" }}
                  src="https://www.poewiki.net/images/9/9c/Chaos_Orb_inventory_icon.png"
                  alt="Chaos Orb"
                />
              </td>

              <td>{rewardValues[key as keyof ItemPrices]}</td>
              <td>
                <input
                  type="number"
                  value={itemPrices[key as keyof ItemPrices]}
                  onChange={(e) =>
                    handlePriceChange(key as keyof ItemPrices, e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
      style={{ textAlign: "center", display: "block", margin: "20px auto" }}
      onClick={calculateProfitPerBoss}
    >
      Calculate profit
    </button>

      <p className="centered-text">Profit per boss</p>
      <p className="centered-text">
        {profitPerBoss}{" "}
        <img
          style={{ width: "50px", height: "50px" }}
          src="https://www.poewiki.net/images/9/9c/Chaos_Orb_inventory_icon.png"
          alt="Chaos Orb"
        />
      </p>
    </Layout>
  );
};

export default Maven;
