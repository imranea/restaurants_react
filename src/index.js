import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Provider from "./store/store"
import App from './App';
import NotFound from "./components/NotFound/NotFound"
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Switch,Route} from "react-router-dom"

const Root = () =>(
  <Router>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>
)


ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <Root/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
