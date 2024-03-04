import React from 'react';
import {useEffect} from 'react';
import {useTensorflowModel} from 'react-native-fast-tflite';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
} from 'react-native-vision-camera';
import RNFS from 'react-native-fs';
import {useResizePlugin} from 'vision-camera-resize-plugin';
import {labelMap} from '../assets/models/labels';
import {useSharedValue} from 'react-native-worklets-core';

interface CameraProps {
  show: boolean;
  onPhoto: (photoPath: string, captions: string[]) => void;
  cameraRef: React.RefObject<Camera>;
}
export const EditorCamera = ({onPhoto, cameraRef, show}: CameraProps) => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');

  const objectDetection = useTensorflowModel(
    require('../assets/models/object_detection.tflite'),
  );
  const model =
    objectDetection.state === 'loaded' ? objectDetection.model : undefined;

  const {resize} = useResizePlugin();
  const captions = useSharedValue<string[]>([]);
  const frameProcessor = useFrameProcessor(
    frame => {
      'worklet';
      if (!model) return;
      const data = resize(frame, {
        scale: {
          width: 320,
          height: 320,
        },
        pixelFormat: 'rgb',
        dataType: 'uint8',
      });

      const outputs = model.runSync([data]); // Running model

      // 3. Interpret outputs accordingly
      const detection_classes = outputs[1];
      const detection_scores = outputs[2];
      const _captions: string[] = [];
      detection_scores.forEach((score, i) => {
        // @ts-ignore
        if (score > 0.5) _captions.push(labelMap[detection_classes[i]]);
      });

      captions.value = _captions;
    },
    [model],
  );

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
        frameProcessor={frameProcessor}
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
            onPhoto(photoPath, captions.value);
            captions.value = [];
          }}
        />
      </View>
    </>
  );
};
