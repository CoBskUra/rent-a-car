import React from 'react'
import logo from './logo.svg';
import './App.css';

import {Home} from './Home';
import {Cars} from './Cars';
import {CarDetalis} from './CarDetalis';
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
       <Route path='/' component={CarDetalis}/>
     </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
