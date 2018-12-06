import dotenv from "dotenv"
import * as firebase from "firebase"
import "firebase/firestore"
dotenv.config()

console.log(process.env)
//put firebase config information here
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_PROJ_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MSG_SENDER_ID
}

console.log(config)

const fire = firebase.initializeApp(config)

class FirebaseClient {
  constructor() {
    Object.assign(this, {
      database: fire.database()
    })
  }

  createZombie = async (location, name, gender) => {
    //create zombie logic
    this.zombieId = await this.database.ref(`${location}/zombies`).push()
    let id = this.zombieId.getKey()
    this.zombieId.set({
      id,
      name: name,
      gender: gender,
      location
    })
  }

  deleteZombie = async (location, zombId) => {
    //delete zombie logic
    await this.database.ref(`${location}/zombies/${zombId}/`).remove()
  }

  moveZombie = async (newLocation, zombie) => {
    //create zombie in new location
    this.zombieId = await this.database.ref(
      `${newLocation}/zombies/${zombie.id}`
    )
    this.zombieId.set({
      id: zombie.id,
      name: zombie.name,
      gender: zombie.gender,
      location: newLocation
    })
    //delete zombie from old location
    this.deleteZombie(zombie.location, zombie.id)
  }

  locationRef = location => this.database.ref(`${location}/zombies`)

  countTotalZombies = async () => {
    await this.database.ref("zombieTotal").on("value", snapshot => {
      return snapshot.val()
    })
  }
}

export default FirebaseClient
