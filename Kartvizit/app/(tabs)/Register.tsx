import React from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Dimensions } from 'react-native';
import { RegisterFetch } from "../utils"; // Yeni RegisterFetch URL'sini kullanıyoruz
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthFetch } from "../utils"; // Bu satırı ekleyin

const { width, height } = Dimensions.get('window');

const Register = () => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const router = useRouter();

  const fetchRegister = async () => {
    try {
      const response = await fetch(AuthFetch + "/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      
      const data = await response.json(); // Yanıtı buradan önce alalım
      
      if (!response.ok) {
        console.error('Kayıt başarısız, durum kodu:', response.status);
        throw new Error(data.message || 'Kayıt başarısız');
      }
      
      console.log('Kayıt başarılı:', data);
      router.push('/Auth');
    } catch (error) {
      console.error('Kayıt işlemi sırasında bir hata oluştu:', error);
    }
  };
  
  
  
  
  return (
    <View style={styles.authcontainer}>
      <View style={styles.inputcontainer}>
        <TextInput
          style={styles.authinput}
          placeholder="Kullanıcı Adı"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.authinput}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.authinput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.authbutton} onPress={fetchRegister}>
        <Text>Kayıt Ol</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.authbutton} onPress={() => router.push('/Login')}>
        <Text>Zaten bir hesabınız var mı? Giriş Yapın</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  authcontainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#cfbcff",
  },
  inputcontainer: {
    marginBottom: 50
  },
  authinput: {
    backgroundColor: "#a6aaf5",
    height: height * 0.1,
    marginBottom: 20
  },
  authbutton: {
    borderRadius: 5,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#a6aaf5",
    height: 50,
    width: 100,
    marginBottom: 20,
  },
});

export default Register;
