import '../node_modules/jquery/src/jquery';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

import CustomerLogin from './components/Customer/Authentication/CustomerLogin';
import CustomerRegister from './components/Customer/Authentication/CustomerRegister';
import Header from './components/Header/Header';
import OwnerLogin from './components/Owner/Authentication/OwnerLogin';
import OwnerRegister from './components/Owner/Authentication/OwnerRegister';
import ShopRegister from './components/Owner/Authentication/ShopRegister';
import OwnerService from './components/Owner/service/OwnerService';
import AdminLogin from './components/Admin/adminLogin';
import AdminPage from './components/Admin/adminPage';
import VerificationPage from './components/Owner/Authentication/VerificationPage';
import VerificationRejected from './components/Owner/Authentication/VerificationRejected';
import ListSalons from './components/Customer/Home/ListSalons';
import OwnerHome from './components/Owner/Home/OwnerHome';
import Barbermanagement from './components/Owner/Barber/BarberManagement';
import OwnerHeader from './components/Owner/Authentication/OwnerHeader';
import BookSalon from './components/Customer/BookSalon/BookSalon';
import { ProtectedRouteAdmin, ProtectedRouteCust, ProtectedRouteOwner } from './components/Auth/protected';
import NotFound from './components/NotFound/notfound';
import CustomerOrders from './components/Customer/Orders/orders';
import EditShop from './components/Owner/EditShop/EditShop';

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
          <ProtectedRouteOwner path="/editShop" component={EditShop} />
          <ProtectedRouteOwner path="/verification" component={() => { return <VerificationPage  /> }} />
          <ProtectedRouteOwner path="/verificationReject" component={() => { return <VerificationRejected  /> }} />
          <ProtectedRouteOwner path="/ownerHome" component={OwnerHome} />
          <ProtectedRouteOwner path="/barbermanagement" component={Barbermanagement} />
          <ProtectedRouteOwner path="/ownerHeader" component={OwnerHeader} />
          <ProtectedRouteOwner path="/ownerService" component={OwnerService} />

          {/* Customer */}
          <Route path="/customerregister" component={() => { return <CustomerRegister setLogin={setLogin} /> }} />
          <Route path="/customerlogin"  component={()=>{return <CustomerLogin setLogin={setLogin} />}} />
          <ProtectedRouteCust path="/booksalon" component={BookSalon} />
          <ProtectedRouteCust path="/orders" component={CustomerOrders} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
      {/* <Footer/> */}
    </div>

  );
}

export default App;
