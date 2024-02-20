import {editorHtml} from '@10play/tentap-editor';
import {useEffect} from 'react';
import RNFS from 'react-native-fs';

export const useLocalEditorSrc = () => {
  useEffect(() => {
    const writeEditorSRC = async () => {
      await RNFS.writeFile(
        RNFS.CachesDirectoryPath + '/editorOnDevice.html',
        editorHtml,
        'utf8',
      );
      console.log('Editor src written to cache');
    };
    void writeEditorSRC();
  }, []);
};

export const editorDirectory = 'file://' + RNFS.CachesDirectoryPath;
export const localEditorSRC = editorDirectory + '/editorOnDevice.html';
