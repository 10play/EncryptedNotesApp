import React from 'react';
import {
  RichText,
  useEditorBridge,
  TenTapStartKit,
  CoreBridge,
  PlaceholderBridge,
  HeadingBridge,
  ColorKeyboard,
  CustomKeyboard,
} from '@10play/tentap-editor';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {EditorCamera} from './EditorCamera';
import {Camera} from 'react-native-vision-camera';
import {editorDirectory, localEditorSRC} from '../utils/useLocalEditorSrc';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../utils/navigation';
import {Layout} from '../Components/Layout';
import {EditorToolbar} from './EditorToolbar';
import {EditorHeader} from './EditorHeader';
import {useAutoSave} from './useAutoSave';

const editorCSS = `
* {
    font-family: 'Rubik', sans-serif;
}
body {
  padding: 12px;
}
`;

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
      CoreBridge.configureCSS(editorCSS).extendExtension({
        content: 'heading block+',
      }),
      PlaceholderBridge.configureExtension({
        showOnlyCurrent: false,
        placeholder: 'Enter a Title',
      }),
      HeadingBridge.configureCSS(`
        .ProseMirror h1.is-empty::before {
          content: attr(data-placeholder);
          float: left;
          color: #ced4da;
          pointer-events: none;
          height: 0;
        }
        `),
    ],
  });
  // autosave
  useAutoSave(editor, note);

  const [isCameraOn, setCameraOn] = React.useState(false);
  const cameraRef = React.useRef<Camera>(null);

  // custom keyboard
  const rootRef = React.useRef(null);
  const [activeKeyboard, setActiveKeyboard] = React.useState<
    string | undefined
  >(undefined);

  const onPhoto = async (photoPath: string) => {
    setCameraOn(false);
    editor.setImage(`file://${photoPath}`);
    const editorState = editor.getEditorState();
    editor.setSelection(editorState.selection.from, editorState.selection.to);
    editor.focus();
  };

  return (
    <Layout ref={rootRef}>
      <EditorHeader editor={editor} initialTitle={note.title} />
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
        <EditorToolbar
          editor={editor}
          activeKeyboard={activeKeyboard}
          setActiveKeyboard={setActiveKeyboard}
          isCameraOn={isCameraOn}
          setCameraOn={setCameraOn}
        />
        <CustomKeyboard
          rootRef={rootRef}
          activeKeyboardID={activeKeyboard}
          setActiveKeyboardID={setActiveKeyboard}
          keyboards={[ColorKeyboard]}
          editor={editor}
        />
      </KeyboardAvoidingView>
      <EditorCamera cameraRef={cameraRef} onPhoto={onPhoto} show={isCameraOn} />
    </Layout>
  );
};
