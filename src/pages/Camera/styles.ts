import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cameraButton: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    backgroundColor: '#7159c1',
    position: 'absolute',
    bottom: 8,
    alignSelf: 'center',
  },

  cameraButtonIcon: {
    color: '#ffffff',
  },

  cameraMesage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cameraMesageError: {
    color: '#ff0000',
    borderBottomWidth: 3,
    borderBottomColor: '#acacac',
    fontSize: 20,
  },
});
