import {createNavigationContainerRef} from '@react-navigation/native';
import {NoteModel} from '../db/Note';

export type RootStackParamList = {
  Home: {};
  Editor: {note: NoteModel};
};

export const navigationRef = createNavigationContainerRef();

export function navigate<routeName extends keyof RootStackParamList>(
  name: routeName,
  param: RootStackParamList[routeName],
  reset?: boolean,
) {
  if (navigationRef.isReady()) {
    // Perform navigation if the react navigation is ready to handle actions
    if (reset) {
      navigationRef.reset({
        index: 0,
        routes: [{name, params: param}],
      });
    } else {
      //@ts-ignore
      navigationRef.navigate(name, param);
    }
  } else {
    console.warn(
      'Navigate was called before the navigator children finished mounting.',
    );
  }
}
