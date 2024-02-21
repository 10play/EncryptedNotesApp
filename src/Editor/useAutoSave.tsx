import {EditorBridge, useEditorContent} from '@10play/tentap-editor';
import {debounce} from 'lodash';
import {NoteModel} from '../db/Note';
import {useCallback, useEffect, useState} from 'react';
export const useAutoSave = (editor: EditorBridge, note: NoteModel) => {
  const [isSaving, setIsSaving] = useState(false);
  const htmlContent = useEditorContent(editor, {type: 'html'});
  const jsonContent = useEditorContent(editor, {type: 'json'});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const saveContent = useCallback(
    debounce(async (note: NoteModel, html: string, json: object) => {
      const title = json.content[0].content[0].text;
      await note.updateNote(title, html);
      setIsSaving(false);
    }),
    [],
  );

  useEffect(() => {
    if (!htmlContent || !jsonContent) return;
    setIsSaving(true);
    saveContent(note, htmlContent, jsonContent);
  }, [note, saveContent, htmlContent, jsonContent]);

  return isSaving;
};
