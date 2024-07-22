import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useData } from "../dataContext";
import "./bossProfitStyles.css"; // Assurez-vous d'importer votre fichier CSS

interface ItemIcons {
  devouringFragment: string;
  nimis: string;
  ashesOfTheStars: string;
  exceptionalEldritchIchor: string;
  eldritchOrbOfAnnulment: string;
  eldritchChaosOrb: string;
  eldritchExaltedOrb: string;
  visceralReliquaryKey: string,
  curioOfConsumption: string

}

interface ItemPrices {

  devouringFragment: number,
  nimis: number;
  ashesOfTheStars: number;
  exceptionalEldritchIchor: number,
  eldritchOrbOfAnnulment: number,
  eldritchChaosOrb: number,
  eldritchExaltedOrb: number,
  visceralReliquaryKey: number,
  curioOfConsumption: number,

}

const UberEaterOfWorlds = () => {
  const { data } = useData();

  const [itemIcons, setItemIcons] = useState<ItemIcons>({
 
    devouringFragment: "",
    nimis: "",
    ashesOfTheStars: "",
    exceptionalEldritchIchor: "",
    eldritchOrbOfAnnulment: "",
    eldritchChaosOrb: "",
    eldritchExaltedOrb: "",
    visceralReliquaryKey: "",
    curioOfConsumption: ""
  
  });

  const [itemPrices, setItemPrices] = useState<ItemPrices>({

    devouringFragment: 0,
    nimis: 0,
    ashesOfTheStars: 0,
    exceptionalEldritchIchor: 0,
    eldritchOrbOfAnnulment: 0,
    eldritchChaosOrb: 0,
    eldritchExaltedOrb: 0,
    visceralReliquaryKey: 0,
    curioOfConsumption: 0
  });

  const rewardValues: ItemPrices = {
 
    devouringFragment: 0,
    nimis: 0.02,
    ashesOfTheStars: 0.33,
    exceptionalEldritchIchor: 0.15,
    eldritchOrbOfAnnulment: 0.05,
    eldritchChaosOrb: 0.05,
    eldritchExaltedOrb: 0.05,
    visceralReliquaryKey: 0.015,
    curioOfConsumption: 0.05
    

  };

  useEffect(() => {
    const itemsToFetch = [
      { itemName: "Devouring Fragment", stateKey: "devouringFragment" },
     { itemName: "Nimis", stateKey: "nimis" },
      { itemName: "Ashes of the Stars", stateKey: "ashesOfTheStars" },
      { itemName: "Visceral Reliquary Key", stateKey: "visceralReliquaryKey" },
      { itemName: "Curio of Consumption", stateKey: "curioOfConsumption" },
      { itemName: "Exceptional Eldritch Ichor", stateKey: "exceptionalEldritchIchor" },
      { itemName: "Eldritch Orb of Annulment", stateKey: "eldritchOrbOfAnnulment" },
      { itemName: "Eldritch Chaos Orb", stateKey: "eldritchChaosOrb" },
      { itemName: "Eldritch Exalted Orb", stateKey: "eldritchExaltedOrb" },
      
      

     
      
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
    const pricePerRun = itemPrices.devouringFragment * 5

    const rewardPerRun =
    itemPrices.ashesOfTheStars * rewardValues.ashesOfTheStars +
    itemPrices.nimis * rewardValues.nimis +
    itemPrices.eldritchChaosOrb * rewardValues.eldritchChaosOrb +
    itemPrices.eldritchExaltedOrb * rewardValues.eldritchExaltedOrb+
    itemPrices.eldritchOrbOfAnnulment * rewardValues.eldritchOrbOfAnnulment +
    itemPrices.exceptionalEldritchIchor * rewardValues.exceptionalEldritchIchor +
    itemPrices.curioOfConsumption * rewardValues.curioOfConsumption +
    itemPrices.visceralReliquaryKey * rewardValues.visceralReliquaryKey

   
     

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
      <div className="centered-text">Uber Eater Of Worlds , cannot add forbidden flesh yet </div>
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

export default UberEaterOfWorlds;
