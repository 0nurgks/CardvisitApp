import { GestureHandlerRootView } from "react-native-gesture-handler";
import ContainerPage, { styles } from "./ContainerPage"
import { View } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Auth from "./Auth";

export default function Index() {
  const [mytoken, setMytoken] = useState<String>();
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          setMytoken(token);
       
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };
  
    fetchToken();
  }, []);
  

  return (<GestureHandlerRootView><Auth/></GestureHandlerRootView>);

}
