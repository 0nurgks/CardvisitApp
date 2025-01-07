import React, { useEffect, useState } from 'react'
import {AuthFetch} from "../utils";
import { Form, useNavigate } from "react-router";
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

  return (<View>
   {<View>
    <Form action="POST">
      <TextInput type="text" name="email" value={email} onChange={(event)=>setEmail(event.target.value)}/>
      <TextInput type="text" name="password" value={password} onChange={(event)=>setPassword(event.target.value)}/>
      <TouchableOpacity type='submit' onClick={(e)=>handleClick(e)}> Giriş</TouchableOpacity>
    </Form>
    <TouchableOpacity  onClick={()=>navigate("/register")}> Kayıt Ol</TouchableOpacity>
  </View>}
  </View>)
}

export default Auth
