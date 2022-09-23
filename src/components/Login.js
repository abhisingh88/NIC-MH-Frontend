import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Login.css'

function Login(props) {

    const [credentials, setCredentials] = useState({ userId: "", password: "" })

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:3000/user/login", {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({ userId: credentials.userId, password: credentials.password })
        });

        const json = await response.json()
        const userId=json.user.userId;
        const username=json.user.username;
        // json.user.role="user"
        if (json.success && json.user.role=="admin") {
            localStorage.setItem('token', json.authtoken);
            localStorage.setItem('userId',userId)
            localStorage.setItem('username',username)
            navigate("/")
            props.showAlert("Admin Logged in successfully!","success");
        }
        else if(json.success && json.user.role=="user"){
            localStorage.setItem('token', json.authtoken);
            localStorage.setItem('userId',userId)
            localStorage.setItem('username',username)
            navigate("/about")
            props.showAlert("User Logged in successfully!","success");
        } 
        else {
            setCredentials({userId: "", password: ""})
            props.showAlert("Invalid credentials!","danger");
        }
        } catch (error) {
            
        }
        
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (

        <div className="login">
            <h1 className="heading"> AUTHORITIES LOG IN</h1>
            <div className="field">
                <form className="" method="post" onSubmit={handleSubmit}>

                    <label className="label" htmlFor="username" > User ID</label>
                    <input className="input" type="text" name="userId" value={credentials.userId} onChange={onChange} ></input><br />
                    <label className="label" htmlFor="pass"> Password</label>
                    <input className="input" type="password" name="password" value={credentials.password} onChange={onChange}></input><br />

                    <button type="submit" className="btn btn-success">Sign In</button>

                </form>
            </div>


        </div>


    );
}
export default Login