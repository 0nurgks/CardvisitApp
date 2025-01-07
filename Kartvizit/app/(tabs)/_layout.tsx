import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import Index from "./index"
export default function _layout() {
  return (
    
    <Stack initialRouteName='index'>
      <Stack.Screen 
        name="index" // Bu, varsayılan sayfa olur (app/index.tsx)
        options={{ headerShown: false }}
      />
        <Stack.Screen  name='ContainerPage'  options={{ headerShown: false }}  />
    </Stack>
  )   
}