import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { Camera as ExpoCamera } from 'expo-camera';
import { Feather } from '@expo/vector-icons';

import { styles } from './styles';

const Camera: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [type, setType] = useState(ExpoCamera.Constants.Type.back);
  const [noCamera, setNoCamera] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ExpoCamera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        return;
      }

      if (await ExpoCamera.isAvailableAsync()) {
        setNoCamera(true);
      }

      setHasPermission(true);
    })();
  }, []);

  const handleChangeCamera = useCallback(() => {
    if (Platform.OS !== 'web') {
      setType(
        type === ExpoCamera.Constants.Type.back
          ? ExpoCamera.Constants.Type.front
          : ExpoCamera.Constants.Type.back
      );
    }
  }, []);

  if (hasPermission === null) {
    return <ActivityIndicator size={48} style={styles.cameraMesage} />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.cameraMesage}>
        <Text style={styles.cameraMesageError}>Camera permission denied!</Text>
      </View>
    );
  }

  if (noCamera) {
    return (
      <View style={styles.cameraMesage}>
        <Text style={styles.cameraMesageError}>Camera not avaliable</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ExpoCamera style={{ flex: 1 }} type={type} />
      {Platform.OS !== 'web' && (
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={handleChangeCamera}
        >
          <Feather name="camera" size={32} style={styles.cameraButtonIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Camera;
