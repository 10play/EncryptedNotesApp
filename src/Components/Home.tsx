import React from 'react';
import {useDB} from '../db/useDB';
import {NoteModel, NotesTable} from '../db/Note';
import {ActivityIndicator, Switch} from 'react-native';
import styled from 'styled-components/native';
import {useTheme} from '../theme/ThemeContext';
import {NotesList} from './NotesList';
import {SafeAreaView} from 'react-native-safe-area-context';
import {create} from '../assets';
import {StyledText} from './StyledText';

const HomeContainer = styled(SafeAreaView)`
  background-color: ${props => props.theme['--background-primary']};
  flex: 1;
`;
const HomeHeader = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 10px;
`;
const CreateNoteButton = styled.TouchableOpacity`
  position: absolute;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  bottom: 50px;
  right: 30px;
  z-index: 10;
`;
const CreatePlus = styled.Image.attrs(() => {
  return {
    source: create,
    resizeMethod: 'scale',
    resizeMode: 'contain',
  };
})`
  width: 20px;
`;

const SearchInput = styled.TextInput.attrs(({theme}) => {
  return {
    placeholderTextColor: theme['--text-secondary'],
    returnKeyType: 'done',
  };
})`
  flex: 1;
  height: 40px;
  border-radius: 20px;
  border: 1px solid ${props => props.theme['--border-secondary']};
  padding-horizontal: 20px;
  font-size: 16px;
  color: #333333;
  background-color: ${props => props.theme['--background-primary']};
  margin: 10px 0;
  elevation: 4;
`;

const HeaderTitle = styled(StyledText)`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

export const Home = () => {
  const db = useDB();
  const [theme, toggleTheme] = useTheme();
  const [queryValue, setQueryValue] = React.useState('');

  const createNote = async () => {
    if (!db) return;
    await db.write(async () => {
      await db.collections.get<NoteModel>(NotesTable).create(() => {});
    });
  };

  if (!db) return <ActivityIndicator />;

  return (
    <HomeContainer>
      <HeaderTitle>Encrypted Notes App</HeaderTitle>
      <HomeHeader>
        <SearchInput
          value={queryValue}
          placeholder="Search notes..."
          onChangeText={text => {
            setQueryValue(text);
          }}
        />
        <Switch
          value={theme === 'light'}
          onValueChange={toggleTheme}
          trackColor={{false: '#767577', true: '#6aaaf2'}} // Grey when off, blue when on
        />
      </HomeHeader>
      <CreateNoteButton
        onPress={createNote}
        disabled={!db}
        style={{backgroundColor: theme === 'light' ? 'black' : 'white'}}>
        <CreatePlus tintColor={theme === 'light' ? 'white' : 'black'} />
      </CreateNoteButton>
      <NotesList query={queryValue} />
    </HomeContainer>
  );
};
