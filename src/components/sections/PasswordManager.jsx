import React, { useState, useEffect } from 'react';
import axios from 'axios';  
import { useParams } from 'react-router-dom';  

const PasswordManager = () => {

  let { id } = useParams();  
  let [studentPasswordManagerEntry, setStudentPasswordManagerEntry] = useState({
    platform: "",
    userId: "",
    password: ""
  });
  let [passwords, setPasswords] = useState([]);  

  // Function to fetch passwords for the student
  const fetchPasswords = async () => {
    try {
      let token = localStorage.getItem("token");

      const response = await axios({
        method: 'get',  
        url: `${process.env.REACT_APP_API_CALL_ADDRESS}/api/${id}/passwordmanagerdata`,
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      });

      setPasswords(response.data);

    } catch (error) {
      console.error('Error fetching password manager data:', error);
      alert("Failed to fetch password data.");
    }
  };

  // Function to handle form submission and save password
  let handelPassowrdManagerEntry = async (e) => {
    e.preventDefault();

    try {
      let token = localStorage.getItem("token");

      const response = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_CALL_ADDRESS}/api/${id}/passwordmanager`,
        data: studentPasswordManagerEntry,
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      });

      console.log('Password Manager entry saved:', response.data);
      alert('Password saved successfully!');

      setStudentPasswordManagerEntry({
        platform: "",
        userId: "",
        password: ""
      });

      fetchPasswords();

    } catch (error) {
      console.error('Error saving password manager entry:', error);
      alert("Failed to save password.");
    }
  };

  // Function to delete a password
  const deletePassword = async (passwordIndex) => {
    try {
      let token = localStorage.getItem("token");

      const response = await axios({
        method: 'delete',
        url: `${process.env.REACT_APP_API_CALL_ADDRESS}/api/${id}/passwordmanager/${passwordIndex}`,
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      });

      console.log('Password deleted:', response.data);
      alert('Password deleted successfully!');
      
      fetchPasswords();  // Refresh the password list after deletion

    } catch (error) {
      console.error('Error deleting password:', error);
      alert("Failed to delete password.");
    }
  };

  let handelChange = (e) => {
    let { name, value } = e.target;
    setStudentPasswordManagerEntry((prev) => {
      return {
        ...prev, [name]: value
      };
    });
  };

  useEffect(() => {
    fetchPasswords();  
  }, []);  

  return (
    <div className='container'>
      <div className='shadow p-5'>
        <span className='d-block fw-bold'>
          Make a password entry to save.
        </span>
        <form onSubmit={handelPassowrdManagerEntry} className='mt-2 d-flex gap-2'>
          <input
            type="text"
            onChange={handelChange}
            className='form-control'
            placeholder='platform'
            name="platform"
            value={studentPasswordManagerEntry.platform}
            required
          />

          <input
            type="text"
            onChange={handelChange}
            className='form-control'
            placeholder='user email/id'
            name="userId"
            value={studentPasswordManagerEntry.userId}
            required
          />

          <input
            type="text"
            onChange={handelChange}
            className='form-control'
            placeholder='password'
            name="password"
            value={studentPasswordManagerEntry.password}
            required
          />

          <button type='submit' className='btn btn-success'>Save</button>
        </form>
      </div>

      <div className='my-4'>
        <span className='fw-bolder fs-3'>Your Passwords</span>
        <table className='table'>
          <thead className='table-dark'>
            <tr>
              <th>Platform</th>
              <th>User Email/Id/Name</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {passwords && passwords.length > 0 ? (
              passwords.map((password, index) => (
                <tr key={index}>
                  <td>{password.platform}</td>
                  <td>{password.userId}</td>
                  <td>{password.password}</td>
                  <td>
                    <button className='btn btn-danger' onClick={() => deletePassword(index)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No passwords found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PasswordManager;