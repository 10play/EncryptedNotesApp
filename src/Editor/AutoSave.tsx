import {EditorBridge, useEditorContent} from '@10play/tentap-editor';
import {debounce} from 'lodash';
import {NoteModel} from '../db/Note';
import {useCallback, useEffect} from 'react';
import {useEditorTitle} from '../utils/useEditorTitle';

/**
 * Listens for content updates, and updates the note in the database
 */
interface AutoSaveProps {
  editor: EditorBridge;
  note: NoteModel;
}
export const AutoSave = ({editor, note}: AutoSaveProps) => {
  const docTitle = useEditorTitle(editor);
  const htmlContent = useEditorContent(editor, {type: 'html'});
  const textContent = useEditorContent(editor, {type: 'text'});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const saveContent = useCallback(
    debounce(
      async (note: NoteModel, title: string, html: string, text: string) => {
        await note.updateNote(title, html, text);
      },
    ),
    [],
  );

  useEffect(() => {
    if (htmlContent === undefined) return;
    if (docTitle === undefined) return;
    if (textContent === undefined) return;

    saveContent(note, docTitle, htmlContent, textContent);
  }, [note, saveContent, htmlContent, docTitle, textContent]);

  return null;
};
