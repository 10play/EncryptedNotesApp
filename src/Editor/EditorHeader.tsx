import {EditorBridge, Images, useBridgeState} from '@10play/tentap-editor';
import React from 'react';
import styled from 'styled-components/native';
import {StyledText} from '../Components/StyledText';
import {navigationRef} from '../utils/navigation';
import {TouchableOpacity} from 'react-native';
import {useEditorTitle} from '../utils/useEditorTitle';
import {chevron} from '../assets';

const HeaderContainer = styled.View`
  background-color: ${props => props.theme['--background-primary']};
  height: 44px;
  align-items: center;
  border-bottom-width: 1px;
  gap: 12px;
  border-bottom-color: ${props => props.theme['--border-primary']};
  flex-direction: row;
  justify-content: space-between;
`;
const TitleAndChevron = styled.View`
  flex-direction: row;
  align-items: center;
`;
const BackChevron = styled.Image`
  width: 24px;
  height: 24px;
  tint-color: ${props => props.theme['--text-primary']};
`;
const HistoryContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px;
  gap: 4px;
`;
const HeaderTitle = styled(StyledText)`
  font-size: 14px;
`;
const HistoryIcon = styled.Image.attrs(({theme}) => {
  return {
    tintColor: theme['--text-primary'],
  };
})`
  width: 24px;
  height: 24px;
`;

interface EditorHeaderProps {
  editor: EditorBridge;
  initialTitle: string;
}
export const EditorHeader = ({editor, initialTitle}: EditorHeaderProps) => {
  const title = useEditorTitle(editor);
  const editorState = useBridgeState(editor);

  return (
    <HeaderContainer>
      <TitleAndChevron>
        <TouchableOpacity onPress={() => navigationRef.goBack()}>
          <BackChevron source={chevron} />
        </TouchableOpacity>
        <HeaderTitle>
          {editorState.isReady ? title || initialTitle : initialTitle}
        </HeaderTitle>
      </TitleAndChevron>
      <HistoryContainer>
        <TouchableOpacity
          onPress={() => editor.undo()}
          disabled={!editorState.canUndo}>
          <HistoryIcon
            source={Images.undo}
            style={{
              opacity: editorState.canUndo ? 1 : 0.5,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => editor.redo()}
          disabled={!editorState.canRedo}>
          <HistoryIcon
            source={Images.redo}
            style={{
              opacity: editorState.canRedo ? 1 : 0.5,
            }}
          />
        </TouchableOpacity>
      </HistoryContainer>
    </HeaderContainer>
  );
};
