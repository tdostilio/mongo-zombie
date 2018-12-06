import React, { Component } from 'react'
import ZombieForm from './ZombieForm'
import ZombieDashboard from './ZombieDashboard'
import Fire from './lib/firebase'
import './App.css'

//make global firebase client available -- only global in app
window.fire = new Fire()

class App extends Component {
  state = {
    school: null,
    church: null,
    warehouse: null,
  }

  //creates a listener for changes to the location
  updateCount = async location => {
    window.fire.locationRef(location).on('value', snapshot => {
      //when there is a change to the location update the count of zombies
      let zombieObject = snapshot.val()
      if (zombieObject && Object.keys(zombieObject).length) {
        let zombieIds = Object.keys(zombieObject)
        let locationData = zombieIds.map((id, i) => zombieObject[id])
        this.setState({ [location]: locationData })
      } else {
        //default to 0
        this.setState({ [location]: null })
      }
    })
  }

  //attach database listeners for all 3 locations and update on change
  componentDidMount() {
    this.updateCount('school')
    this.updateCount('warehouse')
    this.updateCount('church')
  }

  render() {
    return (
      <>
        <div className="App">
          <header className="App-header">
            <ZombieForm />
            <ZombieDashboard
              warehouse={this.state.warehouse}
              school={this.state.school}
              church={this.state.church}
            />
          </header>
        </div>
      </>
    )
  }
}

export default App
