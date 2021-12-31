import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState } from 'react';

import CustomerLogin from './components/Customer/CustomerLogin';
import CustomerRegister from './components/Customer/CustomerRegister';
import Header from './components/Header/Header';
function App() {
  const [adm,setCust] = useState();

  return (
    <div className="App">
      <Router>
      <Header setCust={setCust} /><br/>

        <Switch>
        <Route exact path='/'></Route>
          <Route path="/customerregister">
            <CustomerRegister setCust={setCust} />
          </Route>
          <Route path="/customerlogin">
            <CustomerLogin setCust={setCust}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
