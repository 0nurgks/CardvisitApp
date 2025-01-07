import React, { useEffect, useState } from "react";
import { CardFetch } from "../utils";
import "./layoutcss/card.css";
import { Card } from "primereact/card";
import {View,TouchableOpacity,Text,Img} from "react-native";
const Cards = () => {
  const [myCards, setMyCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0); // Aktif kartın indeksi
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchCards = () => {
      try {
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
          });
      }
       catch (error) {
        console.error("Fetch error:", error)
      }
       
    };

    fetchCards();
  }, []);

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
    <View className="cardContainer">
      {myCards.length > 0 ? (
        <View className="card">
          {currentCard ? (
            <View className="card-item">
              <View
                className="cardContent"
                style={{ backgroundColor: "#fff" }}
              >
                <Img src="" alt="" />
                <Text>{currentCard.textarea1}</Text>
                <Text>{currentCard.textarea2}</Text>
              </View>
              <View className="navigation-buttons">
                <TouchableOpacity
                  onClick={handlePrevious}
                  disabled={currentCardIndex === 0}
                >
                  Previous
                </TouchableOpacity>
                <TouchableOpacity
                  onClick={handleNext}
                  disabled={currentCardIndex === myCards.length - 1}
                >
                  Next
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </View>
      ) : (
        <View>
          <Text>Loading cards...</Text>
        </View>
      )}
    </View>
  );
};

export default Cards;
