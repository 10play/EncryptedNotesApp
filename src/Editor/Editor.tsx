import React from 'react';
import {RichText, useEditorBridge, Toolbar} from '@10play/tentap-editor';
import {KeyboardAvoidingView, Platform, SafeAreaView} from 'react-native';

export const Editor = () => {
  const editor = useEditorBridge({
    avoidIosKeyboard: true, // Keep content above keyboard on ios
  });

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
        <Toolbar editor={editor} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
