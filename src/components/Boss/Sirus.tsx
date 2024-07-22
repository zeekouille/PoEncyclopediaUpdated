import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useData } from "../dataContext";
import "./bossProfitStyles.css"; // Assurez-vous d'importer votre fichier CSS

interface ItemIcons {
  alHezminsCrest: string;
  baransCrest: string;
  verinatiasCrest: string;
  droxCrest: string;
  handsOfTheHighTemplar: string;
  crownOfTheInwardEye: string;
  theBurdenOfTruth: string;
  threadOfHope: string;
  orbOfDominance: string;
  awakenersOrb: string;
  aFateWorseThanDeath: string;
}

interface ItemPrices {

  alHezminsCrest: number;
  baransCrest: number;
  verinatiasCrest: number;
  droxCrest: number;
  handsOfTheHighTemplar: number;
  crownOfTheInwardEye: number;
  theBurdenOfTruth: number;
  threadOfHope: number;
  orbOfDominance: number;
  awakenersOrb: number;
  aFateWorseThanDeath: number;
}

const Sirus = () => {
  const { data } = useData();

  const [itemIcons, setItemIcons] = useState<ItemIcons>({
 
    alHezminsCrest: "",
    baransCrest: "",
    verinatiasCrest: "",
    droxCrest: "",
    handsOfTheHighTemplar: "",
    crownOfTheInwardEye: "",
    theBurdenOfTruth: "",
    threadOfHope: "",
    orbOfDominance: "",
    awakenersOrb: "",
    aFateWorseThanDeath: "",
  });

  const [itemPrices, setItemPrices] = useState<ItemPrices>({

    alHezminsCrest: 0,
    baransCrest: 0,
    verinatiasCrest: 0,
    droxCrest: 0,
    handsOfTheHighTemplar: 0,
    crownOfTheInwardEye: 0,
    theBurdenOfTruth: 0,
    threadOfHope: 0,
    orbOfDominance: 0,
    awakenersOrb: 0,
    aFateWorseThanDeath: 0,
  });

  const rewardValues: ItemPrices = {
 
    alHezminsCrest: 0,
    baransCrest: 0,
    verinatiasCrest: 0,
    droxCrest: 0,
    handsOfTheHighTemplar: 0.45,
    crownOfTheInwardEye: 0.38,
    theBurdenOfTruth: 0.15,
    threadOfHope: 0.02,
    orbOfDominance: 0.05,
    awakenersOrb: 0.15,
    aFateWorseThanDeath: 0.05,
  };

  useEffect(() => {
    const itemsToFetch = [
   
      { itemName: "Al-Hezmin's Crest", stateKey: "alHezminsCrest" },
      { itemName: "Baran's Crest", stateKey: "baransCrest" },
      { itemName: "Veritania's Crest", stateKey: "verinatiasCrest" },
      { itemName: "Drox's Crest", stateKey: "droxCrest" },

      { itemName: "Hands of the High Templar", stateKey: "handsOfTheHighTemplar" },
      { itemName: "Crown of the Inward Eye", stateKey: "crownOfTheInwardEye" },
      { itemName: "The Burden of Truth", stateKey: "theBurdenOfTruth" },
      { itemName: "Thread of Hope", stateKey: "threadOfHope" },

      { itemName: "Orb of Dominance", stateKey: "orbOfDominance" },
      { itemName: "Awakener's Orb", stateKey: "awakenersOrb" },
      { itemName: "A Fate Worse Than Death", stateKey: "aFateWorseThanDeath" },
      
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
      itemPrices.alHezminsCrest + itemPrices.baransCrest + itemPrices.verinatiasCrest + itemPrices.droxCrest
    const rewardPerRun =
    itemPrices.handsOfTheHighTemplar * rewardValues.handsOfTheHighTemplar +
    itemPrices.crownOfTheInwardEye * rewardValues.crownOfTheInwardEye +
    itemPrices.theBurdenOfTruth * rewardValues.theBurdenOfTruth +
    itemPrices.threadOfHope * rewardValues.threadOfHope +
    itemPrices.orbOfDominance * rewardValues.orbOfDominance +
    itemPrices.awakenersOrb * rewardValues.awakenersOrb +
    itemPrices.aFateWorseThanDeath * rewardValues.aFateWorseThanDeath 
     

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

export default Sirus;
