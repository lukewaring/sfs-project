import React from 'react'
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button'
import AddForm from './AddForm'

class DebtsTable extends React.Component {
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
    
    showHideAddForm = () => {
        this.setState(prevState => ({
            isFormVisible: !prevState.isFormVisible
        }))
    }

    removeDebt = () => {
        const lastDebt = this.state.debts.pop()
        const lastDebtId = lastDebt.id
        
        console.log(lastDebtId)

        this.setState({
          debts: this.state.debts
        })

        this.deleteDebt(lastDebtId)
    }

    deleteDebt(lastDebtId) {
        fetch(`http://localhost:3001/debts/${lastDebtId}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
        })
        .then(res => res.json())
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

    render() {
        return (
            <div>
                <MaterialTable
                    title=""
                    columns={[
                    { title: 'Creditor', field: 'creditorName' },
                    { title: 'First Name', field: 'firstName' },
                    { title: 'Last Name', field: 'lastName' },
                    { title: 'Min Pay %', field: 'minPaymentPercentage', type: 'numeric' },
                    { title: 'Balance', field: 'balance', type: 'currency' },
                    ]}
                    data={this.state.debts}        
                    options={{
                    selection: true,
                    sorting: false,
                    search: false,
                    paging: false,
                    toolbar: false
                    }}
                    onSelectionChange={(rows) => this.handleStateUpdates(rows) }
                />
                <br></br>

                { this.state.isFormVisible ? <AddForm showHideAddForm={this.showHideAddForm} styles={"backgroundColor: 'white'"}/> :
                    <Button onClick={this.showHideAddForm} variant="contained" color="primary">Add Debt</Button>
                }
                <br></br>
                <br></br>

                <Button onClick={this.removeDebt} variant="contained" color="secondary">Remove Last Debt</Button>
                <br></br>
                <br></br>

                <div>
                    <div style={{ textAlign: 'right', backgroundColor: '#a6d4fa' }}><strong>Total:  ${this.state.selectedRowsTotal}</strong></div>
                    <br></br>
                    <span><strong>Total Row Count: {this.state.debts.length}</strong></span>
                    <span style={{ color: 'white' }}>a spacing div. it's a little hacky. ye</span>
                    <span><strong>Checked Row Count: {this.state.selectedRowsArr.length}</strong></span>
                </div>
            </div>
        )
    }
}

export default DebtsTable
