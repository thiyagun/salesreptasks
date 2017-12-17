import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import { Link} from 'react-router-dom';
import CreateSalesRepWizard from './createSalesRep';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

export default class TabView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  render() {
    return (
      <Tabs
       className="col-lg-8 col-md-8"
        value={this.state.value}
        onChange={this.handleChange}
      >
        <Tab label="Create Sales Rep" value="a">
          <div>
            <h3 style={styles.headline}>CREATE SALES REP</h3>
            <Link to="/sales">GO TO LIST VIEW</Link>
            <CreateSalesRepWizard />
          </div>
        </Tab>
        <Tab label="Create Tasks" value="b">
          <div>
            <h3 style={styles.headline}>CREATE TASKS</h3>
           
          </div>
        </Tab>
      </Tabs>
    );
  }
}