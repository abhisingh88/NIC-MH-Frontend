import React from "react"
// import logo from './logo.svg';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Admin.css'


function AdminTable(props) {
  const { user } = props
  return (
    <div className="admintable table-responsive table-responsive-sm">
      <table className="table table-hover table-dark">
        <thead>
          <tr>
            <th scope="col">userid</th>
            <th scope="col">Name</th>
            <th scope="col">Designation</th>
            <th scope="col">DOJ</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{user.userId}</th>
            <td>{user.username}</td>
            <td>{user.designation}</td>
            {/* <td>{new Date(Date.parse(user.doj))}</td> */}
            <td>{user.doj}</td>
            <td>{user.role}</td>
            {/* <i className='far fa-edit mx-2'></i>
            <i className="fa-solid fa-trash"></i> */}
          </tr>
        </tbody>
      </table>
    </div>
  );

}
export default AdminTable