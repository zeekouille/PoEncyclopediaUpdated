import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useData } from "../dataContext";
import "./bossProfitStyles.css"; // Assurez-vous d'importer votre fichier CSS

interface ItemIcons {
  fragmentOfPurification: string;
  fragmentOfConstriction: string;
  fragmentOfEnslavement: string;
  fragmentOfEradication: string;
  fragmentOfTerror: string;
  fragmentOfEmptiness: string;
  orbOfDominance: string;
  blasphemersGrasp: string;
  cyclopeanCoil: string;
  nebuloch: string;
  hopeshredder: string;
  shimmeron: string;
  impresence: string;
  watchersEye: string;

}

interface ItemPrices {

  fragmentOfPurification: number,
  fragmentOfConstriction: number,
  fragmentOfEnslavement: number,
  fragmentOfEradication: number,
  fragmentOfTerror: number,
  fragmentOfEmptiness: number,
  orbOfDominance: number,
  blasphemersGrasp: number,
  cyclopeanCoil: number,
  nebuloch: number,
  hopeshredder: number,
  shimmeron: number,
  impresence: number,
  watchersEye: number,

}

const Elder = () => {
  const { data } = useData();

  const [itemIcons, setItemIcons] = useState<ItemIcons>({
 
    fragmentOfPurification: "",
    fragmentOfConstriction: "",
    fragmentOfEnslavement: "",
    fragmentOfEradication: "",
    fragmentOfTerror: "",
    fragmentOfEmptiness: "",
    orbOfDominance: "",
    blasphemersGrasp: "",
    cyclopeanCoil: "",
    nebuloch: "",
    hopeshredder: "",
    shimmeron: "",
    impresence: "",
    watchersEye: "",
   
  
  });

  const [itemPrices, setItemPrices] = useState<ItemPrices>({

    fragmentOfPurification: 0,
    fragmentOfConstriction: 0,
    fragmentOfEnslavement: 0,
    fragmentOfEradication: 0,
    fragmentOfTerror: 0,
    fragmentOfEmptiness: 0,
    orbOfDominance: 0,
    blasphemersGrasp: 0,
    cyclopeanCoil: 0,
    nebuloch: 0,
    hopeshredder: 0,
    shimmeron: 0,
    impresence: 0,
    watchersEye: 0,
  
  });

  const rewardValues: ItemPrices = {
 
    fragmentOfPurification: 0,
    fragmentOfConstriction: 0,
    fragmentOfEnslavement: 0,
    fragmentOfEradication: 0,
    fragmentOfTerror: 0.5,
    fragmentOfEmptiness: 0.5,
    orbOfDominance: 0.06,
    blasphemersGrasp: 0.25,
    cyclopeanCoil: 0.25,
    nebuloch: 0.1,
    hopeshredder: 0.1,
    shimmeron: 0.1,
    impresence: 0.20,
    watchersEye: 0.35,

  };

  useEffect(() => {
    const itemsToFetch = [
   
      { itemName: "Fragment of Purification", stateKey: "fragmentOfPurification" },
      { itemName: "Fragment of Constriction", stateKey: "fragmentOfConstriction" },
      { itemName: "Fragment of Enslavement", stateKey: "fragmentOfEnslavement" },
      { itemName: "Fragment of Eradication", stateKey: "fragmentOfEradication" },

      { itemName: "Fragment of Terror", stateKey: "fragmentOfTerror" },
      { itemName: "Fragment of Emptiness", stateKey: "fragmentOfEmptiness" },
      { itemName: "Orb of Dominance", stateKey: "orbOfDominance" },
      { itemName: "Blasphemer's Grasp", stateKey: "blasphemersGrasp" },
      { itemName: "Cyclopean Coil", stateKey: "cyclopeanCoil" },
      { itemName: "Nebuloch", stateKey: "nebuloch" },
      { itemName: "Hopeshredder", stateKey: "hopeshredder" },
      { itemName: "Shimmeron", stateKey: "shimmeron" },
      { itemName: "Impresence", stateKey: "impresence" },
      { itemName: "Watcher's Eye", stateKey: "watchersEye" },
 
      
    
      
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
      itemPrices.fragmentOfPurification +  itemPrices.fragmentOfConstriction +  itemPrices.fragmentOfEnslavement +  itemPrices.fragmentOfEradication
    const rewardPerRun = 
    itemPrices.fragmentOfTerror * rewardValues.fragmentOfTerror  + 
    itemPrices.fragmentOfEmptiness * rewardValues.fragmentOfEmptiness  + 
    itemPrices.orbOfDominance * rewardValues.orbOfDominance  + 
    itemPrices.blasphemersGrasp * rewardValues.blasphemersGrasp  + 
    itemPrices.cyclopeanCoil * rewardValues.cyclopeanCoil  + 
    itemPrices.nebuloch * rewardValues.nebuloch  + 
    itemPrices.hopeshredder * rewardValues.hopeshredder  + 
    itemPrices.shimmeron * rewardValues.shimmeron  + 
    itemPrices.impresence * rewardValues.impresence  + 
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
      <div className="centered-text">Elder</div>
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

export default Elder;
