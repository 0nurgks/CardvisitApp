import React, { useEffect, useState } from 'react';
import { View, StyleSheet,Dimensions  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Topbar from './Topbar';
import Tabbar from './Tabbar';
import Cards from './Cards';
import QR from './QR';
import Contact from './Contact';
import Form from './Form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Auth from './Auth';
import { useRouter } from 'expo-router';
const { width, height } = Dimensions.get('window');



const Main = () => {
  const router = useRouter();
  const [mytoken, setMytoken] = useState<String>();
  const navigation = useNavigation();
  const [buttonState, setButtonState] = useState(2);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          setMytoken(token);
        }
        else{
          router.push("/Auth");
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };
  
    fetchToken();
  }, []);

  return (
    <View style={styles.pageContainer}>
      <View style={styles.page}>
        <Topbar buttonState={buttonState} setButtonState={setButtonState} />
       <View style={styles.container}>
          {buttonState === 1&&mytoken ? <QR />:<></>}
          {buttonState === 2&&mytoken ? <Cards />:<></>}
          {buttonState === 3&&mytoken ? <Contact/>:<></>}
          {buttonState === 4&&mytoken ? <Form />:<></>}
        </View>
        <Tabbar buttonState={buttonState} setButtonState={setButtonState} />
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  appcontainer:{
    flex:1,


  },
  pageContainer: {
    flex:1,
    backgroundColor: '#cfbcff',
    
  },
  page: {
    flex:1,
    height: height * 1, // 5vh

    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    
  },
  topbar: {
    flexDirection: 'row',
    backgroundColor: '#c1b3f4',
    width: '100%',
    height: height * 0.05, // 5vh yerine ekran yüksekliğine göre ayar
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: '#b0b2ff',
    width: '90%',
    marginVertical: 10,
  },
  
  addcard: {
    position: 'absolute', // 'fixed' yerine 'absolute' kullanılmalı
    right: '20%',
    bottom: 10, // Konumlandırma için bir referans noktası ekleyin
  },
  tabbar: {
    flexDirection: 'row',
    backgroundColor: '#a6aaf5',
    width: '100%',
    height: height * 0.05, // 5vh
    justifyContent: 'center',
    marginTop: 'auto', // Alt kısımda yer almasını sağlamak için
  },
  tabbarbutton: {
    // Yüzde değerler yerine uygun bir hesaplama kullanabilirsiniz
    alignItems:"center",
    justifyContent: 'center',
    padding: 0,
    flex: 1,
    borderWidth: 0, // React Native'de 'border' yerine 'borderWidth' kullanılır
  },
  tabbarbuttonHover: {
    // 'hover' durumu mobil cihazlarda desteklenmez
    // Eğer bir "pressed" durumu gerekiyorsa, TouchableOpacity kullanabilirsiniz
    opacity: 0.5,
  },
});

export default Main;
