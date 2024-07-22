import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useData } from "../dataContext";
import "./bossProfitStyles.css"; // Assurez-vous d'importer votre fichier CSS

interface ItemIcons {
  fragmentOfKnowledge: string;
  fragmentOfTerror: string;
  fragmentOfShape: string;
  fragmentOfEmptiness: string;
  indigon: string;
  watchersEye: string;
  orbOfDominance: string;
  theGulf: string;
}

interface ItemPrices {

  fragmentOfKnowledge: number,
  fragmentOfShape: number,
  fragmentOfTerror: number,
  fragmentOfEmptiness: number,
  indigon: number,
  watchersEye: number,
  orbOfDominance: number,
  theGulf: number,



}

const UberElder = () => {
  const { data } = useData();

  const [itemIcons, setItemIcons] = useState<ItemIcons>({
 
    fragmentOfKnowledge: "",
    fragmentOfShape: "",
    fragmentOfTerror: "",
    fragmentOfEmptiness: "",
    indigon: "",
    watchersEye: "",
    orbOfDominance: "",
    theGulf: "",


  });

  const [itemPrices, setItemPrices] = useState<ItemPrices>({

    fragmentOfKnowledge: 0,
    fragmentOfShape: 0,
    fragmentOfTerror: 0,
    fragmentOfEmptiness: 0,
    indigon: 0,
    watchersEye: 0,
    orbOfDominance: 0,
    theGulf: 0,




  });

  const rewardValues: ItemPrices = {
 
    fragmentOfKnowledge: 0,
    fragmentOfShape: 0,
    fragmentOfTerror: 0,
    fragmentOfEmptiness: 0,
    indigon: 0.04,
    watchersEye: 0.35,
    orbOfDominance: 0.05,
    theGulf: 0.04,
  };

  useEffect(() => {
    const itemsToFetch = [
   
      { itemName: "Fragment of Knowledge", stateKey: "fragmentOfKnowledge" },
      { itemName: "Fragment of Shape", stateKey: "fragmentOfShape" },
      { itemName: "Fragment of Terror", stateKey: "fragmentOfTerror" },
      { itemName: "Fragment of Emptiness", stateKey: "fragmentOfEmptiness" },
      { itemName: "Indigon", stateKey: "indigon" },
      { itemName: "Watcher's Eye", stateKey: "watchersEye" },
      { itemName: "Orb of Dominance", stateKey: "orbOfDominance" },
      { itemName: "The Gulf", stateKey: "theGulf" },


   
      
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
itemPrices.fragmentOfEmptiness + itemPrices.fragmentOfKnowledge + itemPrices.fragmentOfShape + itemPrices.fragmentOfTerror
    const rewardPerRun =
itemPrices.indigon * rewardValues.indigon +
itemPrices.orbOfDominance * rewardValues.orbOfDominance +
itemPrices.theGulf * rewardValues.theGulf +
itemPrices.watchersEye * rewardValues.watchersEye
     

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
      <div className="centered-text">Uber Elder</div>
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

export default UberElder;
