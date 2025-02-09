import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CardFetch } from "../utils";

const Cards = () => {
  const [myCards, setMyCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Kartları Fetch etme
  const fetchCards = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      if (!username) {
        Alert.alert('Hata', 'Kullanıcı adı bulunamadı. Lütfen giriş yapın.');
        return;
      }
      
      const response = await fetch(`${CardFetch}?username=${username}`);
      const data = await response.json();

      if (response.ok && data.myCards) {
        setMyCards(data.myCards);
      } else {
        Alert.alert('Hata', data.message || 'Kartlar yüklenemedi.');
      }
    } catch (error) {
      Alert.alert('Hata', 'Bağlantı hatası');
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  // Kart Silme İşlemi
  const handleDelete = async (cardId) => {
    try {
      const response = await fetch(`${CardFetch}/${cardId}`, { method: 'DELETE' });


      console.log("Silinecek kart ID:", cardId);

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Başarı', 'Kart başarıyla silindi');
        fetchCards();
      } else {
        Alert.alert('Hata', data.message || 'Silme işlemi başarısız oldu');
      }
    } catch (error) {
      Alert.alert('Hata', 'Bağlantı hatası');
    }
  };

  const currentCard = myCards[currentCardIndex];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.mainScroll}>
        <View style={styles.cardContainer}>
        {currentCard?.image ? (
            <Image source={{ uri: currentCard.image }} style={styles.image} />
          ) : (
            <Text style={styles.noImageText}>Resim yok</Text>
          )}
          <Text style={styles.cardText}>{currentCard?.textarea1 || "Biyografi bulunamadı"}</Text>
          <Text style={{
  letterSpacing: 3,
  lineHeight: 32,
  paddingVertical: 6
}}></Text>
          <Text style={styles.cardText}>{currentCard?.textarea2 || "Ek bilgi yok"}</Text>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button title="Önceki" onPress={() => setCurrentCardIndex((prev) => Math.max(prev - 1, 0))} />
        <Button title="Sil" color="red" onPress={() => handleDelete(currentCard?._id)} />
        <Button title="Sonraki" onPress={() => setCurrentCardIndex((prev) => Math.min(prev + 1, myCards.length - 1))} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eaeaff', padding: 20 },
  mainScroll: { flex: 1 },
  cardContainer: { backgroundColor: '#fff', borderRadius: 10, padding: 10, marginBottom: 10 },
  cardText: { fontSize: 14, color: '#333' },
  image: { width: 100, height: 100, borderRadius: 10 },
  noImageText: { color: '#999', textAlign: 'center' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
});

export default Cards;
