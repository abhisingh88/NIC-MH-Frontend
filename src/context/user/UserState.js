import { useState } from "react";
import UserContext from "./UserContext";

const UserState = (props) => {

  const host = "http://localhost:3000"

  const intialUsers = []

  const [users, setUsers] = useState(intialUsers)

  // add user
  const addUser = async (user_name,user_email) => {
    // TODO: API call
    const response = await fetch(`${host}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({user_name,user_email})
    });
  }

  // get user
  const getAllUser = async () => {
    const response = await fetch(`${host}/users/`, {
      method: 'GET',
      headers: { 
        'Content-Type': "application/json",
      }
    });
    const json = await response.json()
    // console.log(json);
    setUsers(json)
  }

  return (
    <UserContext.Provider value={{ users, addUser, getAllUser}}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState