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
import AddService from './components/Owner/service/AddService';
import { ProtectedRouteAdmin, ProtectedRouteCust, ProtectedRouteOwner } from './components/Auth/protected';
import NotFound from './components/NotFound/notfound';

function App() {
  const [login, setLogin] = useState(false);

  return (
    <div className="App">
      <Router>
        <Header setLogin={setLogin} />
        <Switch>

          <Route exact path='/'><ListSalons /></Route>
          {/* Admin */}
          <Route path="/adminlogin" component={() => { return <AdminLogin setLogin={setLogin} /> }} />
          <ProtectedRouteAdmin path="/adminpage" component={AdminPage} />
          {/* Owner */}

          <Route path="/ownerlogin" component={() => { return <OwnerLogin setLogin={setLogin} /> }} />
          <Route path="/ownerregister" component={() => { return <OwnerRegister setLogin={setLogin} /> }} />
          <ProtectedRouteOwner path="/shopregister" component={ShopRegister} />
          <ProtectedRouteOwner path="/verification" component={() => { return <VerificationPage  /> }} />
          <ProtectedRouteOwner path="/ownerHome" component={OwnerHome} />
          <ProtectedRouteOwner path="/barbermanagement" component={Barbermanagement} />
          <ProtectedRouteOwner path="/ownerHeader" component={OwnerHeader} />
          <ProtectedRouteOwner path="/ownerService" component={OwnerService} />
          <ProtectedRouteOwner path="/addService" component={AddService} />

          {/* Customer */}
          <Route path="/customerregister" component={() => { return <CustomerRegister setLogin={setLogin} /> }} />
          <Route path="/customerlogin"  component={()=>{return <CustomerLogin setLogin={setLogin} />}} />
          <ProtectedRouteCust path="/booksalon" component={BookSalon} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
      {/* <Footer/> */}
    </div>

  );
}

export default App;
