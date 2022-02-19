import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Head from './component/head';
import CovidMaps from './component/covid19Maps';
import Landing from './component/landing';
import GlobalChart from './component/globalChart';
import CountryTable from './component/homeTable';
import CountryDetails from './component/countryDetails'
import Vaccine from './component/vaccine';
import AllCountryTable from './component/countryTable';
function App() {
  return (
    <BrowserRouter>
      <Head/>
      <Switch>
        <Route path='/' exact>
          <div>
            <Landing/>
            <div className="container global">
              <h4 className='title'>Coronavirus World Maps</h4>
              <CovidMaps/>
              <h4 className="title">Global Data Chart Of COVID-19 </h4>
              <GlobalChart/>
              <CountryTable/>
            </div>
          </div>
        </Route>
        <Route path='/country/:code' component={CountryDetails}/>
        <Route path='/vaccine' component={Vaccine}/>
        <Route path='/countries' component={AllCountryTable}/>
        <Route>
        <div className='country-offline'>
                <h1 className='font-offline'>4<span className='font-offline'><i className="fas fa-ghost"></i></span>4</h1>
                <h2 className='font-offline'>Error: 404 page not found</h2>
                <p className='font-offline'>Sorry, the page you're looking for cannot be accessed</p>
            </div>
        </Route>
      </Switch>
      <footer className="footer-copyright">
          <div className="container"><p className='center white-text'>Covid-19 PWA Vikram ©2021</p></div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
