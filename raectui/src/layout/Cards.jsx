import React, { useEffect, useState } from "react";
import { CardFetch } from "../utils";
import "./layoutcss/card.css";
import { Card } from "primereact/card";

const Cards = () => {
  const [myCards, setMyCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0); // Aktif kartın indeksi
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchCards = () => {
      fetch(`${CardFetch}?username=${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.myCards) {
            setMyCards(data.myCards);
          } else {
            console.error("myCards not found in API response:", data);
          }
        })
        .catch((error) => console.error("Fetch error:", error));
    };

    fetchCards();
  }, [username]);

  // Geçerli kartı al
  const currentCard = myCards[currentCardIndex];

  // "Next" butonu
  const handleNext = () => {
    if (currentCardIndex < myCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  // "Previous" butonu
  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  return (
    <div className="cardContainer">
      {myCards.length > 0 ? (
        <div className="card">
          {currentCard ? (
            <div className="card-item">
              <div
                className="cardContent"
                style={{ backgroundColor: "#fff" }}
              >
                <img src="" alt="" />
                <p>{currentCard.textarea1}</p>
                <p>{currentCard.textarea2}</p>
              </div>
              <div className="navigation-buttons">
                <button
                  onClick={handlePrevious}
                  disabled={currentCardIndex === 0}
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentCardIndex === myCards.length - 1}
                >
                  Next
                </button>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div>
          <p>Loading cards...</p>
        </div>
      )}
    </div>
  );
};

export default Cards;
