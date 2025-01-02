import React from 'react'

const Topbar = ({ buttonState, setButtonState }) => {
  return (
    <div className='topbar'>
      {buttonState===2 ? <div className='addcard' onClick={()=>setButtonState(4)}><button >Kart Ekle</button></div>:<div></div>}
    </div>
  )
}

export default Topbar
