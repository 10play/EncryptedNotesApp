import React from 'react';
import {withObservables} from '@nozbe/watermelondb/react';
import {ListRenderItem, FlatList} from 'react-native';
import styled from 'styled-components/native';
import {NoteFields, NoteModel, NotesTable} from '../db/Note';
import {navigate} from '../utils/navigation';
import {StyledText} from './StyledText';
import {Q} from '@nozbe/watermelondb';
import {dbManager} from '../db/useDB';
import {doc} from '../assets';

const NoteListButton = styled.TouchableOpacity`
  width: 100%;
  padding: 16px;
  border-radius: 10px;
  background-color: ${props => props.theme['--background-primary']};
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  box-shadow: 0 2px 4px ${props => props.theme['--border-shadow']}; /* Subtle shadow for depth */
  elevation: 3; /* Elevation for Android shadow */
  margin-bottom: 8px; /* Add space between items for clarity */

  /* Optional: Change border color based on theme dynamically */
  /* This assumes you're passing a theme prop with a '--border-primary' value */
  border-color: ${props => props.theme['--border-primary']};
`;

const DeleteButton = styled.TouchableOpacity`
  background-color: ${props => props.theme['--background-destructive']};
  border-radius: 4px;
  padding: 4px;
  color: ${props => props.theme['--text-primary']};
`;

const DocIcon = styled.Image.attrs(({theme}) => {
  return {
    source: doc,
    resizeMethod: 'scale',
    resizeMode: 'contain',
    tintColor: theme['--text-primary'],
  };
})`
  width: 20px;
  height: 20px;
`;

const TextAndTitle = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
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
      <TextAndTitle>
        <DocIcon />
        <StyledText>{note.title || 'Untitled Note'}</StyledText>
      </TextAndTitle>
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
  query: string;
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
      style={{paddingTop: 8}}
    />
  );
};

// Enhance our _NoteList with notes
const enhance = withObservables(['query'], ({query}: {query: string}) => {
  const notesCollection = dbManager
    .getRequiredDB()
    .collections.get<NoteModel>(NotesTable);
  return {
    notes: query
      ? notesCollection
          .query(
            Q.or([
              Q.where(NoteFields.Text, Q.like(`%${query}%`)),
              Q.where(NoteFields.Captions, Q.like(`%${query}%`)),
            ]),
          )
          .observe()
      : notesCollection.query().observe(),
  };
});
export const NotesList = enhance(_NotesList);
