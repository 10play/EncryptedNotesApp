import {Model} from '@nozbe/watermelondb';
import {json, text, writer} from '@nozbe/watermelondb/decorators';
import {isArray} from 'lodash';

export const NotesTable = 'notes';

export enum NoteFields {
  Title = 'title',
  Subtitle = 'subtitle',
  Html = 'html',
  Captions = 'captions',
  Text = 'text',
}

const sanitizeCaptions = (captions: unknown) => {
  if (isArray(captions)) {
    return captions;
  }
  return [];
};

export class NoteModel extends Model {
  static table = NotesTable;

  @text(NoteFields.Title) title!: string;
  @text(NoteFields.Subtitle) subtitle?: string;
  @text(NoteFields.Html) html!: string;
  @text(NoteFields.Text) text!: string;
  @json(NoteFields.Captions, sanitizeCaptions) captions!: string[];

  @writer async updateNote(
    title: string,
    htmlContent: string,
    textContent: string,
  ) {
    await this.update(note => {
      note.title = title;
      note.html = htmlContent;
      note.text = textContent;
    });
  }

  @writer async updateCaptions(captions: string[]) {
    await this.update(note => {
      note.captions = captions;
    });
  }

  @writer async deleteNote() {
    await this.destroyPermanently();
  }
}
