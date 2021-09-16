import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";

class Doc extends React.Component{
  componentDidMount(){
    document.title = "Simple Study"
  }

  render(){
    return(
      <div></div>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Doc />
      <App />
    </Router>
  </React.StrictMode>, 
  document.getElementById('root')
);
