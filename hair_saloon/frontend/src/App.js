import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

import CustomerLogin from './components/Customer/CustomerLogin';
import CustomerRegister from './components/Customer/CustomerRegister';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
function App() {
  const [adm,setCust] = useState();

  return (
    <div className="App container">
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
        </Switch>
      </Router>
    </div>
    // <Router>
    // <div className="App">
    //   <nav className="navbar navbar-expand-lg navbar-light ">
    //     <div className="container bg-dark">
    //       <Link className="navbar-brand text-white" >Hair Saloon</Link>
    //       <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
    //         <ul className="navbar-nav ml-auto">
    //           <li className="nav-item">
    //             <Link className="nav-link text-white" to={"/sign-in"}>Login</Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link className="nav-link text-white" to={"/sign-up"}>Sign up</Link>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </nav>

    //   <div className="auth-wrapper">
    //     <div className="auth-inner">
    //       <Switch>
    //         <Route exact path='/' component={CustomerLogin} />
    //         <Route path="/sign-in" component={CustomerLogin} />
    //         <Route path="/sign-up" component={CustomerRegister} />
    //       </Switch>
    //     </div>
    //   </div>
    // </div></Router>
  );
}

export default App;
