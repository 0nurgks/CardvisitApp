import React from 'react'

const Tabbar = ({ buttonState, setButtonState }) => {
  return (
    <div className='tabbar'>
        
      <button className='tabbarbutton' onClick={()=>{setButtonState(1)}}>Tara</button>
      <button className='tabbarbutton' onClick={()=>{setButtonState(2)}}>Kartlarım</button>
      <button className='tabbarbutton' onClick={()=>{setButtonState(3)}}>Ayarlar</button>
    </div>
  )
}

export default Tabbar
