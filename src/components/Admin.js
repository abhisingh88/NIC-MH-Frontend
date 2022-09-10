import React, { useState, useEffect, useContext } from "react"
// import logo from './logo.svg';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Admin.css'
// import userContext from '../context/user/UserContext'
import { useNavigate } from 'react-router-dom';
import AdminTable from "./AdminTable";

function Admin(props) {
    
    // const context = useContext(userContext)
    // const { users, getAllUser } = context

    const [users, setUsers] = useState([])
    const host = "http://localhost:3000"

    const getAllUser = async () => {
        const response = await fetch(`${host}/users/`, {
          method: 'GET',
          headers: { 
            'Content-Type': "application/json",
            'auth-token':localStorage.getItem("token"),
          },
        });
        const json = await response.json()
        console.log(json);
        setUsers(json)
      }

    const navigate = useNavigate()
    useEffect(() => {
        if(localStorage.getItem("token")!=null){
            getAllUser()
        }else{
            navigate("/login")
        }
    }, [])

    const [credentials, setCredentials] = useState({ user_name: "", user_email: "", user_doj: "", user_dob: "", user_sex:"", user_designation: "", user_phone: "", user_password: "", user_role: "" })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:3000/users", {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                'auth-token':localStorage.getItem("token"),
            },
            body: JSON.stringify({ user_name: credentials.user_name, user_email: credentials.user_email,user_phone: credentials.user_phone, user_password: credentials.user_password, user_dob: credentials.user_dob, user_doj: credentials.user_doj,  user_sex: credentials.user_sex, user_designation: credentials.user_designation, user_role: credentials.user_role, adminUserId:localStorage.getItem("userId")})
        });

        const json = await response.json()
        console.log(json);
        if (json.success) {
            props.showAlert("Account created successfully!", "success");
            navigate("/")
            setCredentials({ user_name: "", user_email: "", user_doj: "", user_dob: "", user_sex:"", user_designation: "", user_phone: "", user_password: "", user_role: "" })
            getAllUser()
        } else {
            props.showAlert("Error occurred", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="admin">
            <h1>ADD USER</h1>
            <form className="" onSubmit={handleSubmit}>
                <div className="row">
                    <div className=" col-lg-6">
                        <div className="admin-field">
                            <label htmlFor="userid">Username</label>
                            <input type="text" className=" input " name="user_name" onChange={onChange} value={credentials.user_name} ></input>
                            <label htmlFor="name">Password</label>
                            <input type="password" className="input" onChange={onChange} name="user_password" value={credentials.user_password}></input>
                            <label htmlFor="userid">Email</label>
                            <input type="email" className=" input " onChange={onChange} name="user_email" value={credentials.user_email} ></input>
                            <label htmlFor="name">Contact No.</label>
                            <input type="text" className=" input" onChange={onChange} name="user_phone" value={credentials.user_phone}></input>
                            <label htmlFor="exampleFormControlSelect1">Designation</label>
                            <select className=" input" id="exampleFormControlSelect1" onChange={onChange} value={credentials.user_designation} name="user_designation">
                                <option value={""} className="input1">Select Designation</option>
                                <option>Judge</option>
                                <option>Prosecutor</option>
                                <option>Main Lead</option>
                                <option>Intern</option>
                            </select>
                            <label htmlFor="exampleFormControlSelect1">Gender</label>
                            <select className=" input" id="gender" name="user_sex" onChange={onChange} value={credentials.user_sex}>
                                <option className="input1">Select Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Others</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="admin-field">
                            <label htmlFor="dob">Date of Birth</label>
                            <input type="date" className=" inputr " onChange={onChange} name="user_dob" value={credentials.user_dob}></input>
                            <label htmlFor="dob">Date of Join</label>
                            <input type="date" className=" inputr " onChange={onChange} name="user_doj" value={credentials.user_doj}></input>
                            <label htmlFor="role">Role</label>
                            <input type="text" className=" inputr" onChange={onChange} name="user_role" value={credentials.user_role} ></input>
                        </div>

                    </div>
                </div>
                <button className="btn btn-lg btn-success" type="submit" >ADD</button>
            </form>

            <div className='container my-3'>
                <h2 className="text-primary">Current Users</h2>
                <h3 className="text-primary">{users.length===0 && "No Users to display" }:</h3>
                {
                    users.map((user) => { return <AdminTable key={user.userId} user={user}/> })
                }
            </div>

        </div>


    );

}

export default Admin