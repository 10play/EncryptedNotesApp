import React, {useMemo} from 'react';
import {
  RichText,
  useEditorBridge,
  Toolbar,
  DEFAULT_TOOLBAR_ITEMS,
} from '@10play/tentap-editor';
import {KeyboardAvoidingView, Platform, SafeAreaView} from 'react-native';
import {camera} from '../assets';
import {EditorCamera} from './EditorCamera';
import {Camera} from 'react-native-vision-camera';

export const Editor = () => {
  const editor = useEditorBridge({
    avoidIosKeyboard: true, // Keep content above keyboard on ios
  });

  const [cameraIsOn, setCameraIsOn] = React.useState(false);
  const cameraRef = React.useRef<Camera>(null);

  const onPhoto = async (_photoPath: string) => {
    // When we take a photo we want to get a description of the photo contents
    // and insert it into the editor with a quote
    setCameraIsOn(false);
  };

  const toolbarItems = useMemo(() => {
    return [
      // Here we add camera button to default toolbar items
      {
        onPress: () => () => {
          editor.blur();
          setCameraIsOn(true);
        },
        active: () => false,
        disabled: () => false,
        image: () => camera,
      },
      ...DEFAULT_TOOLBAR_ITEMS,
    ];
  }, [editor, setCameraIsOn]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <RichText editor={editor} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          position: 'absolute',
          width: '100%',
          bottom: 0,
        }}>
        <Toolbar editor={editor} items={toolbarItems} />
      </KeyboardAvoidingView>
      <EditorCamera cameraRef={cameraRef} onPhoto={onPhoto} show={cameraIsOn} />
    </SafeAreaView>
  );
};
