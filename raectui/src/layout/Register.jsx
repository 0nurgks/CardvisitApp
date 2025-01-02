import React, { useState } from 'react'
import { data, useNavigate } from 'react-router';
import { AuthFetch } from '../utils';

const Register = () => {
    const navigate = useNavigate();
    const [page,setPage] = useState(1);

    const [username,setUsername] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    
    const states = {username,email,password};

    const fetchRegister = async()=>{
try {
    const response =await fetch(`${AuthFetch}/register`,{
        method:"POST",
        headers:{"application" : "json"},
        body: JSON.stringify(states)
    }).then(()=>console.log("Kayıt bekleniyor"))

    if(response.ok){
        page = 0;
        alert("Kayıt başarılı");
    }
    else{
        alert("Kayıt hatası")
    }
    
} catch (error) {
    alert("Bağlantı hatası")
}
       
    }


    const handleClick = (e)=>{
        e.preventDefault();
        fetchRegister();
    }



  return (
    <div>
   {page===1?<div>
    <form action="POST">
    <input type="text" name="username" value={username} onChange={(event)=>setUsername(event.target.value)}/>
      <input type="text" name="email" value={email} onChange={(event)=>setEmail(event.target.value)}/>
      <input type="text" name="password" value={password} onChange={(event)=>setPassword(event.target.value)}/>
      <button type='submit' onClick={(e)=>handleClick(e)}> Kayıt Ol</button>
    </form>
    <button  onClick={()=>navigate("/login")}> Zaten hesabın var mı?</button>
  </div>:navigate("/login")}
  </div>
  )
}

export default Register
