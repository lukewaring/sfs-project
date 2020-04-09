import React from 'react'
import './App.css'
import UsersTable from './UsersTable'
import AddButton from './AddButton'
import AddForm from './AddForm'

class App extends React.Component {

  state = {
    users: []
  }

  componentDidMount() {
    fetch('http://localhost:3001/data')
      .then(res => res.json())
        .then(data => this.setState({ users: data }))
  }

  render() {
    return (
      <div className="App">

        <div className="App-header">
          <h2>Strategic Financial Solutions</h2>

          <UsersTable users={this.state.users} />

          <br></br>
          
          <AddButton />
        </div>
        
        <AddForm />

      </div>
  )
  }
}

export default App
