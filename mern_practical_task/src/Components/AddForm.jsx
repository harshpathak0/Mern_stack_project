import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom'


function AddForm() {

  const [data, setData] = useState({
    name: '',
    email: '',
    number: '',
    gender: '',
    status: '',
    location: ''
  })




  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: data.name,
      email: data.email,
      number: data.number,
      gender: data.gender,
      status: data.status,
      location: data.location,
    };

    axios.post('http://localhost:8081/adddata', formData)
      .then(res => {
        navigate("/");
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      <div className='d-flex flex-column align-items-center pt-4 '>
        <h2>Register Your Details</h2>

        <form className="row g-3 w-50" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">Full Name</label>
            <input type="text" className="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
              onChange={e => setData({ ...data, name: e.target.value })} />
          </div>

          <div className="col-12">
            <label for="inputEmail4" className="form-label">Email</label>
            <input type="email" className="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
              onChange={e => setData({ ...data, email: e.target.value })} />
          </div>

          <div className="col-12">
            <label for="inputNumber" className="form-label">Mobile Number</label>
            <input type="number" className="form-control" id="inputNumber" placeholder='Enter Mobile Number'
              onChange={e => setData({ ...data, number: e.target.value })} />
          </div>

          <div className="col-12">
            <label for="inputSalary" className="form-label">Gender</label>
            <Form.Select aria-label="Default select example" onChange={e => setData({ ...data, gender: e.target.value })}>
              <option>Select Your Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Select>
          </div>

          <div className="col-12">
            <label for="inputSalary" className="form-label">Status</label>
            <Form.Select aria-label="Default select example" onChange={e => setData({ ...data, status: e.target.value })}>
              <option>Select Your Status</option>
              <option value="Active">Active</option>
              <option value="InActive">InActive</option>
            </Form.Select>
          </div>


          <div className="col-12">
            <label for="inputAddress" className="form-label">Location</label>
            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" autoComplete='off'
              onChange={e => setData({ ...data, location: e.target.value })} />
          </div>

          {/* <div className="col-12 mb-3">
        <label className="form-label" for="inputGroupFile01">Select Image</label>
        <input type="file" className="form-control" id="inputGroupFile01"
        onChange={e => setData({...data, image: e.target.files[0]})}/>
      </div> */}

          <div className="col-12">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddForm;