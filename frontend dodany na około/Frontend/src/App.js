import React from 'react'
import logo from './logo.svg';
import './App.css';

import {Home} from './Home';
import {Cars} from './Cars';
import { Customer } from './Profil/Customer';
import { Worker } from './Profil/Worker';
import {Navigation} from './Navigation';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
     <h3 className="m-3 d-flex justify-content-center">
       Rent Car
     </h3>

     <Navigation/>

     <Switch>
       <Route path='/' component={Home} exact/>
       <Route path='/Cars' component={Cars}/>
       <Route path='/Profil/Customer' component={Customer}/>
       <Route path='/Profil/Worker' component={Worker}/>
     </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
