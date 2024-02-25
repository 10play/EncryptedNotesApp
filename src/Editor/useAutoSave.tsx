import {EditorBridge, useEditorContent} from '@10play/tentap-editor';
import {debounce} from 'lodash';
import {NoteModel} from '../db/Note';
import {useCallback, useEffect, useState} from 'react';
import {useEditorTitle} from '../utils/useEditorTitle';

export const useAutoSave = (editor: EditorBridge, note: NoteModel) => {
  const [isSaving, setIsSaving] = useState(false);

  const docTitle = useEditorTitle(editor);
  const htmlContent = useEditorContent(editor, {type: 'html'});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const saveContent = useCallback(
    debounce(async (note: NoteModel, html: string, title: string) => {
      await note.updateNote(title, html);
      setIsSaving(false);
    }),
    [],
  );

  useEffect(() => {
    if (htmlContent === undefined || docTitle === undefined) return;
    setIsSaving(true);
    saveContent(note, htmlContent, docTitle);
  }, [note, saveContent, htmlContent, docTitle]);

  return isSaving;
};
