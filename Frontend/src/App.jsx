import React from 'react';
import { BrowserRouter as Router, Routes,Route, BrowserRouter } from 'react-router-dom';
import Main from './Main';
import Admin from './components/admin/Admin'; 
import TermsandConditions from './components/policies/TermsandConditions';
import ServicePricing from './components/policies/ServicePricing';
import PrivacyPolicy from './components/policies/Privacypolicy';
import CancellationandRefundPolicy from './components/policies/CancelandRefund';
import DanceTeam from "./components/teamspages/DanceTeam";
import DramaTeam from "./components/teamspages/DramaTeam";
import MusicTeam from "./components/teamspages/MusicTeam";
import PhotographyTeam from "./components/teamspages/PhotographyTeam";
import ContentTeam from "./components/teamspages/ContentTeam";
import DesignTeam from "./components/teamspages/Art-DecoTeam";
import MainPage from './components/yuvarang/MainPage';
 
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/adminverification" element={<Admin />} />
          <Route
            exact
            path="/terms-and-conditions"
            element={<TermsandConditions />}
          />
          <Route exact path="/service-pricing" element={<ServicePricing />} />
          <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            exact
            path="/cancellation-and-refund-policy"
            element={<CancellationandRefundPolicy />}
          />
          <Route exact path="/dance-team" element={<DanceTeam/>} />
          <Route exact path="/drama-team" element={<DramaTeam/>} />
          <Route exact path="/music-team" element={<MusicTeam/>} />
          <Route exact path="/photography-editing-team" element={<PhotographyTeam/>} />
          <Route exact path="/content-team" element={<ContentTeam/>} />
          <Route exact path="/art-deco-team" element={<DesignTeam/>} />
          {/* <Route exact path="/yuvarang2024" element={<MainPage />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
