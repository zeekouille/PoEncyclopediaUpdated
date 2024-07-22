import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useData } from "../dataContext";
import "./bossProfitStyles.css"; // Assurez-vous d'importer votre fichier CSS

interface ItemIcons {
  realityFragment: string;
  viridisVeil: string;
  progenesis: string;
  curioOfPotential: string;
  shinyReliquaryKey: string;
  orbOfConflict: string;
}

interface ItemPrices {
  realityFragment: number;
  viridisVeil: number;
  progenesis: number;
  curioOfPotential: number;
  shinyReliquaryKey: number;
  orbOfConflict: number;
}

const UberMaven = () => {
  const { data } = useData();

  const [itemIcons, setItemIcons] = useState<ItemIcons>({
    realityFragment: "",
    viridisVeil: "",
    progenesis: "",
    curioOfPotential: "",
    shinyReliquaryKey: "",
    orbOfConflict: "",
  });

  const [itemPrices, setItemPrices] = useState<ItemPrices>({
    realityFragment: 0,
    viridisVeil: 0,
    progenesis: 0,
    curioOfPotential: 0,
    shinyReliquaryKey: 0,
    orbOfConflict: 0,
  });

  const rewardValues: ItemPrices = {
    realityFragment: 5,
    viridisVeil: 0.55,
    progenesis: 0.11,
    orbOfConflict: 0.35,
    shinyReliquaryKey: 0.015,
    curioOfPotential: 0.05,
  };

  useEffect(() => {
    const itemsToFetch = [
      { itemName: "Reality Fragment", stateKey: "realityFragment" },
      { itemName: "Viridi's Veil", stateKey: "viridisVeil" },
      { itemName: "Progenesis", stateKey: "progenesis" },
      { itemName: "Curio of Potential", stateKey: "curioOfPotential" },
      { itemName: "Shiny Reliquary Key", stateKey: "shinyReliquaryKey" },
      { itemName: "Orb of Conflict", stateKey: "orbOfConflict" },
      { itemName: "Chaos Orb", stateKey: "chaosOrb" },
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
      itemPrices.realityFragment * rewardValues.realityFragment;
    const rewardPerRun =
      itemPrices.viridisVeil * rewardValues.viridisVeil +
      itemPrices.progenesis * rewardValues.progenesis +
      itemPrices.orbOfConflict * rewardValues.orbOfConflict +
      itemPrices.shinyReliquaryKey * rewardValues.shinyReliquaryKey +
      itemPrices.curioOfPotential * rewardValues.curioOfPotential;

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
      <div className="centered-text">Uber Maven</div>
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

export default UberMaven;
