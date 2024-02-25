import {EditorBridge, useEditorContent} from '@10play/tentap-editor';

export const useEditorTitle = (editor: EditorBridge) => {
  const jsonContent = useEditorContent(editor, {type: 'json'});
  // @ts-ignore
  const title = jsonContent?.content[0]?.content?.[0]?.text || 'Untitled';
  return title as string | undefined;
};
