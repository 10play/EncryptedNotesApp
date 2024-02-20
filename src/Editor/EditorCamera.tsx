import React from 'react';
import {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import RNFS from 'react-native-fs';

interface CameraProps {
  show: boolean;
  onPhoto: (photoPath: string) => void;
  cameraRef: React.RefObject<Camera>;
}
export const EditorCamera = ({onPhoto, cameraRef, show}: CameraProps) => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  if (!show || !device) {
    return null;
  }

  return (
    <>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 50,
          left: 0,
        }}>
        <TouchableOpacity
          style={{
            height: 80,
            width: 80,
            borderRadius: 50,
            borderWidth: 5,
            borderColor: 'white',
          }}
          onPress={async () => {
            if (!cameraRef.current) {
              return;
            }
            const file = await cameraRef.current.takePhoto();
            const name = 'test' + new Date().getTime() + '.jpeg';
            const photoPath = RNFS.CachesDirectoryPath + '/' + name;
            await RNFS.moveFile(file.path ?? '', photoPath);
            onPhoto(photoPath);
          }}
        />
      </View>
    </>
  );
};
