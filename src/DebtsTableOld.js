import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox';
import AddForm from './AddForm'

class DebtsTable extends React.Component {
    state = {
        debts: [],
        isFormVisible: false
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

    handleSelectUnselectAll(e) {
        
        if (e.target.checked) {
            console.log(e.target.checked)
        }
    }

    render() {
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <Checkbox onChange={e => this.handleSelectUnselectAll(e)} />
                                <TableCell style={{ fontWeight: 'bold' }} align="left">Creditor</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }} align="left">First Name</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }} align="left">Last Name</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }} align="left">Min Pay %</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }} align="left">Balance</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.debts.map(debt => (
                                <TableRow key={debt.id}>
                                    <Checkbox component="th" scope="row" />
                                    <TableCell>{debt.creditorName}</TableCell>
                                    <TableCell align="left">{debt.firstName}</TableCell>
                                    <TableCell align="left">{debt.lastName}</TableCell>
                                    <TableCell align="left">{this.percentFormat(debt.minPaymentPercentage)}</TableCell>
                                    <TableCell align="left">{this.currencyFormat(debt.balance)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <br></br>

                { this.state.isFormVisible ? <AddForm showHideAddForm={this.showHideAddForm} styles={"backgroundColor: 'white'"}/> :
                    <Button onClick={this.showHideAddForm} variant="contained" color="primary">Add Debt</Button>
                }
                <br></br>
                <br></br>

                <Button onClick={this.removeDebt} variant="contained" color="primary">Remove Last Debt</Button>

            </div>
        )
    }
}

export default DebtsTable
