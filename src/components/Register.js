import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Register.css'

function Register(){
    const [credentials, setCredentials] = useState({user_name:"", user_email: "", password: "" , cpassword:""})
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:3000/users", {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password, name:credentials.name })
        });

        const json = await response.json()
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            // props.showAlert("Account created successfully!","success");
            navigate("/")
        }else{
        //    props.showAlert("Error occurred","danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {
        console.log("hello");
    }
    return(
        
            <div className="register">
                <h1 className="heading"> AUTHORITIES SIGN UP</h1>
                 <div className="field">
                <form className="" onSubmit={handleSubmit}>
                <label htmlFor="name"> Name</label>
                <input className="input"type="text" name="user_name" value={credentials.name} onChange={onChange} ></input><br/>
                <label className="label" htmlFor="email"> Email</label>
                <input className="input" type="email" name="user_email" value={credentials.email} onChange={onChange} ></input><br/>
                <label className="label" htmlFor="pass"> Password</label>
                <input className="input" type="password" name="password" value={credentials.password} onChange={onChange} ></input><br/>
                <label htmlFor="cpass">Confirm Password</label>
                <input className="input" type="password" name="cpassword" value={credentials.cpassword} onChange={onChange}></input><br/>
                <button type="submit" className="btn btn-success">Submit</button>
                
                </form>
                </div>
                

            </div>

        
    );
}
export default Register