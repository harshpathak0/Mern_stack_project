import React from 'react'
import AddForm from './Components/AddForm'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import EditForm from './Components/EditForm';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path='/adddata' element={ <AddForm/>}/>
        <Route path='/editform/:id' element={ <EditForm/>}/>
        
       
      </Routes>
    </BrowserRouter>
    
  )
}

export default App