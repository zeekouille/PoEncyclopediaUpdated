import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useData } from "../dataContext";
import "./bossProfitStyles.css"; // Assurez-vous d'importer votre fichier CSS

interface ItemIcons {
  decayingFragment: string;
  callOfTheVoid: string;
  theDevourerOfMinds: string;
  soulAscension: string;
  theEternityShroud: string;
  voidforge: string;
  sublimeVision: string;
  impresence: string;
  decayingReliquaryKey: string;
  curioOfDecay: string;
  watchersEye: string;
  orbOfDominance: string;
  theGulf: string;

  
  
}

interface ItemPrices {

  decayingFragment: number,
  callOfTheVoid: number,
  theDevourerOfMinds: number,
  soulAscension: number,
  theEternityShroud: number,
  voidforge: number,
  sublimeVision: number,
  impresence: number,
  decayingReliquaryKey: number,
  curioOfDecay: number,
  watchersEye: number,
  orbOfDominance: number,
  theGulf: number,


}

const UberUberElder = () => {
  const { data } = useData();

  const [itemIcons, setItemIcons] = useState<ItemIcons>({
 
    decayingFragment: "",
    callOfTheVoid: "",
    theDevourerOfMinds: "",
    soulAscension: "",
    theEternityShroud: "",
    voidforge: "",
    sublimeVision: "",
    impresence: "",
    decayingReliquaryKey: "",
    curioOfDecay: "",
    watchersEye: "",
    orbOfDominance: "",
    theGulf: "",



  });

  const [itemPrices, setItemPrices] = useState<ItemPrices>({

    decayingFragment: 0,
    callOfTheVoid: 0,
    theDevourerOfMinds: 0,
    soulAscension: 0,
    theEternityShroud: 0,
    voidforge: 0,
    sublimeVision: 0,
    impresence: 0,
    decayingReliquaryKey: 0,
    curioOfDecay: 0,
    watchersEye: 0,
    orbOfDominance: 0,
    theGulf: 0,


  });

  const rewardValues: ItemPrices = {
 
    decayingFragment: 0,
    callOfTheVoid: 0.5,
    theDevourerOfMinds: 0.3,
    soulAscension: 0.1,
    theEternityShroud: 0.09,
    voidforge: 0.01,
    sublimeVision: 0.02,
    impresence: 0.06,
    decayingReliquaryKey: 0.015,
    curioOfDecay: 0.05,
    watchersEye: 0.35,
    orbOfDominance: 0.05,
    theGulf: 0.04,


  };

  useEffect(() => {
    const itemsToFetch = [
   
      { itemName: "Decaying Fragment", stateKey: "decayingFragment" },
      { itemName: "Call of the Void", stateKey: "callOfTheVoid" },
      { itemName: "The Devourer of Minds", stateKey: "theDevourerOfMinds" },
      { itemName: "Soul Ascension", stateKey: "soulAscension" },
      { itemName: "The Eternity Shroud", stateKey: "theEternityShroud" },
      { itemName: "Voidforge", stateKey: "voidforge" },
      { itemName: "Sublime Vision", stateKey: "sublimeVision" },
      { itemName: "Impresence", stateKey: "impresence" },
      { itemName: "Decaying Reliquary Key", stateKey: "decayingReliquaryKey" },
      { itemName: "Curio of Decay", stateKey: "curioOfDecay" },
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
itemPrices.decayingFragment * 5
    const rewardPerRun =
itemPrices.callOfTheVoid * rewardValues.callOfTheVoid +
itemPrices.curioOfDecay * rewardValues.curioOfDecay +
itemPrices.decayingReliquaryKey * rewardValues.decayingFragment +
itemPrices.impresence * rewardValues.impresence +
itemPrices.orbOfDominance * rewardValues.orbOfDominance +
itemPrices.soulAscension * rewardValues.soulAscension +
itemPrices.sublimeVision * rewardValues.sublimeVision +
itemPrices.theDevourerOfMinds * rewardValues.theDevourerOfMinds +
itemPrices.theEternityShroud * rewardValues.theEternityShroud +
itemPrices.theGulf * rewardValues.theGulf +
itemPrices.voidforge * rewardValues.voidforge +
rewardValues.watchersEye * rewardValues.watchersEye
     

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
      <div className="centered-text">Uber Uber Elder</div>
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

export default UberUberElder;
