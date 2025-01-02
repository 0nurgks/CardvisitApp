import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Tabbar from './Tabbar';
import Topbar from './Topbar';
export default function ContainerPage() {
const a = 1;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.page}>
        <Topbar/>
      <View style={styles.container}>
       {a==1? <View style={styles.a}/>:<></>}
      </View>
      <Tabbar/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:
  {
    flex:1,
  },
  page:
  {
    flex:1,
    justifyContent:"space-between"
  },
  container:{

  },
  a:{
    
    backgroundColor:"red"
  }
});
