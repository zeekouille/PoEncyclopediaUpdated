import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom"; // Import HashRouter instead of BrowserRouter
import HomePage from "./components/HomePage";
import TestPage from "./components/TestPage";
import Barnav from "./components/Barnav"
import Bow from "./components/Bow";
import ChaosDotBow from "./components/ChaosDotBow";
import Bossprofit from "./components/Boss/Bossprofit";
import Shaper from "./components/Boss/Shaper";
import { DataProvider } from "./components/dataContext";
import ApiFetchedPrice from "./components/apiFetchedPrices";
import Maven from "./components/Boss/Maven";
import UberMaven from "./components/Boss/uberMaven";
import Sirus from "./components/Boss/Sirus";
import UberSirus from "./components/Boss/UberSirus";
import Elder from "./components/Boss/Elder";
import EaterOfWorlds from "./components/Boss/EaterOfWorlds";
import UberEaterOfWorlds from "./components/Boss/UberEaterOfWorlds";
import TheSearingExarch from "./components/Boss/TemplateBoss";
import UberShaper from "./components/Boss/UberShaper";
import UberElder from "./components/Boss/UberElder";
import UberUberElder from "./components/Boss/UberUberElder";
import UberTheSearingExarch from "./components/Boss/UberTheSearingExarch";


const App: React.FC = () => {
  return (
    <DataProvider>
      <Router>
        <Barnav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/bow" element={<Bow />} />
          <Route path="/bow/chaosdotbow" element={<ChaosDotBow />} />
          <Route path="/bossprofit" element={<Bossprofit />} />
          <Route path="/bossprofit/shaper" element={<Shaper />} />
          <Route path="/bossprofit/uberShaper" element={<UberShaper />} />
          <Route path="/bossprofit/maven" element={<Maven />} />
          <Route path="/apiFetchedPrice" element={<ApiFetchedPrice />} />
          <Route path="/bossprofit/uberMaven" element={<UberMaven />} />
          <Route path="/bossprofit/sirus" element={<Sirus />} />
          <Route path="/bossprofit/uberSirus" element={<UberSirus />} />
          <Route path="/bossprofit/elder" element={<Elder />} />
          <Route path="/bossprofit/eaterOfWorlds" element={<EaterOfWorlds />} />
          <Route path="/bossprofit/uberEaterOfWorlds" element={<UberEaterOfWorlds />} />
          <Route path="/bossprofit/theSearingExarch" element={<TheSearingExarch />} />
          <Route path="/bossprofit/uberElder" element={<UberElder />} />
          <Route path="/bossprofit/uberUberElder" element={<UberUberElder />} />
          <Route path="/bossprofit/uberTheSearingExarch" element={<UberTheSearingExarch />} />
        </Routes>
      </Router>
    </DataProvider>
  );
};

export default App;
