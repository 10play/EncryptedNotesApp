import RNFS from 'react-native-fs';
import {editorHtml} from '@10play/tentap-editor';
import {useEffect} from 'react';

export const editorDirectory = 'file://' + RNFS.CachesDirectoryPath;
export const localEditorSRC = editorDirectory + '/editorOnDevice.html';

// This hook writes the editor src to the cache directory
// So we can access local images inside the webview
export const useLocalEditorSrc = () => {
  useEffect(() => {
    const writeEditorSRC = async () => {
      await RNFS.writeFile(localEditorSRC, editorHtml, 'utf8');
      console.log('Editor src written to cache');
    };
    writeEditorSRC();
  }, []);
};
