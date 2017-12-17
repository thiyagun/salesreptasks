import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';
import logo from './logo.svg';
import Login from './Login';
import AppHeader from './menu';
import Home from './home';
import TableView from './TableView';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App"> 
        <header>
          <AppHeader />
        </header>
        <main>
          {this.props.children}
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route path="/sales" component={TableView}/>
          {/* <Route path="/sales" component={SalesRep}/>
          <Route path="/task" component={Task}/>
          <Route path="/logout" component={Logout}/> */}
        </main>
      </div>
    );
  }
}

export default App;
