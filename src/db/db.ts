import {Database, appSchema, tableSchema} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import {NoteModel, NotesTable} from './Note';

const schema = appSchema({
  tables: [
    tableSchema({
      name: NotesTable,
      columns: [
        {name: 'title', type: 'string'},
        {name: 'subtitle', type: 'string', isOptional: true},
        {name: 'html', type: 'string'},
        {name: 'captions', type: 'string', isIndexed: true},
        {name: 'text', type: 'string', isIndexed: true},
      ],
    }),
  ],
  version: 1,
});

export const openDB = (passphrase: string) => {
  const adapter = new SQLiteAdapter({
    schema,
    jsi: true,
    passphrase,
  });

  return new Database({
    adapter,
    modelClasses: [NoteModel],
  });
};
