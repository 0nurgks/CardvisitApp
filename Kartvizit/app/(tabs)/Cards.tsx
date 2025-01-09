import React from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CardFetch } from "../utils";

const Cards = () => {
  const [myCards, setMyCards] = React.useState([]);
  const [currentCardIndex, setCurrentCardIndex] = React.useState(0);

  // Kartları Fetch etme
  const fetchCards = async () => {
    try {
      console.log('Fetching cards...');
      const username = await AsyncStorage.getItem('username');
      console.log('Fetched username from AsyncStorage:', username);

      if (!username) {
        console.error('Kullanıcı adı bulunamadı. Lütfen kullanıcı adı kaydedildiğinden emin olun.');
        return;
      }

      const response = await fetch(`${CardFetch}?username=${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log('Response status:', response.status);

      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok && data.myCards) {
        setMyCards(data.myCards);
        console.log('Kartlar başarıyla alındı:', data.myCards);
      } else {
        console.error('Kartlar alınamadı. Response:', data);
      }
    } catch (error) {
      console.error('Fetch sırasında bir hata oluştu:', error);
    }
  };

  React.useEffect(() => {
    fetchCards();
  }, []);

  const currentCard = myCards[currentCardIndex];

  // Sonraki kart
  const handleNext = () => {
    console.log("Next button clicked");
    if (currentCardIndex < myCards.length - 1) {
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Önceki kart
  const handlePrevious = () => {
    console.log("Previous button clicked");
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      {myCards.length > 0 ? (
        <View style={styles.cardContainer}>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardText}>{currentCard?.textarea1}</Text>
            <Text style={styles.cardText}>{currentCard?.textarea2}</Text>
          </View>
          <View style={styles.imageContainer}>
              {/* Base64 resimleri render etme */}
              {currentCard?.image && currentCard.image.length > 0 ? (
              currentCard.image.map((img, index) => (
                <View key={index}  style={styles.imagediv}>
                  <Image source={{ uri: img }} style={styles.image} />
                </View>
              ))
            ) : (
              <Text>No image available</Text>
            )}
          </View>
          <View style={styles.navigationButtons}>
            <TouchableOpacity
              style={styles.navigationButton}
              disabled={currentCardIndex === 0} // Disable Previous button when first card
              onPress={handlePrevious}
            >
              <Text>Önceki</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navigationButton}
              disabled={currentCardIndex === myCards.length - 1} // Disable Next button when last card
              onPress={handleNext}
            >
              <Text>Sonraki</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text>Loading cards...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
    maxWidth: '100%',
    textAlign: 'left',
    overflow: 'hidden',
    numberOfLines: 1,
    ellipsizeMode: 'tail',
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    marginBottom: 20,
    width: '100%',
  },
  cardTextContainer: {
    flexWrap: "wrap",
  
    padding:25,
    flex:1,
    alignSelf:"flex-start"
    },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: "auto",
    width: '100%',
  },
  navigationButton: {
    marginHorizontal: 5,
    backgroundColor: '#a6aaf5',
    borderRadius: 5,
    padding: 10,
  },
  imageContainer: {
    marginBottom:"auto",
    alignSelf:"flex-end",
    flex:1,
   
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    
  },
  imagediv:{
    alignSelf:"center"
  }
});

export default Cards;

export default Cards;