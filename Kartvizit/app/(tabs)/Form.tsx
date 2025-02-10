import { useState, useEffect } from "react";
import { View, TextInput, Button, Alert, StyleSheet, Image, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import { CardFetch } from "../utils";

const Form = () => {
  const [textarea1, setTextarea1] = useState("");
  const [textarea2, setTextarea2] = useState("");
  const [username, setUsername] = useState("");
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);

  // AsyncStorage'den username'i yükle
  useEffect(() => {
    const getUsername = async () => {
      const storedUsername = await AsyncStorage.getItem("username");
      setUsername(storedUsername || "");
    };
    getUsername();
  }, []);

  // **Resim Seçme ve Base64 Dönüştürme**
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log("Resim Seçimi Sonucu: ", result);  // Debugging: Burada sonucu kontrol edin
    if (!result.cancelled) {
      const imageUri = result.assets[0].uri;  // URI'yi doğru şekilde al
      setImageUri(imageUri);  // URI'yi state'e kaydet
      const base64Response = await fetch(imageUri);
      const base64ImageData = await base64Response.blob();
      const base64String = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(base64ImageData);
      });
      setBase64Image(base64String); // Base64 formatında resmi state'e kaydet
    } else {
      console.error('Resim seçimi iptal edildi');
    }
  };
  
  

  // **Veriyi Gönderme**
  const handleSubmit = async () => {
    const myStates = { username, textarea1, textarea2, image: base64Image };  // imageUri'yi "image" olarak gönderiyoruz
  
    try {
      const response = await fetch(CardFetch, {  // Burada geçerli bir URL kullanın
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(myStates),
      });
  
      if (response.ok) {
        Alert.alert("Başarılı", "Veriler başarıyla gönderildi!");
      } else {
        Alert.alert("Hata", "Veri gönderimi sırasında bir hata oluştu.");
      }
    } catch (error) {
      Alert.alert("Hata", "Veri gönderimi sırasında bir hata oluştu.");
      console.error("fetch hatası", error);
    }
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
      <Button title="Görüntü Seç" onPress={pickImage} />
      {imageUri && (
        <View style={styles.imageContainer}>
          <Text style={styles.text}>Seçilen Resim:</Text>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>
      )}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  textarea: {
    width: "100%",
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    textAlignVertical: "top",
  },
  imageContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Form;
