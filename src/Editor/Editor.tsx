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
  darkEditorCss,
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
import {useTheme} from '../theme/ThemeContext';
import {css} from 'styled-components/native';
import {
  darkColorCSS,
  darkEditorTheme,
  lightColorCSS,
  lightEditorTheme,
} from '../theme/editorTheme';
import {AutoSave} from './AutoSave';

const baseEditorCSS = css`
  * {
    font-family: sans-serif;
  }
  body {
    padding: 22px;
  }
  img {
    max-width: 80%;
    height: auto;
    padding: 0 10%;
  }
`;

export const Editor = ({
  route: {
    params: {note},
  },
}: NativeStackScreenProps<RootStackParamList, 'Editor', undefined>) => {
  const [theme] = useTheme();
  const [loaded, setLoaded] = React.useState(false);

  const editorCSS =
    theme === 'dark'
      ? `${baseEditorCSS} ${darkEditorCss} ${darkColorCSS}`
      : `${baseEditorCSS} ${lightColorCSS}`;

  const editor = useEditorBridge({
    avoidIosKeyboard: true, // Keep content above keyboard on ios
    autofocus: true,
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
    theme: theme === 'dark' ? darkEditorTheme : lightEditorTheme,
  });

  const [isCameraOn, setCameraOn] = React.useState(false);
  const cameraRef = React.useRef<Camera>(null);

  // custom keyboard
  const rootRef = React.useRef(null);
  const [activeKeyboard, setActiveKeyboard] = React.useState<
    string | undefined
  >(undefined);

  const onPhoto = async (photoPath: string, captions: string[]) => {
    setCameraOn(false);
    editor.setImage(`file://${photoPath}`);
    const editorState = editor.getEditorState();
    editor.setSelection(editorState.selection.from, editorState.selection.to);
    editor.focus();
    const uniqcaptions = Array.from(new Set([...note.captions, ...captions]));
    await note.updateCaptions(uniqcaptions);
  };

  return (
    <Layout ref={rootRef}>
      <EditorHeader
        editor={editor}
        initialTitle={note.title || 'Untitled Note'}
      />
      <RichText
        editor={editor}
        source={loaded ? {uri: localEditorSRC} : {html: ''}}
        allowFileAccess={true}
        allowFileAccessFromFileURLs={true}
        allowUniversalAccessFromFileURLs={true}
        originWhitelist={['*']}
        mixedContentMode="always"
        allowingReadAccessToURL={editorDirectory}
        onLoad={() => setLoaded(true)}
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
      <AutoSave editor={editor} note={note} />
    </Layout>
  );
};
