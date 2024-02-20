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
import {editorDirectory, localEditorSRC} from '../utils/useLocalEditorSrc';

export const Editor = () => {
  const editor = useEditorBridge({
    avoidIosKeyboard: true, // Keep content above keyboard on ios
  });

  const [cameraIsOn, setCameraIsOn] = React.useState(false);
  const cameraRef = React.useRef<Camera>(null);

  const onPhoto = async (photoPath: string) => {
    setCameraIsOn(false);
    editor.setImage(`file://${photoPath}`);
    const editorState = editor.getEditorState();
    editor.setSelection(editorState.selection.from, editorState.selection.to);
    editor.focus();
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
      <RichText
        editor={editor}
        source={{uri: localEditorSRC}}
        allowFileAccess={true}
        allowFileAccessFromFileURLs={true}
        allowUniversalAccessFromFileURLs={true}
        originWhitelist={['*']}
        mixedContentMode="always"
        allowingReadAccessToURL={editorDirectory}
      />
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
