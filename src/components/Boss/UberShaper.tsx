import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useData } from "../dataContext";
import "./bossProfitStyles.css"; // Assurez-vous d'importer votre fichier CSS

interface ItemIcons {
  cosmicFragment: string;
  echoesOfCreation: string;
  theTidesOfTime: string;
  entropicDevastation:string;
  starforge: string;
  cosmicReliquaryKey: string;
  fragmentOfKnowledge: string;
  fragmentOfShape: string;
  orbOfDominance: string
 

}

interface ItemPrices {

  
  cosmicFragment: number;
  echoesOfCreation: number;
  theTidesOfTime: number;
  entropicDevastation:number;
  starforge: number;
  cosmicReliquaryKey: number;
  fragmentOfKnowledge: number;
  fragmentOfShape: number;
  orbOfDominance: number
 

}

const UberShaper = () => {
  const { data } = useData();

  const [itemIcons, setItemIcons] = useState<ItemIcons>({
 
    cosmicFragment: "",
    echoesOfCreation: "",
    theTidesOfTime: "",
    entropicDevastation: "",
    starforge: "",
    cosmicReliquaryKey: "",
    fragmentOfKnowledge: "",
    fragmentOfShape: "",
    orbOfDominance: "",
   
  });

  const [itemPrices, setItemPrices] = useState<ItemPrices>({

    cosmicFragment: 0,
    echoesOfCreation: 0,
    theTidesOfTime: 0,
    entropicDevastation: 0,
    starforge: 0,
    cosmicReliquaryKey: 0,
    fragmentOfKnowledge: 0,
    fragmentOfShape: 0,
    orbOfDominance: 0,
  

  });

  const rewardValues: ItemPrices = {
 
    cosmicFragment: 0,
    echoesOfCreation: 0.5,
    theTidesOfTime: 0.35,
    entropicDevastation: 0.14,
    starforge: 0.005,
    cosmicReliquaryKey: 0.015,
    fragmentOfKnowledge: 0.5,
    fragmentOfShape: 0.5,
    orbOfDominance: 0.025






    
 

  };

  useEffect(() => {
    const itemsToFetch = [
   
      { itemName: "Cosmic Fragment", stateKey: "cosmicFragment" },
      { itemName: "Echoes of Creation", stateKey: "echoesOfCreation" },
      { itemName: "The Tides of Time", stateKey: "theTidesOfTime" },
      { itemName: "Entropic Devastation", stateKey: "entropicDevastation" },
      { itemName: "Starforge", stateKey: "starforge" },
      { itemName: "Cosmic Reliquary Key", stateKey: "cosmicReliquaryKey" },
      { itemName: "Fragment of Knowledge", stateKey: "fragmentOfKnowledge" },
      { itemName: "Fragment of Shape", stateKey: "fragmentOfShape" },
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
    const pricePerRun =
    itemPrices.cosmicFragment * 5

    const rewardPerRun = 
    itemPrices.cosmicReliquaryKey * rewardValues.cosmicReliquaryKey +
    itemPrices.echoesOfCreation * rewardValues.echoesOfCreation +
    itemPrices.entropicDevastation * rewardValues.entropicDevastation +
    itemPrices.fragmentOfKnowledge * rewardValues.fragmentOfKnowledge +
    itemPrices.fragmentOfShape * rewardValues.fragmentOfShape +
    itemPrices.orbOfDominance * rewardValues.orbOfDominance +
    itemPrices.starforge * rewardValues.starforge +
    itemPrices.theTidesOfTime * rewardValues.theTidesOfTime

     

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
      <div className="centered-text">Uber Shaper</div>
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

export default UberShaper;
