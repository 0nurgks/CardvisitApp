import React from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CardFetch} from "../utils";
const Cards = () => {
  const [myCards, setMyCards] = React.useState([]);
  const [currentCardIndex, setCurrentCardIndex] = React.useState(0);

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

  const handleNext = () => {
    console.log('Next button clicked');
    if (currentCardIndex < myCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      console.log('Current card index:', currentCardIndex + 1);
    }
  };

  const handlePrevious = () => {
    console.log('Previous button clicked');
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      console.log('Current card index:', currentCardIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      {myCards.length > 0 ? (
        <View style={styles.cardContainer}>
          <Text style={styles.cardText}>{currentCard?.textarea1}</Text>
          <Text style={styles.cardText}>{currentCard?.textarea2}</Text>
          <View style={styles.navigationButtons}>
            <TouchableOpacity style={styles.navigationButton} disabled={currentCardIndex === myCards.length - 1} ><Text>Paylaş</Text></TouchableOpacity>
          </View>
          <View style={styles.navigationButtons2}>
            <TouchableOpacity style={styles.navigationButton} onPress={handlePrevious} disabled={currentCardIndex === 0} ><Text></Text>Önceki</TouchableOpacity>
            <TouchableOpacity style={styles.navigationButton} onPress={handleNext} disabled={currentCardIndex === myCards.length - 1} ><Text>Sonraki</Text></TouchableOpacity>
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
  cardContainer: {
    flex:1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    marginBottom: 20,
    flexWrap:"nowrap"
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop:"auto",
    
    
  },
  navigationButtons2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:"auto",
    
  },
  navigationButton:{
    marginHorizontal:5,
    backgroundColor:'#a6aaf5',
    borderRadius:5,
    padding:1
  }
});

export default Cards;
