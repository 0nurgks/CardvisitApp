import { View, Text, Button, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // Sayfa durumu
  const [contactsPerPage] = useState(5);  // Her sayfada gösterilecek contact sayısı
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchUsername = async () => {
      const savedUsername = await AsyncStorage.getItem('username');
      setUsername(savedUsername);
    };

    fetchUsername();
  }, []);

  useEffect(() => {
    if (!username) return;  // Username yoksa veriyi getirme

    const fetchContacts = async () => {
        try {
          const response = await fetch(`http://localhost:5000/contacts/${username}`);
          const data = await response.json();
      
          console.log("API Yanıtı:", data); // Hata ayıklamak için
      
          if (response.ok) {
            setContacts(data);  // Direkt olarak gelen veriyi set ediyoruz
          } else {
            setError("İletişim bilgileri alınamadı.");
          }
        } catch (err) {
          setError("Bağlantı hatası.");
        }
      };
      

    fetchContacts();
  }, [username]);

  // Şu anki sayfada gösterilecek contactları alıyoruz
  const currentContacts = contacts.slice(currentPage * contactsPerPage, (currentPage + 1) * contactsPerPage);

  const nextPage = () => {
    if (currentPage * contactsPerPage + contactsPerPage < contacts.length) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  if (error) return <Text>{error}</Text>;

  return (
    <View>
      <Text>İletişim Bilgileri</Text>
      <FlatList
        data={currentContacts}
        keyExtractor={contact => contact._id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Email: {item.ClientMail}</Text>
            <Text>Mesaj: {item.ClientText}</Text>
          </View>
        )}
      />
      <Button title="Önceki" onPress={prevPage} disabled={currentPage === 0} />
      <Button title="Sonraki" onPress={nextPage} disabled={currentPage * contactsPerPage + contactsPerPage >= contacts.length} />
    </View>
  );
};

export default Contact;
