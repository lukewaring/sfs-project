import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class AddForm extends React.Component {
    state = {
        creditorName: '',
        firstName: '',
        lastName: '',
        minPaymentPercentage: 0,
        balance: 0
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        // e.preventDefault()
        
        fetch('http://localhost:3001/debts', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({ creditorName: this.state.creditorName, firstName: this.state.firstName, lastName: this.state.lastName, minPaymentPercentage: parseInt(this.state.minPaymentPercentage), balance: parseInt(this.state.balance) })    
        })
        .then(res => res.json())
        .then(json => console.log(json))
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <h3>New Debt</h3>
                
                <form onSubmit={e => this.handleSubmit(e)} noValidate autoComplete="off">
                    <TextField onChange={e => this.handleChange(e)} label="Creditor" name="creditorName" value={this.state.creditorName} required />
                    <br></br>
                    <br></br>
                    <TextField onChange={e => this.handleChange(e)} label="First Name" name="firstName" value={this.state.firstName} required />
                    <br></br>
                    <br></br>
                    <TextField onChange={e => this.handleChange(e)} label="Last Name" name="lastName" value={this.state.lastName} required />
                    <br></br>
                    <br></br>
                    <TextField onChange={e => this.handleChange(e)} label="Min Pay %" name="minPaymentPercentage" value={this.state.minPaymentPercentage} required />
                    <br></br>
                    <br></br>
                    <TextField onChange={e => this.handleChange(e)} label="Balance" name="balance" value={this.state.balance} required />
                    <br></br>
                    <br></br>
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        size="large"
                    >
                    Save
                    </Button>
                    <br></br>
                    <div></div>
                    <br></br>
                </form>
            </div>
        )}
    }

export default AddForm
