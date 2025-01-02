import React, { useEffect, useState } from 'react'
import {AuthFetch} from "../utils";
import { useNavigate } from "react-router";
const Auth = () => {
    const [page,setPage]=useState(1);
    const navigate = useNavigate();

    

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const mystates = {email,password}

  

    const fetchAuth= async()=> {
        try {
            const response =   await fetch(`${AuthFetch}/login`, {
                method:"POST",
                headers:{'Content-Type': 'application/json' },
                body:JSON.stringify(mystates)
            }).then(console.log("Giriş bekleniyor"));
            
            const data = await response.json();

            if (response.ok && data.token) {
                localStorage.setItem("token", data.token); 
                localStorage.setItem("username", data.username); 
                navigate("/home");
              
              } else {
                return("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
              }
            
        } catch (error) {
           console.log("Giriş Yapılamıyor");
        }
       
    }
    

    const handleClick = (e) =>{
        e.preventDefault();
        fetchAuth();
       }

  return (<div>
   {<div>
    <form action="POST">
      <input type="text" name="email" value={email} onChange={(event)=>setEmail(event.target.value)}/>
      <input type="text" name="password" value={password} onChange={(event)=>setPassword(event.target.value)}/>
      <button type='submit' onClick={(e)=>handleClick(e)}> Giriş</button>
    </form>
    <button  onClick={()=>navigate("/register")}> Kayıt Ol</button>
  </div>}
  </div>)
}

export default Auth
