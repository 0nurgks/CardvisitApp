import React from 'react';
import './App.css';
import MyCardsPage from "./MyCardsPage";

function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const cardId = queryParams.get("cardId");

  return (
    <div className="App">
      <MyCardsPage cardId={cardId} />
    </div>
  );
}

export default App;
