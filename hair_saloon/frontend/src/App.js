import '../node_modules/jquery/src/jquery';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

import CustomerLogin from './components/Customer/CustomerLogin';
import CustomerRegister from './components/Customer/CustomerRegister';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import OwnerLogin from './components/Owner/OwnerLogin';
import OwnerRegister from './components/Owner/OwnerRegister';
import ShopRegister from './components/Owner/ShopRegister';
import AdminLogin from './components/Admin/adminLogin';
import AdminPage from './components/Admin/adminPage';
import VerificationPage from './components/Owner/VerificationPage';
import Footer from './components/Footer/footer';
import ListSalons from './components/Customer/ListSalons';
import OwnerHome from './components/Owner/OwnerHome';
import Barbermanagement from './components/Owner/BarberManagement';
import OwnerHeader from './components/Owner/OwnerHeader';
import BookSalon from './components/Customer/BookSalon/BookSalon';
import OwnerService from './components/Owner/service/OwnerService';
import AddService from './components/Owner/service/AddService';

function App() {
  const [adm,setCust] = useState();

  return (
    <div className="App">
      <Router>
      <Header setCust={setCust} />
        <Switch>
        <Route exact path='/'><ListSalons /></Route>
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
          <Route path="/adminlogin">
            <AdminLogin setCust={setCust}/>
          </Route>
          <Route path="/adminpage">
            <AdminPage setCust={setCust}/>
          </Route>
          <Route path="/verification">
            <VerificationPage setCust={setCust}/>
          </Route>
          <Route path="/ownerHome">
            <OwnerHome/>
          </Route>
          <Route path="/barbermanagement">
            <Barbermanagement/>
          </Route>
          <Route path="/ownerHeader">
            <OwnerHeader/>
          </Route>
          <Route path="/booksalon">
            <BookSalon/>
          </Route>
          <Route path="/ownerService">
            <OwnerService/>
          </Route>
          <Route path="/addService">
            <AddService/>
          </Route>
        </Switch>
      </Router>
      {/* <Footer/> */}
    </div>
  
  );
}

export default App;
