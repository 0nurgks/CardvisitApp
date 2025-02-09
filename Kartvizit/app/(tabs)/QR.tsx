import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Camera } from 'expo-camera';

const QR = () => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  return (
    <View style={styles.container}>
      {hasPermission ? (
        <Camera style={styles.camera} onBarCodeScanned={(scanResult) => Alert.alert('QR Kodu', scanResult.data)}>
          <Text style={styles.text}>QR Kodu Taramak İçin Kamerayı Kullanın</Text>
        </Camera>
      ) : (
        <Text>Kamera izni gerekli</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  camera: { flex: 1, width: '100%' },
  text: { color: 'white', fontSize: 18 },
});

export default QR;
