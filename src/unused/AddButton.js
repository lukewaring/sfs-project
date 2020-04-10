import React from 'react'
import Button from '@material-ui/core/Button'

class AddButton extends React.Component {
  render() {
    return (
        <div>
            <Button onClick={this.props.handleAddFormVisibilty} variant="contained" color="primary">Add Debt</Button>
        </div>
    )
  }
}

export default AddButton;
