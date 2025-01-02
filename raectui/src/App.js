import { useState } from "react";
import "./App.css";
import Auth from "./layout/Auth.jsx";
import {Main} from './layout/Main.jsx';
import Register from "./layout/Register.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from 'react-router-dom'




function App() {

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Token yoksa login sayfasına yönlendir
    }
  }, [token]);
  
  return (
    
     
     <Routes>
      <Route path='/login' element={<Auth/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/home' element={<Main/>}></Route>
     </Routes>
     
   
  );
}

export default App;
