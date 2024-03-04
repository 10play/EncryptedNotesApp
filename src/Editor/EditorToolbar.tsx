import React, {useMemo} from 'react';
import {
  EditorBridge,
  useBridgeState,
  useKeyboard,
  Toolbar,
  ColorKeyboard,
  Images,
  DEFAULT_TOOLBAR_ITEMS,
} from '@10play/tentap-editor';
import {camera} from '../assets';

interface EditorToolbarProps {
  editor: EditorBridge;
  activeKeyboard: string | undefined;
  setActiveKeyboard: (id: string | undefined) => void;
  isCameraOn: boolean;
  setCameraOn: (isOn: boolean) => void;
}
export const EditorToolbar = ({
  editor,
  activeKeyboard,
  setActiveKeyboard,
  isCameraOn,
  setCameraOn,
}: EditorToolbarProps) => {
  // Get updates of editor state
  const editorState = useBridgeState(editor);

  const {isKeyboardUp: isNativeKeyboardUp} = useKeyboard();
  const customKeyboardOpen = activeKeyboard !== undefined;
  const isKeyboardUp = isNativeKeyboardUp || customKeyboardOpen;

  // Here we make sure not to hide the keyboard if our custom keyboard is visible
  const hideToolbar =
    !isKeyboardUp || (!editorState.isFocused && !customKeyboardOpen);

  const toolbarItems = useMemo(() => {
    const items = [...DEFAULT_TOOLBAR_ITEMS];
    // Add toolbar button for custom keyboard
    items.splice(5, 0, {
      onPress: () => () => {
        const isActive = activeKeyboard === ColorKeyboard.id;
        if (isActive) editor.focus();
        setActiveKeyboard(isActive ? undefined : ColorKeyboard.id);
      },
      active: () => activeKeyboard === ColorKeyboard.id,
      disabled: () => false,
      image: () => Images.palette,
    });
    // Add toolbar button for camera
    items.splice(10, 0, {
      onPress: () => () => {
        const isActive = isCameraOn;
        editor.blur();
        setCameraOn(!isActive);
      },
      active: () => isCameraOn,
      disabled: () => false,
      image: () => camera,
    });
    return items;
  }, [editor, setCameraOn, isCameraOn, activeKeyboard, setActiveKeyboard]);

  return <Toolbar editor={editor} hidden={hideToolbar} items={toolbarItems} />;
};
