import React from 'react';
import {withObservables} from '@nozbe/watermelondb/react';
import {dbManager, useDB} from './db/useDB';
import {NoteModel, NotesTable} from './db/Note';
import {FlatList, ListRenderItem, Text} from 'react-native';
import {navigate} from './utils/navigation';
import styled from 'styled-components/native';
import {themes} from './theme/theme';
import {StyledText} from './Components/StyledText';

const HomeContainer = styled.View`
  background-color: ${props => props.theme['--background-primary']};
  flex: 1;
`;
const CreateNoteButton = styled.TouchableOpacity`
  position: absolute;
  background-color: ${themes.dark['--background-primary']};
  border-radius: 50px;
  border-style: solid;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  bottom: 50px;
  right: 20px;
  z-index: 10;
`;
const CreateNotePlusText = styled.Text`
  color: ${themes.dark['--text-primary']};
  font-size: 40px;
  text-align: center;
  padding-bottom: 7px; /* # TODO use icon */
  padding-left: 1px;
`;

export const Home = () => {
  const db = useDB();

  const createNote = async () => {
    if (!db) return;
    await db.write(async () => {
      await db.collections.get<NoteModel>(NotesTable).create(note => {
        note.title = 'Untitled';
      });
    });
  };

  return (
    <HomeContainer>
      <CreateNoteButton onPress={createNote} disabled={!db}>
        <CreateNotePlusText>+</CreateNotePlusText>
      </CreateNoteButton>
      <NotesList />
    </HomeContainer>
  );
};

const NoteListButton = styled.TouchableOpacity`
  width: 100%;
  padding: 20px;
  border-width: 1px;
  border-style: solid;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const DeleteButton = styled.TouchableOpacity`
  background-color: ${props => props.theme['--background-destructive']};
  border-radius: 30px;
  padding: 4px;
  color: ${props => props.theme['--text-primary']};
`;

interface NoteListItemProps {
  note: NoteModel;
}
const _NoteListItem = ({note}: NoteListItemProps) => {
  return (
    <NoteListButton
      onPress={() => {
        navigate('Editor', {note});
      }}>
      <Text>{note.title}</Text>
      <DeleteButton onPress={() => note.deleteNote()}>
        <StyledText>Delete</StyledText>
      </DeleteButton>
    </NoteListButton>
  );
};
const NoteListItem = withObservables(['note'], ({note}: NoteListItemProps) => ({
  note: note.observe(),
}))(_NoteListItem);
interface NotesListProps {
  notes: NoteModel[];
}
const _NotesList = ({notes}: NotesListProps) => {
  const renderNode: ListRenderItem<NoteModel> = ({item: note}) => (
    <NoteListItem note={note} />
  );
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
