import React from 'react';
import { View, Button, Text, StyleSheet, Image, ScrollView } from 'react-native';
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
      {/* Ana ScrollView (dokunarak kaydırma için) */}
      <ScrollView style={styles.mainScroll} showsVerticalScrollIndicator={false}>
        {/* Biyografi Alanı */}
        <View style={styles.bioContainer}>
          <Text style={styles.bioText}>
            {currentCard?.textarea1 || "Biyografi bulunamadı"}
          </Text>
          <Text style={styles.bioText}>
            {currentCard?.textarea2 || "Biyografi bulunamadı"}
          </Text>
        </View>

        {/* Görsel Alanı */}
        <View style={styles.imageContainer}>
          {/* Base64 string'i doğru formatta kullanma */}
          {currentCard?.image ? (
            <Image
              source={{ uri: `${currentCard.image}` }} // Base64 formatı ile yükleme
              style={styles.image}
            />
          ) : (
            <Text style={styles.noImageText}>No image available</Text>
          )}
        </View>

      </ScrollView>

      {/* Alt Menü Alanı */}
      <View style={styles.buttonContainer}>
        <Button title="Önceki" onPress={handlePrevious} />
        <Button title="Sonraki" onPress={handleNext} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaff',
    padding: 20,
  },
  mainScroll: {
    flex: 1,
  },
  bioContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 10, // Görsel alanına biraz mesafe
  },
  bioText: {
    fontSize: 14,
    color: '#333',
  },
  imageContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  noImageText: {
    color: '#999',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default Cards;
