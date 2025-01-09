import React from 'react'
import { TouchableOpacity, View,Text } from 'react-native'
import {styles} from "./ContainerPage"

const Topbar = ({buttonState,setButtonState}) => {
  return (
    <View style={styles.topbar}>
      {buttonState===2 ?<TouchableOpacity style={styles.addcard} onPress={()=>setButtonState(4)}><Text>Kart Ekle</Text></TouchableOpacity>:<View></View>}
    </View>
  )
}

export default Topbar
