import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

function Home() {
    const navigate = useNavigate()
    const [users, setUsers] = useState([]); 

    useEffect(() => {
        axios.get("http://localhost:8081/getUsers")
            // .then(users => setUsers(users.data)) 
            .then(response => setUsers(response.data)) 
            .catch(err => console.log(err));
    }, []);


    
    const handleDelete = (id) => {
        axios.delete(`http://localhost:8081/deleteform/${id}`)
        .then(response => {
            if (response.status === 200) {
                navigate("/");
            } else {
                console.log("Delete request failed with status code: " + response.status);
            }
        })
        .catch(err => {
            
            console.log(err);
        });
     }
     

    return (
        <> <div className='d-column'>
            
            <div className='w-100  d-flex justify-content-center align-items-center table'>
                <div className='w-50'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile Number</th>
                                <th>Gender</th>
                                <th>Status</th>
                                <th>Location</th>
                                <th>Action</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user => {
                                    return (
                                        <tr key={user.id}>
                                            <td>{user.name} </td>
                                            <td>{user.email} </td>
                                            <td>{user.number} </td>
                                            <td>{user.gender} </td>
                                            <td>{user.status} </td>
                                            <td>{user.location} </td>
                                            <td>
                                              <Link to={`/editform/${user._id}`} className='btn btn-primary'>Edit</Link>
                                              <button onClick={e => handleDelete(user._id)} className='btn btn-danger'>Delete</button>
                                              
                                              </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
            <div className='d-flex justify-content-center align-items-center'><Link to="/adddata" type="button" className="btn btn-primary " >Add user</Link></div>
            </div>
        </>
    );
}

export default Home;
