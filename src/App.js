// import logo from './logo.svg';
import React, { useState } from 'react'
import './App.css';
import Admin from './components/Admin';
import AdminTable from './components/AdminTable';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './components/Login';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Nav"
import Register from './components/Register';
import Alert from "./components/Alert";
import About from "./components/About";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
  }
  return (
    <div className="App">
      <Router>
      <Navbar />
      <Alert alert={alert} />
        <Routes>
          <Route exact path="/" element={<Admin showAlert={showAlert}/>} />
          <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
          <Route exact path="/about" element={<About showAlert={showAlert}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
