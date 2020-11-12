import logo from './logo.svg';
import {connect} from "react-redux"
import './App.css';
import { CLICK } from './store/action';

const App=({click,handleClick})=> {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {click}
        </a>
        <button onClick={handleClick}>Increment</button>
      </header>
    </div>
  );
}


const mapStateToProps = ({click}) =>{
  return{
    click
  };
}

const mapDispatchToProps = dispatch =>{
  return{
    handleClick : () => dispatch({type:CLICK}),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
