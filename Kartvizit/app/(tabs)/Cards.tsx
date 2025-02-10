import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet, Image, ScrollView, Alert, Modal, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CardFetch } from "../utils";

const Cards = () => {
  const [myCards, setMyCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [shareLink, setShareLink] = useState("");

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

  const handleDelete = async (cardId) => {
    try {
      const response = await fetch(`${CardFetch}/${cardId}`, { method: 'DELETE' });
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

  // Paylaşılabilir link oluşturma (localhost:3000 üzerinden)
  const handleShare = (cardId) => {
    const generatedLink = `http://localhost:3000/share?cardId=${cardId}`;
    setShareLink(generatedLink);
    setModalVisible(true);
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
          <Text style={styles.cardText}>{currentCard?.textarea2 || "Ek bilgi yok"}</Text>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button title="Önceki" onPress={() => setCurrentCardIndex((prev) => Math.max(prev - 1, 0))} />
        <Button title="Sil" color="red" onPress={() => handleDelete(currentCard?._id)} />
        <Button title="Sonraki" onPress={() => setCurrentCardIndex((prev) => Math.min(prev + 1, myCards.length - 1))} />
        <Button title="Paylaş" onPress={() => handleShare(currentCard?._id)} />
      </View>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.shareText}>Paylaşılabilir Link:</Text>
            <Text style={styles.linkText}>{shareLink}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

  // Modal Stilleri
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%', alignItems: 'center' },
  shareText: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  linkText: { fontSize: 14, color: 'blue', textAlign: 'center', marginBottom: 10 },
  closeButton: { backgroundColor: 'red', padding: 10, borderRadius: 5 },
  closeButtonText: { color: 'white', fontWeight: 'bold' }
});

export default Cards;
