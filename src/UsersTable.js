import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

class UsersTable extends React.Component {
    currencyFormat(num) {
        return `${num.toFixed(2)}`;
    }

    percentFormat(num) {
        return `${num.toFixed(2)}%`;
    }
    
    render() {
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: 'bold' }} align="left">Creditor</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }} align="left">First Name</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }} align="left">Last Name</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }} align="left">Min Pay %</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }} align="left">Balance</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.users.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell component="th" scope="row">{user.creditorName}</TableCell>
                                    <TableCell align="left">{user.firstName}</TableCell>
                                    <TableCell align="left">{user.lastName}</TableCell>
                                    <TableCell align="left">{this.percentFormat(user.minPaymentPercentage)}</TableCell>
                                    <TableCell align="left">{this.currencyFormat(user.balance)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default UsersTable
