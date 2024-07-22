import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useData } from "../dataContext";
import "./bossProfitStyles.css"; // Assurez-vous d'importer votre fichier CSS

interface ItemIcons {
  awakeningFragment: string;
 
  threadOfHope: string;
  orbOfDominance: string;
  awakenersOrb: string;
  aFateWorseThanDeath: string;
  theTempestRising: string,
  oriathsEnd: string,
  theSaviour: string,
  oublietteReliquaryKey: string,
}

interface ItemPrices {

  awakeningFragment: number,
  
  threadOfHope: number;
  orbOfDominance: number;
  awakenersOrb: number;
  aFateWorseThanDeath: number;
  theTempestRising: number,
  oriathsEnd: number,
  theSaviour: number,
  oublietteReliquaryKey: number,
}

const UberSirus = () => {
  const { data } = useData();

  const [itemIcons, setItemIcons] = useState<ItemIcons>({
 
    awakeningFragment: "",
   
    threadOfHope: "",
    orbOfDominance: "",
    awakenersOrb: "",
    theTempestRising: "",
    aFateWorseThanDeath: "",
    oriathsEnd: "",
    theSaviour: "",
    oublietteReliquaryKey: "",
  });

  const [itemPrices, setItemPrices] = useState<ItemPrices>({

    awakeningFragment: 0,
       threadOfHope: 0,
    orbOfDominance: 0,
    awakenersOrb: 0,
    aFateWorseThanDeath: 0,
    theTempestRising: 0,
    oriathsEnd: 0,
    theSaviour: 0,
    oublietteReliquaryKey: 0,

  });

  const rewardValues: ItemPrices = {
 
    awakeningFragment: 0,
    
    threadOfHope: 0.02,
    orbOfDominance: 0.05,
    awakenersOrb: 0.15,
    aFateWorseThanDeath: 0.05,
    theTempestRising: 0.35,
    oriathsEnd: 0.09,
    theSaviour: 0.01,
    oublietteReliquaryKey: 0.015,
  };

  useEffect(() => {
    const itemsToFetch = [
   
      { itemName: "Awakening Fragment", stateKey: "awakeningFragment" },

      
      { itemName: "Thread of Hope", stateKey: "threadOfHope" },

      { itemName: "Orb of Dominance", stateKey: "orbOfDominance" },
      { itemName: "Awakener's Orb", stateKey: "awakenersOrb" },
      { itemName: "A Fate Worse Than Death", stateKey: "aFateWorseThanDeath" },

      { itemName: "The Tempest Rising", stateKey: "theTempestRising" },
      { itemName: "Oriath's End", stateKey: "oriathsEnd" },
      { itemName: "The Saviour", stateKey: "theSaviour" },
      { itemName: "Oubliette Reliquary Key", stateKey: "oublietteReliquaryKey" },
      
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
      itemPrices.awakeningFragment * 4
    const rewardPerRun =
    itemPrices.threadOfHope * rewardValues.threadOfHope +
    itemPrices.orbOfDominance * rewardValues.orbOfDominance +
    itemPrices.awakenersOrb * rewardValues.awakenersOrb +
    itemPrices.aFateWorseThanDeath * rewardValues.aFateWorseThanDeath +
    
    itemPrices.theTempestRising * rewardValues.theTempestRising +
    itemPrices.oriathsEnd * rewardValues.oriathsEnd +
    itemPrices.theSaviour * rewardValues.theSaviour +
    itemPrices.oublietteReliquaryKey * rewardValues.oublietteReliquaryKey 
     

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
      <div className="centered-text">Sirus</div>
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

export default UberSirus;
