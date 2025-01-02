import React, { useState } from 'react'
import {CardFetch} from "../utils";

const Form = () => {
    const [textarea1,setTextarea1] = useState("");
    const [textarea2,setTextarea2] = useState("");
    const username = localStorage.getItem("username");
    const myStates = {username,textarea1,textarea2};


    const PostStates = async(myStates)=>{
        try {
               
                 await  fetch(CardFetch, {
                    method:"POST",
                    headers:{'Content-Type': 'application/json' } ,
                    body:JSON.stringify(myStates)
                }).then(console.log("fetch gönderildi"));
            }
        
        catch (error) {
            console.log("fetch hatası");
        }
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        PostStates(myStates)
    }

  return (
    <div>
      <form action="POST">
        <textarea
          name="textarea1"
          value={textarea1}
          onChange={(event) => setTextarea1(event.target.value)}
        ></textarea>
        <textarea
          name="textarea2"
          value={textarea2}
          onChange={(event) => setTextarea2(event.target.value)}
        ></textarea>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default Form
