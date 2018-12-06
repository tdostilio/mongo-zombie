import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Avatar from '@material-ui/core/Avatar'

const styles = {
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 300,
  },
}

//ActionDialog is the dynamic modal that asks the user if they want to kill or move the zombie
class ActionDialog extends Component {
  state = {
    location: this.props.location,
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  filterLocations = () => {
    let locations = ['school', 'church', 'warehouse']
    let indexOfcurrent = locations.indexOf(this.props.zombie.location)
    if (indexOfcurrent > -1) {
      locations.splice(indexOfcurrent, 1)
      return locations
    }
    //otherwise return original locations array
    return locations
  }

  actionButton = zombie => {
    if (this.props.move) {
      window.fire.moveZombie(this.state.location, zombie)
    }
    if (this.props.kill) {
      window.fire.deleteZombie(zombie.location, zombie.id)
    }
    this.props.onClose()
  }

  render() {
    const { location } = this.state
    const { open, onClose, zombie } = this.props
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle style={{ display: 'flex', justifyContent: 'center' }}>
          {`${this.props.move ? 'Move' : 'Kill'} ${zombie.name}?`}
        </DialogTitle>

        <DialogContent style={styles.dialogContent}>
          <Avatar
            alt="zombie"
            src={
              zombie.gender === 'male'
                ? '/assets/maleHeadshot.png'
                : '/assets/femaleHeadshot.png'
            }
            style={{ height: 128, width: 128 }}
          />
          {this.props.move ? (
            <TextField
              key="location"
              select
              autoFocus
              // fullWidth
              label="To Where"
              value={location}
              onChange={this.handleChange('location')}
              style={{ margin: 8, minWidth: 150 }}
            >
              {this.filterLocations().map((availableLocation, key) => (
                <MenuItem value={availableLocation} key={key}>
                  {availableLocation}
                </MenuItem>
              ))}
            </TextField>
          ) : null}
        </DialogContent>

        <DialogActions
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button onClick={onClose} color="default">
            Cancel
          </Button>
          <Button
            onClick={() => this.actionButton(zombie)}
            variant="contained"
            color={this.props.move ? 'primary' : 'secondary'}
          >
            {this.props.move ? 'Move' : 'Kill'}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default ActionDialog
