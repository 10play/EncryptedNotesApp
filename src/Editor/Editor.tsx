import React from 'react';
import {RichText, useEditorBridge} from '@10play/tentap-editor';
import {View} from 'react-native';

export const Editor = () => {
  const editor = useEditorBridge();

  return (
    <View style={{flex: 1}}>
      <RichText editor={editor} />
    </View>
  );
};
