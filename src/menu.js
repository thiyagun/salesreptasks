import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { IconButton, FontIcon, IconMenu, MenuItem, Drawer, AppBar }  from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ActionViewHeadline from 'material-ui/svg-icons/action/view-headline';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
class AppHeader extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: localStorage.getItem('isLoggedIn') || null,
      open:false,
    };
  }
  Logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('SalesRepArray');
    
   this.props.history.push('/login');
  }
 
  render(){
    const Logged = (props) => (
      <IconMenu
        {...props}
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Log out" onClick={() => {this.Logout()}}></MenuItem>
      </IconMenu>
    );

    const SideNav = () => (
       <Drawer  docked={false} open={this.state.open}  onRequestChange={(open) => this.setState({open})}>
          <MenuItem>Tasks</MenuItem>
          <MenuItem><Link to="/sales">Sales</Link></MenuItem>
        </Drawer>
    )

    const ExpandMore = (props) => (
      <div>
      <IconButton {...props} onClick={()=>{this.setState({open: !this.state.open})}}><ActionViewHeadline /></IconButton>
        <SideNav />
      </div>
    )
    return(
      <AppBar
        title="SALES & TASKS"
        iconClassNameRight=""
        iconElementLeft={localStorage.getItem('isLoggedIn') ? <ExpandMore {...this.props} /> : null }
        iconElementRight={localStorage.getItem('isLoggedIn') ? <Logged {...this.props}  /> : null}
      />
    )
  }
 
}

export default withRouter(AppHeader);