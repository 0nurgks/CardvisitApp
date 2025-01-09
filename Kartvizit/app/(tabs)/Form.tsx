import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet,Image,Text } from 'react-native';
import { CardFetch } from '../utils';
// AsyncStorage yerine secure storage veya başka bir depolama yöntemi kullanabilirsiniz.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';


// API endpoint'inizi buraya yazın

const Form = () => {
  const [textarea1, setTextarea1] = useState("");
  const [textarea2, setTextarea2] = useState("");
  const [username, setUsername] = useState("");
  const [base64Image, setBase64Image] = React.useState<string | null>(null);
  const [image, setImage] = useState<string[]>([]);
  // AsyncStorage'den username'i yükle
  React.useEffect(() => {
    const getUsername = async () => {
      const storedUsername = await AsyncStorage.getItem("username");
      setUsername(storedUsername || ""); // Eğer kayıtlı username yoksa boş string ata
    };
    getUsername();
  }, []);

  const pickImages = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true, // Base64 verisini etkinleştir
        selectionLimit: 0, // 0 limit, bu sayede birden fazla resim seçilebilir
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.assets && response.assets.length > 0) {
          const selectedImages = response.assets;
          const base64Images = selectedImages.map((image) => `data:${image.type};base64,${image.base64}`);
          setImage(base64Images); // Diziye tüm base64 görüntülerini ekleyin
        }
      }
    );
  };
  const myStates = { username, textarea1, textarea2,image };

  const PostStates = async (states: { username: string; textarea1: string; textarea2: string; }) => {
    try {
      await fetch(CardFetch, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(states),
      });
      Alert.alert("Başarılı", "Veriler gönderildi!");
    } catch (error) {
      Alert.alert("Hata", "Veri gönderimi sırasında bir hata oluştu.");
      console.error("fetch hatası", error);
    }
  };

  const handleSubmit = () => {
    PostStates(myStates);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textarea}
        multiline
        placeholder="Textarea 1"
        value={textarea1}
        onChangeText={setTextarea1}
      />
      <TextInput
        style={styles.textarea}
        multiline
        placeholder="Textarea 2"
        value={textarea2}
        onChangeText={setTextarea2}
      />
     <Button title="Görüntü Seç" onPress={pickImages} />
      {base64Image && (
        <View style={styles.imageContainer}>
          <Text style={styles.text}>Base64 Görüntü:</Text>
          <Image  source={{ uri: base64Image }} style={styles.image} />
        </View>
      )}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textarea: {
    width: '100%',
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    textAlignVertical: 'top', // Android'de textarea'da dikey hizalama
  },
  image:{

  },text:{

  },
  imageContainer:{

  }
});

export default Form;
