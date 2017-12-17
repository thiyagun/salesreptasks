import React, {Component} from 'react';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {Link} from 'react-router-dom';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

const styles = {
  propContainer: {
    width: 120,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};

/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
export default class TableView extends Component {
  constructor(props){
    super(props);
    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: true,
      showRowHover: true,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: (localStorage.getItem('SalesRepArray') && localStorage.getItem('SalesRepArray').length > 0) ||  false,
    };
  }
 

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange = (event) => {
    this.setState({height: event.target.value});
  };

  render() {
    const tableData = localStorage.getItem('SalesRepArray') && JSON.parse(localStorage.getItem('SalesRepArray'))
    console.log('tableData ::', tableData);
    return (
      <div className="row">
        <div className="col-lg-10 col-md-10">
        <Link to="/">Back</Link>
        <Table
         className="col-lg-8 col-md-8"
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn colSpan="4" tooltip="Super Header" style={{textAlign: 'center'}}>
                Sales Rep List
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Email">Email</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Experience">Experience</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            // deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {tableData && tableData.length > 0 &&  tableData.map( (row, index) => (
              <TableRow key={index}>
                <TableRowColumn>{index+1}</TableRowColumn>
                <TableRowColumn style={{width: '28%'}}>{row.name}</TableRowColumn>
                <TableRowColumn>{row.email}</TableRowColumn>
                <TableRowColumn>{row.experience}</TableRowColumn>
              </TableRow>
              ))}
              {(!tableData || tableData.length === 0) && 
                <span>No Data Found</span>
              }
          </TableBody>
        </Table>
        </div>
      </div>
    )
  }
}