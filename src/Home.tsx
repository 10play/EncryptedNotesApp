import React from 'react';
import {withObservables} from '@nozbe/watermelondb/react';
import {dbManager, useDB} from './db/useDB';
import {NoteModel, NotesTable} from './db/Note';
import {
  FlatList,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {navigate} from './utils/navigation';

export const Home = () => {
  const db = useDB();

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={async () => {
          if (!db) return;
          await db.write(async () => {
            await db.collections.get<NoteModel>(NotesTable).create(note => {
              note.title = 'Untitled';
              note.html = '<p></p>';
            });
          });
        }}
        disabled={!db}
        style={{padding: 20}}>
        <Text>Create Note</Text>
      </TouchableOpacity>
      <NotesList />
    </View>
  );
};

interface NotesListProps {
  notes: NoteModel[];
}
const _NotesList = ({notes}: NotesListProps) => {
  const renderNode: ListRenderItem<NoteModel> = ({item: note}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigate('Editor', {note});
        }}
        style={{
          width: '100%',
          padding: 20,
          borderWidth: 1,
          borderStyle: 'solid',
        }}>
        <Text>{note.title}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      data={notes}
      renderItem={renderNode}
      keyExtractor={note => note.id}
    />
  );
};

// Enhance our _NoteList with notes
const enhance = withObservables([], () => ({
  notes: dbManager
    .getRequiredDB()
    .collections.get<NoteModel>(NotesTable)
    .query()
    .observe(),
}));
const NotesList = enhance(_NotesList);
