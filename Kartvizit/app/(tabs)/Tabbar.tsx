import React from 'react'
import { TouchableOpacity,View, Text } from 'react-native'
import {styles} from "./ContainerPage"
const Tabbar = ({ buttonState, setButtonState }) => {
  return (
    <View style={styles.tabbar}>
      <TouchableOpacity style={styles.tabbarbutton} onPress={()=>{setButtonState(1)}}><Text>QR Kodlarım</Text></TouchableOpacity>
      <TouchableOpacity style={styles.tabbarbutton} onPress={()=>{setButtonState(2)}}><Text>Kartlarım</Text></TouchableOpacity>
      <TouchableOpacity style={styles.tabbarbutton} onPress={()=>{setButtonState(3)}}><Text>Ayarlar</Text></TouchableOpacity>
    </View>
  )
}

export default Tabbar
