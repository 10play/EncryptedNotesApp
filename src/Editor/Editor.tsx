import React, {useMemo} from 'react';
import {
  RichText,
  useEditorBridge,
  Toolbar,
  DEFAULT_TOOLBAR_ITEMS,
  TenTapStartKit,
  CoreBridge,
  PlaceholderBridge,
  HeadingBridge,
} from '@10play/tentap-editor';
import {KeyboardAvoidingView, Platform, SafeAreaView} from 'react-native';
import {camera} from '../assets';
import {EditorCamera} from './EditorCamera';
import {Camera} from 'react-native-vision-camera';
import {editorDirectory, localEditorSRC} from '../utils/useLocalEditorSrc';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../utils/navigation';
import {useAutoSave} from './useAutoSave';
import {rubik} from './font';
import {Layout} from '../Components/Layout';

const customFont = `
${rubik}
* {
    font-family: 'Protest Riot', sans-serif;
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
      CoreBridge.configureCSS(customFont).extendExtension({
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
    <Layout>
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
    </Layout>
  );
};
