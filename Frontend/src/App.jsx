import React from 'react';
import { BrowserRouter as Router, Routes,Route, BrowserRouter } from 'react-router-dom';
import Main from './Main';
import Admin from './components/admin/Admin'; 
import TermsandConditions from './components/policies/TermsandConditions';
import ServicePricing from './components/policies/ServicePricing';
import PrivacyPolicy from './components/policies/Privacypolicy';
import CancellationandRefundPolicy from './components/policies/CancelandRefund';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element = {<Main/>}/>
          <Route exact path='/admin' element = {<Admin/>}/>
          <Route exact path='/terms-and-conditions' element = {<TermsandConditions/>}/>
          <Route exact path='/service-pricing' element = {<ServicePricing/>}/>
          <Route exact path='/privacy-policy' element = {<PrivacyPolicy/>}/>
          <Route exact path='/cancellation-and-refund-policy' element = {<CancellationandRefundPolicy/>}/>

        </Routes>
      </BrowserRouter>
    </>
  )
};

export default App;
