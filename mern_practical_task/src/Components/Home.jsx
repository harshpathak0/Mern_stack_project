import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Table , Navbar, Container, Form, Button, Pagination} from 'react-bootstrap';
import "./style.css";


function Home() {

    const navigate = useNavigate()
    const [users, setUsers] = useState([]);

    const [name , setName]= useState(" ");

    //////Pagination//////
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
 
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
                    navigate("/adddata");
                } else {
                    console.log("Delete request failed with status code: " + response.status);
                }
            })
            .catch(err => {

                console.log(err);
            });
    }
    
    /////pagination////
    const totalPages = Math.ceil(users.length / itemsPerPage);

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const filteredUsers = users.filter((user) => user.name.includes(name));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);
    
   
    
    return (
        <>

            <div className='d-column'>
                
                <Navbar className="bg-dark">
                    <Container>
                       
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-center  Navtext">
                            <h4 className='navtext'>MERN Stack Project </h4>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                

                <div className="d-flex justify-content-between">
                <div className=' p-4 '>
            <Form className="d-flex ">
            <Form.Control
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(e) => setName(e.target.value)} />
            <Button variant="outline-success">Search</Button>
            </Form>
                </div>
                <div className='d-flex justify-content-center align-items-center p-4 '><Link to="/adddata" type="button" className="btn btn-primary " >Add user</Link></div>
                </div>


                
                <div className='w-100  d-flex justify-content-center align-items-center table'>
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
                                
                                   {currentUsers.filter((user) => (user.name.includes(name))).map((user) =>
                                         (
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
                                         ))}
                            </tbody>
                        </Table>
                        
                </div>
                
                <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1} className='btn btn-primary btn-md me-3 ms-4 rounded-0 '> Previous</button>
                <span>{currentPage}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className='btn btn-primary btn-md ms-4  rounded-0' style={{ marginLeft: '10px' }}> Next</button>
                </div>

            </div>
        </>
    )
   

}

export default Home;
