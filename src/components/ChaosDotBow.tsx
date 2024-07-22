import React, { useState, useEffect } from "react";
import { useData } from './dataContext';
import Layout from "./Layout";
import { Container, Row, Col, Table, Button, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Step1 from "../image/crafting/chaosDotBow/Step1.png";
import Step2 from "../image/crafting/chaosDotBow/Step2.png";
import Step3 from "../image/crafting/chaosDotBow/Step3.png";
import Step5 from "../image/crafting/chaosDotBow/Step5.png";
import Step6 from "../image/crafting/chaosDotBow/Step6.png";
import './ChaosDotBow.css'; // Assurez-vous d'importer votre fichier CSS

const ChaosDotBow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [itemPrices, setItemPrices] = useState<{ [itemName: string]: number | null }>({
    "Hunter's Exalted Orb": null,
    "Divine Orb": null,
    "Orb of Alteration": null,
    "Regal Orb": null,
    "Orb of Scouring": null,
    "Orb of Annulment": null,
    // Ajoutez d'autres items ici au besoin
  });
  const { data } = useData(); // Utilisation du hook useData pour accéder aux données

  useEffect(() => {
    if (!data) return;

    const itemNames = [
      "Hunter's Exalted Orb",
      "Divine Orb",
      "Orb of Alteration",
      "Regal Orb",
      "Orb of Scouring",
      "Orb of Annulment",
      // Ajoutez d'autres items ici au besoin
    ];

    const getPricesForItems = async () => {
      const pricesMap: { [itemName: string]: number | null } = {};

      await Promise.all(
        itemNames.map(async (itemName) => {
          const item = data.find((item: any) => item.name === itemName);
          pricesMap[itemName] = item ? item.mean : null;
        })
      );

      setItemPrices(pricesMap);
    };

    getPricesForItems();
  }, [data]);

  const nextStep = () => setCurrentStep(currentStep + 1);
  const previousStep = () => setCurrentStep(currentStep - 1);

  return (
    <Layout>
      <Container className="content-container mt-4">
        <h1 className="d-flex justify-content-center mb-4">Chaos Dot Bow</h1>

        {currentStep === 1 && (
          <div>
            <h2 className="d-flex justify-content-center">Étape 1</h2>
            <p className="d-flex justify-content-center">What will you need ?</p>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Amount</th>
                  <th>Price per</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>6 link Maraketh Bow iLVL92</td>
                  <td>
                    <a
                      href="https://www.pathofexile.com/trade/search/Necropolis/EZDJdRzH5w"
                      rel="noreferrer"
                      target="_blank"
                      className="sub-link"
                    >
                      PoE trade link
                    </a>
                  </td>
                  <td>0</td>
                </tr>
                {itemPrices["Hunter's Exalted Orb"] !== null && (
                  <tr>
                    <td>1 Hunter's Exalted Orb</td>
                    <td>
                      <a
                        href="https://www.pathofexile.com/trade/exchange/Necropolis/j94oKzoIX"
                        rel="noreferrer"
                        target="_blank"
                        className="sub-link"
                      >
                        PoE trade link
                      </a>
                    </td>
                    <td>{itemPrices["Hunter's Exalted Orb"]}</td>
                  </tr>
                )}
                {itemPrices["Divine Orb"] !== null && (
                  <tr>
                    <td>5 Divine Orbs</td>
                    <td>
                      <a
                        href="https://www.pathofexile.com/trade/exchange/Necropolis/9z28fK"
                        rel="noreferrer"
                        target="_blank"
                        className="sub-link"
                      >
                        PoE trade link
                      </a>
                    </td>
                    <td>{itemPrices["Divine Orb"]}</td>
                  </tr>
                )}
                {itemPrices["Orb of Alteration"] !== null && (
                  <tr>
                    <td>Orb Of Alteration</td>
                    <td>
                      <a
                        href="https://www.pathofexile.com/trade/exchange/Necropolis/YOWQWXvfY"
                        rel="noreferrer"
                        target="_blank"
                        className="sub-link"
                      >
                        PoE trade link
                      </a>
                    </td>
                    <td>{itemPrices["Orb of Alteration"]}</td>
                  </tr>
                )}
                {itemPrices["Regal Orb"] !== null && (
                  <tr>
                    <td>Regal Orb</td>
                    <td>
                      <a
                        href="https://www.pathofexile.com/trade/exchange/Necropolis/ZBjaG3RHQ"
                        rel="noreferrer"
                        target="_blank"
                        className="sub-link"
                      >
                        PoE trade link
                      </a>
                    </td>
                    <td>{itemPrices["Regal Orb"]}</td>
                  </tr>
                )}
                {itemPrices["Orb of Scouring"] !== null && (
                  <tr>
                    <td>Orb Of Scouring</td>
                    <td>
                      <a
                        href="https://www.pathofexile.com/trade/exchange/Necropolis/ZBjaG3RHQ"
                        rel="noreferrer"
                        target="_blank"
                        className="sub-link"
                      >
                        PoE trade link
                      </a>
                    </td>
                    <td>{itemPrices["Orb of Scouring"]}</td>
                  </tr>
                )}
                {itemPrices["Orb of Annulment"] !== null && (
                  <tr>
                    <td>Orb of Annulment</td>
                    <td>
                      <a
                        href="https://www.pathofexile.com/trade/exchange/Necropolis/jedLr7dTX"
                        rel="noreferrer"
                        target="_blank"
                        className="sub-link"
                      >
                        PoE trade link
                      </a>
                    </td>
                    <td>{itemPrices["Orb of Annulment"]}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="d-flex justify-content-center">Étape 2</h2>
            <p className="d-flex justify-content-center">
              Spam alterations + augment for T1 Damage Over Time Multiplier :
              Avg 257 alt / 55 augments
            </p>
            <Image className="w-50 mx-auto d-block" src={Step1} alt="Crafting image" fluid />
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="d-flex justify-content-center">Étape 3</h2>
            <p className="d-flex justify-content-center">Regal</p>
            <Image className="w-50 mx-auto d-block" src={Step2} alt="Crafting image" fluid />
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h2 className="d-flex justify-content-center">Étape 4</h2>
            <p className="d-flex justify-content-center">Annul until T1 DoT is isolated</p>
            <p className="d-flex justify-content-center">If you brick T1 dot, back to alt spam</p>
            <Image className="w-50 mx-auto d-block" src={Step3} alt="Crafting image" fluid />
          </div>
        )}

        {currentStep === 5 && (
          <div>
            <h2 className="d-flex justify-content-center">Étape 5</h2>
            <p className="d-flex justify-content-center">Multimod + cannot roll attack mods</p>
            <p className="d-flex justify-content-center">Exalt slam for +1 socketed gems</p>
            <p className="d-flex justify-content-center">Hunter slam for chaos dot guaranteed</p>
            <Image className="w-50 mx-auto d-block" src={Step5} alt="Crafting image" fluid />
          </div>
        )}

        {currentStep === 6 && (
          <div>
            <h2 className="d-flex justify-content-center">Étape 6</h2>
            <p className="d-flex justify-content-center">Remove multimod</p>
            <p className="d-flex justify-content-center">Craft +2 to Level of Socketed Support Gems</p>
            <p className="d-flex justify-content-center">Craft Chaos damage over time multiplier</p>
            <Image className="w-50 mx-auto d-block" src={Step6} alt="Crafting image" fluid />
          </div>
        )}

        <div className="content-bottom-padding"></div>
      </Container>
      <StepNavigation
        currentStep={currentStep}
        nextStep={nextStep}
        previousStep={previousStep}
      />
    </Layout>
  );
};

const StepNavigation: React.FC<{ currentStep: number; nextStep: () => void; previousStep: () => void }> = ({ currentStep, nextStep, previousStep }) => {
  return (
    <div className="step-navigation">
      <Button
        onClick={previousStep}
        variant="secondary"
        disabled={currentStep === 1}
      >
        Précédent
      </Button>
      <Button
        onClick={nextStep}
        variant="primary"
        className="ms-2"
        disabled={currentStep === 6}
      >
        Suivant
      </Button>
    </div>
  );
};

export default ChaosDotBow;
