import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useData } from "../dataContext";
import "./bossProfitStyles.css"; // Assurez-vous d'importer votre fichier CSS

interface ItemIcons {

  fragmentOfTheHydra: string;
  fragmentOfTheChimera: string;
  fragmentOfThePhoenix: string;
  fragmentOfTheMinotaur: string;
  fragmentOfKnowledge: string;
  fragmentOfShape: string;
  dyingSun: string;
  orbOfDominance: string

}

interface ItemPrices {

 
  fragmentOfTheHydra: number,
  fragmentOfTheChimera: number,
  fragmentOfThePhoenix: number,
  fragmentOfTheMinotaur: number,
  fragmentOfKnowledge: number,
  fragmentOfShape: number,
  dyingSun: number,
  orbOfDominance: number

}

const Shaper = () => {
  const { data } = useData();

  const [itemIcons, setItemIcons] = useState<ItemIcons>({
 
    
    fragmentOfTheHydra: "",
    fragmentOfTheChimera: "",
    fragmentOfThePhoenix: "",
    fragmentOfTheMinotaur: "",
    fragmentOfKnowledge: "",
    fragmentOfShape: "",
    dyingSun: "",
    orbOfDominance: "",
  
  });

  const [itemPrices, setItemPrices] = useState<ItemPrices>({

    fragmentOfTheHydra: 0,
    fragmentOfTheChimera: 0,
    fragmentOfThePhoenix: 0,
    fragmentOfTheMinotaur: 0,
    fragmentOfKnowledge: 0,
    fragmentOfShape: 0,
    dyingSun: 0,
    orbOfDominance: 0,
  

  });

  const rewardValues: ItemPrices = {
 
    fragmentOfTheHydra: 0,
    fragmentOfTheChimera: 0,
    fragmentOfThePhoenix: 0,
    fragmentOfTheMinotaur: 0,
    fragmentOfKnowledge: 0.5,
    fragmentOfShape: 0.5,
    dyingSun: 0.01,
    orbOfDominance: 0.025



    
 

  };

  useEffect(() => {
    const itemsToFetch = [
   
      { itemName: "Fragment of the Hydra", stateKey: "fragmentOfTheHydra" },
      { itemName: "Fragment of the Chimera", stateKey: "fragmentOfTheChimera" },
      { itemName: "Fragment of the Phoenix", stateKey: "fragmentOfThePhoenix" },
      { itemName: "Fragment of the Minotaur", stateKey: "fragmentOfTheMinotaur" },

      { itemName: "Fragment of Knowledge", stateKey: "fragmentOfKnowledge" },
      { itemName: "Fragment of Shape", stateKey: "fragmentOfShape" },
      { itemName: "Dying Sun", stateKey: "dyingSun" },
      { itemName: "Orb of Dominance", stateKey: "orbOfDominance" },
   

   
      
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
    const pricePerRun = itemPrices.fragmentOfTheChimera + itemPrices.fragmentOfTheHydra + itemPrices.fragmentOfTheMinotaur + itemPrices.fragmentOfThePhoenix
    const rewardPerRun = itemPrices.fragmentOfKnowledge * rewardValues.fragmentOfKnowledge + 
    itemPrices.fragmentOfShape * rewardValues.fragmentOfShape +
    itemPrices.dyingSun * rewardValues.dyingSun +
    itemPrices.orbOfDominance * rewardValues.orbOfDominance


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
      <div className="centered-text">Shaper</div>
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

export default Shaper;
