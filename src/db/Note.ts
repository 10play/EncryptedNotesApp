import {Model} from '@nozbe/watermelondb';
import {text, writer} from '@nozbe/watermelondb/decorators';

export const NotesTable = 'notes';

export enum NoteFields {
  Title = 'title',
  Subtitle = 'subtitle',
  Html = 'html',
}

export class NoteModel extends Model {
  static table = NotesTable;

  @text(NoteFields.Title) title!: string;
  @text(NoteFields.Subtitle) subtitle?: string;
  @text(NoteFields.Html) html!: string;

  @writer async updateNote(title: string, htmlContent: string) {
    await this.update(note => {
      note.title = title;
      note.html = htmlContent;
    });
  }

  @writer async deleteNote() {
    await this.markAsDeleted();
  }
}
