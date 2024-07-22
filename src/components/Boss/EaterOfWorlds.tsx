import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useData } from "../dataContext";
import "./bossProfitStyles.css"; // Assurez-vous d'importer votre fichier CSS

interface ItemIcons {
  screamingInvitation: string;
  
  meldingOfTheFlesh: string;
  exceptionalEldritchIchor: string;
  eldritchOrbOfAnnulment: string;
  eldritchChaosOrb: string;
  eldritchExaltedOrb: string;


}

interface ItemPrices {

  screamingInvitation: number,
  meldingOfTheFlesh: number,
  exceptionalEldritchIchor: number,
  eldritchOrbOfAnnulment: number,
  eldritchChaosOrb: number,
  eldritchExaltedOrb: number,

  

}

const EaterOfWorlds = () => {
  const { data } = useData();

  const [itemIcons, setItemIcons] = useState<ItemIcons>({
 
    screamingInvitation: "",
    meldingOfTheFlesh: "",
    exceptionalEldritchIchor: "",
    eldritchOrbOfAnnulment: "",
    eldritchChaosOrb: "",
    eldritchExaltedOrb: "",
 
   
  
  });

  const [itemPrices, setItemPrices] = useState<ItemPrices>({

    screamingInvitation: 0,
    meldingOfTheFlesh: 0,
    exceptionalEldritchIchor: 0,
    eldritchOrbOfAnnulment: 0,
    eldritchChaosOrb: 0,
    eldritchExaltedOrb: 0,
 

  });

  const rewardValues: ItemPrices = {
 
    screamingInvitation: 0,
    meldingOfTheFlesh: 0.02,
    exceptionalEldritchIchor: 0.15,
    eldritchOrbOfAnnulment: 0.05,
    eldritchChaosOrb: 0.05,
    eldritchExaltedOrb: 0.05,
    

  };

  useEffect(() => {
    const itemsToFetch = [
   
      { itemName: "Screaming Invitation", stateKey: "screamingInvitation" },
      { itemName: "Melding of the Flesh", stateKey: "meldingOfTheFlesh" },
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
    const pricePerRun = itemPrices.screamingInvitation

    const rewardPerRun =
    itemPrices.eldritchChaosOrb * rewardValues.eldritchChaosOrb +
    itemPrices.eldritchExaltedOrb * rewardValues.eldritchExaltedOrb+
    itemPrices.eldritchOrbOfAnnulment * rewardValues.eldritchOrbOfAnnulment +
    itemPrices.exceptionalEldritchIchor * rewardValues.exceptionalEldritchIchor +
    itemPrices.meldingOfTheFlesh * rewardValues.meldingOfTheFlesh
   
     

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
      <div className="centered-text">Eater Of Worlds , cannot add forbidden flesh yet </div>
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

export default EaterOfWorlds;
