import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
function EditForm() {
 
    // const [data, setData] = useState({
    //     name: '',
    //     email: '',
    //     number: '',
    //     gender: '',
    //     status: '',
    //     location: ''
    //   })
      const [name, setName] = useState()
      const [email, setEmail] = useState()
      const [number, setNumber] = useState()
      const [gender, setGender] = useState()
      const [status, setStatus] = useState()
      const [location, setLocation] = useState()
      const{id} = useParams()  
      


    
      const navigate = useNavigate()
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // const formData = {
        //   name: data.name,
        //   email: data.email,
        //   number: data.number,
        //   gender: data.gender,
        //   status: data.status,
        //   location: data.location,
        // };
    
        axios.put(`http://localhost:8081/editform/${id}`, {name, email, number, gender, status, location})
          .then(res => {
            if(res.data === "Success"){
            navigate("/")}
          })
          .catch(err => console.log(err));
      }
    
      useEffect(() => {
        axios.get(`http://localhost:8081/getusersbyid/${id}`)
        .then(result => {
            setName(result.data.name)
            setEmail(result.data.email)
            setNumber(result.data.number)
            setGender(result.data.gender)
            setStatus(result.data.status)
            setLocation(result.data.location)
            
        })
        .catch(err => console.log(err));
      },[])

  return (
    <>
      <div className='d-flex flex-column align-items-center pt-4 '>
        <h2>Edit Your Details</h2>

        <form className="row g-3 w-50" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">Full Name</label>
            <input type="text" className="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
               onChange={e => setName(e.target.value)}/>
          </div>

          <div className="col-12">
            <label for="inputEmail4" className="form-label">Email</label>
            <input type="email" className="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
              onChange={e => setEmail(e.target.value)} />
          </div>

          <div className="col-12">
            <label for="inputNumber" className="form-label">Mobile Number</label>
            <input type="number" className="form-control" id="inputNumber" placeholder='Enter Mobile Number'
              onChange={e => setNumber(e.target.value)}/>
          </div>

          <div className="col-12">
            <label for="inputSalary" className="form-label">Gender</label>
            <Form.Select aria-label="Default select example" onChange={e => setGender(e.target.value)}>
              <option>Select Your Gender</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
            </Form.Select>
          </div>

          <div className="col-12">
            <label for="inputSalary" className="form-label">Status</label>
            <Form.Select aria-label="Default select example" onChange={e => setStatus(e.target.value)}>
              <option>Select Your Status</option>
              <option value="1">Active</option>
              <option value="2">InActive</option>
            </Form.Select>
          </div>


          <div className="col-12">
            <label for="inputAddress" className="form-label">Location</label>
            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" autoComplete='off'
              o onChange={e => setLocation(e.target.value)} />
          </div>

          {/* <div className="col-12 mb-3">
        <label className="form-label" for="inputGroupFile01">Select Image</label>
        <input type="file" className="form-control" id="inputGroupFile01"
        onChange={e => setData({...data, image: e.target.files[0]})}/>
      </div> */}

          <div className="col-12">
            <button type="submit" className="btn btn-primary">Update</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditForm