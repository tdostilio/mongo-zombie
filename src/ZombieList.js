import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'
import ZombieActions from './ZombieActions'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar'

const styles = {
  avatars: {
    height: 64,
    width: 64,
  },
}

//the reusable list component for display the zombie populace at a given location
class ZombieList extends Component {
  buildingSelector = location => {
    if (location === 'Church') {
      return '/assets/church.png'
    }
    if (location === 'Warehouse') {
      return '/assets/warehouse.png'
    }
    if (location === 'School') {
      return '/assets/school.png'
    }
  }

  render() {
    const { zombies } = this.props
    return (
      <>
        <Card>
          <List component="nav">
            <ListItem className="location-header">
              <Avatar
                alt="location"
                style={styles.avatars}
                src={this.buildingSelector(this.props.location)}
              />
              <ListItemText
                primary={this.props.location}
                style={{ fontSize: '24px' }}
              />
            </ListItem>
            <Divider />
            {zombies ? (
              Object.keys(zombies).map((zombId, key) => {
                return (
                  <>
                    <ListItem
                      button
                      key={key}
                      divider
                      className="location-list"
                    >
                      <Avatar
                        style={styles.avatars}
                        alt="zombie"
                        src={
                          zombies[zombId].gender === 'male'
                            ? '/assets/maleHeadshot.png'
                            : '/assets/femaleHeadshot.png'
                        }
                      />
                      <ListItemText primary={zombies[zombId].name} />
                      <ListItemSecondaryAction>
                        <ListItemIcon>
                          <ZombieActions zombie={zombies[zombId]} />
                        </ListItemIcon>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </>
                )
              })
            ) : (
              <ListItem>
                <ListItemText primary="No Zombies" />
              </ListItem>
            )}
          </List>
        </Card>
      </>
    )
  }
}

export default ZombieList
