import {EditorBridge, useEditorContent} from '@10play/tentap-editor';
import {debounce} from 'lodash';
import {NoteModel} from '../db/Note';
import {useCallback, useEffect, useState} from 'react';
export const useAutoSave = (editor: EditorBridge, note: NoteModel) => {
  const [isSaving, setIsSaving] = useState(false);
  const content = useEditorContent(editor, {type: 'html'});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const saveContent = useCallback(
    debounce(async (note: NoteModel, html: string) => {
      await note.updateNote(html);
      setIsSaving(false);
    }),
    [],
  );

  useEffect(() => {
    if (!content) return;
    setIsSaving(true);
    saveContent(note, content);
  }, [note, saveContent, content]);

  return isSaving;
};