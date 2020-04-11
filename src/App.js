import React from 'react'
import MaterialTable from 'material-table'
import Button from '@material-ui/core/Button'
import AddForm from './AddForm'

class App extends React.Component {
    state = {
      debts: [],
      isFormVisible: false,
      selectedRowsArr: [],
      selectedRowsTotal: 0
    }
  
  componentDidMount() {
      fetch('http://localhost:3001/debts')
      .then(res => res.json())
      .then(json => this.setState({ debts: json }))
  }

  currencyFormat(num) {
      return `${num.toFixed(2)}`;
  }

  percentFormat(num) {
      return `${num.toFixed(2)}%`;
  }
  
  toggleForm = () => {
      this.setState(prevState => ({
          isFormVisible: !prevState.isFormVisible
      }))
  }

  removeDebt = () => {
    let selectedRowIds = this.state.selectedRowsArr.map(row => row.id)
    this.deleteDebt(selectedRowIds)
  }

  deleteDebt(selectedRowIds, filteredDebts) {
    selectedRowIds.map(id => fetch(`http://localhost:3001/debts/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
    })
        .then(res => res.json())
    )
    window.location.reload(false)
  }

  calculateTotal(rows) {
      let total = 0
      rows.map(row => total += row.balance )
      this.setState({ selectedRowsTotal: total })
  }

  handleStateUpdates(rows) {
      this.setState({ selectedRowsArr: rows })
      this.calculateTotal(rows)
  }

  addNewDebtToAppState = (newDebt) => {
    this.setState({ debts: [...this.state.debts, newDebt]})
  }

  render() {
      return (
          <div style={{ padding: '2rem' }}>
              <h2 style={{ textAlign: 'center' }}>Strategic Financial Solutions</h2>
              <MaterialTable
                  title=""
                  columns={[
                  { title: 'Creditor', field: 'creditorName', headerStyle: {fontWeight: 'bold'} },
                  { title: 'First Name', field: 'firstName', headerStyle: {fontWeight: 'bold'} },
                  { title: 'Last Name', field: 'lastName', headerStyle: {fontWeight: 'bold'} },
                  { title: 'Min Pay %', field: 'minPaymentPercentage', headerStyle: {fontWeight: 'bold', textAlign: 'right'}, type: 'numeric' },
                  { title: 'Balance', field: 'balance', headerStyle: {fontWeight: 'bold', textAlign: 'right'}, type: 'currency' },
                  ]}
                  data={this.state.debts}        
                  options={{
                  selection: true,
                  sorting: false,
                  search: false,
                  paging: false,
                  toolbar: false,
                  }}
                  onSelectionChange={(rows) => this.handleStateUpdates(rows) }
              />
              <br></br>

              { this.state.isFormVisible ? <AddForm toggleForm={this.toggleForm}  debts={this.state.debts} addNewDebtToAppState={this.addNewDebtToAppState} styles={"backgroundColor: 'white'"}/> :
                  <Button onClick={this.toggleForm} variant="contained" color="primary">Add Debt</Button>
              }
              <br></br>
              <br></br>

              <Button onClick={this.removeDebt} variant="contained" color="secondary">Remove Debt(s)</Button>
              <br></br>
              <br></br>

              <div>
                  <div style={{ textAlign: 'right', backgroundColor: '#a6d4fa' }}><strong>Total:  ${this.state.selectedRowsTotal.toFixed(2)}</strong></div>
                  <br></br>
                  <span><strong>Total Row Count: {this.state.debts.length}</strong></span>
                  <span style={{ color: 'white' }}>a spacing div. it's a little hacky. ye</span>
                  <span><strong>Checked Row Count: {this.state.selectedRowsArr.length}</strong></span>
              </div>
          </div>
      )
  }
}

export default App
