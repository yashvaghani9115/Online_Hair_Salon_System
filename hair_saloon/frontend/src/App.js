import '../node_modules/jquery/src/jquery';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

import CustomerLogin from './components/Customer/CustomerLogin';
import CustomerRegister from './components/Customer/CustomerRegister';
import Header from './components/Header/Header';
import OwnerLogin from './components/Owner/OwnerLogin';
import Ownerhome from './components/Owner/OwnerHome';
import OwnerRegister from './components/Owner/OwnerRegister';
import ShopRegister from './components/Owner/ShopRegister';
import OwnerService from './components/Owner/service/OwnerService';
import AdminLogin from './components/Admin/adminLogin';
import AdminPage from './components/Admin/adminPage';
import VerificationPage from './components/Owner/VerificationPage';
import ListSalons from './components/Customer/ListSalons';
import OwnerHome from './components/Owner/OwnerHome';
import Barbermanagement from './components/Owner/BarberManagement';
import OwnerHeader from './components/Owner/OwnerHeader';
import BookSalon from './components/Customer/BookSalon/BookSalon';
import OwnerService from './components/Owner/service/OwnerService';
import AddService from './components/Owner/service/AddService';
import { ProtectedRouteAdmin, ProtectedRouteCust, ProtectedRouteOwner } from './components/Auth/protected';
import NotFound from './components/NotFound/notfound';

function App() {
  const [adm, setCust] = useState();

  return (
    <div className="App">
      <Router>
        <Header setCust={setCust} />
        <Switch>

          <Route exact path='/'><ListSalons /></Route>
          {/* Admin */}
          <Route path="/adminlogin" component={() => { return <AdminLogin setCust={setCust} /> }} />
          <ProtectedRouteAdmin path="/adminpage" component={AdminPage} />
          {/* Owner */}

          <Route path="/ownerlogin" component={() => { return <OwnerLogin setCust={setCust} /> }} />
          <Route path="/ownerregister" component={() => { return <OwnerRegister setCust={setCust} /> }} />
          <ProtectedRouteOwner path="/shopregister" component={ShopRegister} />
          <ProtectedRouteOwner path="/verification" component={() => { return <VerificationPage setCust={setCust} /> }} />
          <ProtectedRouteOwner path="/ownerHome" component={OwnerHome} />
          <ProtectedRouteOwner path="/barbermanagement" component={Barbermanagement} />
          <ProtectedRouteOwner path="/ownerHeader" component={OwnerHeader} />
          <ProtectedRouteOwner path="/ownerService" component={OwnerService} />
          <ProtectedRouteOwner path="/addService" component={AddService} />

          {/* Customer */}
          <Route path="/customerregister" component={() => { return <CustomerRegister setCust={setCust} /> }} />
          <Route path="/customerlogin" component={CustomerLogin} />
          <ProtectedRouteCust path="/booksalon" component={BookSalon} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
      {/* <Footer/> */}
    </div>

  );
}

export default App;
