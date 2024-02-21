import React, {useMemo} from 'react';
import {
  RichText,
  useEditorBridge,
  Toolbar,
  DEFAULT_TOOLBAR_ITEMS,
  TenTapStartKit,
  CoreBridge,
} from '@10play/tentap-editor';
import {KeyboardAvoidingView, Platform, SafeAreaView} from 'react-native';
import {camera} from '../assets';
import {EditorCamera} from './EditorCamera';
import {Camera} from 'react-native-vision-camera';
import {editorDirectory, localEditorSRC} from '../utils/useLocalEditorSrc';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../utils/navigation';
import {useAutoSave} from './useAutoSave';

export const Editor = ({
  route: {
    params: {note},
  },
}: NativeStackScreenProps<RootStackParamList, 'Editor', undefined>) => {
  const editor = useEditorBridge({
    avoidIosKeyboard: true, // Keep content above keyboard on ios
    initialContent: note.html,
    bridgeExtensions: [
      ...TenTapStartKit,
      CoreBridge.extendExtension({
        content: 'heading block+',
      }),
    ],
  });
  useAutoSave(editor, note);

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
        active: () => cameraIsOn,
        disabled: () => false,
        image: () => camera,
      },
      ...DEFAULT_TOOLBAR_ITEMS,
    ];
  }, [editor, setCameraIsOn, cameraIsOn]);

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
