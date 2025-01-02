import React, { useEffect, useState } from 'react'
import Tabbar from './Tabbar'
import Topbar from './Topbar'
import  "./layoutcss/main.css"
import Cards from './Cards'
import Scan from './Scan'
import Options from './Options'
import Form from './Form'
import { useNavigate } from 'react-router'

export const Main = () => {
  const navigate = useNavigate();

 const [buttonState, setButtonState] = useState(2);

 
 useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login'); // Token yoksa login sayfasına yönlendir
  }
  else{
    navigate('/home');
  }
}, [navigate]);


  return (

    <div className='pagecontainer'>
        <div className='page'>
        <Topbar buttonState={buttonState} setButtonState={setButtonState}/>
        <div className='container'>
        {buttonState===1? <Scan/>:<></>}
        {buttonState===2? <Cards/>:<></>}
        {buttonState===3? <Options/>:<></>}
        {buttonState===4? <Form/>:<></>}
        </div>
        <Tabbar buttonState={buttonState} setButtonState={setButtonState}/>
    </div>
    </div>
    
   
  )
}

