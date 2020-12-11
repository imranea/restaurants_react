import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from "react-redux"
import store from "./configureStore"
import App from './App';
import LoginPage from "./components/LoginPage/LoginPage"
import Profil from "./components/Admin/Profil"
import UpdateProfil from "../src/components/Admin/UpdateProfil"
import RestaurantAdmin from "./components/Admin/RestaurantAdmin"
import UpdateRestaurant from "./components/Admin/UpdateRestaurant"
import NotFound from "./components/NotFound/NotFound"
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Switch,Route} from "react-router-dom"

const Root = () =>(
  <Router>
    <Switch>
      <Route exact path="/" component={LoginPage}/>
      <Route path="/map" component={App}/>
      <Route path="/profile" component={Profil}/>
      <Route path="/updateProfile" component={UpdateProfil}/>
      <Route path="/addRestaurant" component={RestaurantAdmin}/>
      <Route path="/updateRestaurant/:id" component={UpdateRestaurant}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>
)


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
