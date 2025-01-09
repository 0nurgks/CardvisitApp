import React from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Dimensions } from 'react-native';
import {AuthFetch} from "../utils";
const { width, height } = Dimensions.get('window');

import AsyncStorage from '@react-native-async-storage/async-storage';

const Auth = () => {
 
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const router = useRouter();

  const fetchAuth = async () => {
    try {
      const response = await fetch(AuthFetch+"/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Token ve kullanıcı adını sakla, ardından "Home" ekranına yönlendir
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('username', data.username);
        router.push('/ContainerPage');
      } else {
        console.error('Giriş başarısız. Bilgilerinizi kontrol edin.');
      }
    } catch (error) {
      console.error('Giriş yapılamıyor:', error);
    }
  };

  return (
    <View style={styles.authcontainer}>
      <View style={styles.inputcontainer}>
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
      <TouchableOpacity style={styles.authbutton} onPress={fetchAuth} ><Text>Giriş Yap</Text></TouchableOpacity>
      <TouchableOpacity style={styles.authbutton} onPress={() => router.push('/Register')}><Text>Kayıt Ol</Text></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
authcontainer:{
  flex:1,
  justifyContent:"center",
  backgroundColor:"#cfbcff",
  
},
inputcontainer:{
  marginBottom:50
},
authinput:{
  backgroundColor:"#a6aaf5",
height: height*0.1,
marginBottom:20
},
authbutton:{
  borderRadius:5,
  justifyContent:"center",
  alignSelf:"center",
  alignItems:"center",
  backgroundColor:"#a6aaf5",
  height:50,
  width:100,
  marginBottom: 20,
  
},

})



export default Auth;
