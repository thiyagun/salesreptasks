import React from 'react';
import {withRouter} from 'react-router-dom';
import TabView from './TabView';

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state={};
  }
  componentDidMount(){
    if(!localStorage.getItem('email') && !localStorage.getItem('password')){
      this.props.history.push('/login')
    }
  }
  render(){
    return(
      <div className="row">
        <div className="col-lg-4 col-md-4"><h3>WELCOME {localStorage.getItem('email')}</h3></div>
        <div className="col-lg-8 col-md-8"><TabView /></div>
      </div>
    )
  }
}
export default withRouter(Home);