import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

import CustomerLogin from './components/Customer/CustomerLogin';
import CustomerRegister from './components/Customer/CustomerRegister';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import OwnerLogin from './components/Owner/OwnerLogin';
import OwnerRegister from './components/Owner/OwnerRegister';
import ShopRegister from './components/Owner/ShopRegister';
function App() {
  const [adm,setCust] = useState();

  return (
    <div className="App">
      <Router>
      <Header setCust={setCust} /><br/>

        <Switch>
        <Route exact path='/'><Home/></Route>
          <Route path="/customerregister">
            <CustomerRegister setCust={setCust} />
          </Route>
          <Route path="/customerlogin">
            <CustomerLogin setCust={setCust}/>
          </Route>
          <Route path="/ownerlogin">
            <OwnerLogin setCust={setCust}/>
          </Route>
          <Route path="/ownerregister">
            <OwnerRegister setCust={setCust}/>
          </Route>
          <Route path="/shopregister">
            <ShopRegister />
          </Route>
        </Switch>
      </Router>
    </div>
  
  );
}

export default App;
