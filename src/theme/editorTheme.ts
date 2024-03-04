import {
  EditorTheme,
  RecursivePartial,
  darkEditorTheme as defaultDarkEditorTheme,
} from '@10play/tentap-editor';

export const lightColorCSS = `
    :root {
        --white: #FFFFFF;
        --red: #EF233C;
        --yellow: #FFEE32;
        --orange: #FB8500;
        --blue: #0085FF;
        --green: #00A896;
        --purple: #A463F2;
        --pink: #FF5D8F;
        --black: #000000;
        --redBackground: #EF233C4D;
        --yellowBackground: #FFEE324D;
        --orangeBackground: #FB85004D;
        --blueBackground: #0085FF4D;
        --greenBackground: #00A8964D;
        --purpleBackground: #A463F24D;
        --pinkBackground: #FF5D8F4D;
        --blackBackground: #0000004D;
    }
`;

export const darkColorCSS = `
    :root {
        --white: #FFFFFF;
        --red: #E5112B;
        --yellow: #FFEE32;
        --orange: #F18200;
        --blue: #006ED3;
        --green: #07CE61;
        --purple: #9D4EDD;
        --pink: #FF77A1;
        --black: #000000;
        --redBackground: #E5112B4D;
        --yellowBackground: #FFEE324D;
        --orangeBackground: #F182004D;
        --blueBackground: #006ED34D;
        --greenBackground: #07CE614D;
        --purpleBackground: #9D4EDD4D;
        --pinkBackground: #FF77A14D;
        --blackBackground: #0000004D;
    }
`;

export const lightEditorTheme: RecursivePartial<EditorTheme> = {
  colorKeyboard: {
    colorSelection: [
      {
        name: 'Default',
        displayColor: '#898989',
        value: undefined,
      },
      {
        name: 'Red',
        displayColor: '#EF233C',
        value: 'var(--red)',
      },
      {
        name: 'Yellow',
        displayColor: '#FFEE32',
        value: 'var(--yellow)',
      },
      {
        name: 'Orange',
        displayColor: '#FB8500',
        value: 'var(--orange)',
      },
      {
        name: 'Blue',
        displayColor: '#0085FF',
        value: 'var(--blue)',
      },
      {
        name: 'Green',
        displayColor: '#00A896',
        value: 'var(--green)',
      },
      {
        name: 'Purple',
        displayColor: '#A463F2',
        value: 'var(--purple)',
      },
      {
        name: 'Pink',
        displayColor: '#FF5D8F',
        value: 'var(--pink)',
      },
      {
        name: 'Black',
        displayColor: '#000000',
        value: 'var(--black)',
      },
    ],
    highlightSelection: [
      {
        name: 'Default',
        displayColor: '#8989894D',
        value: undefined,
      },
      {
        name: 'Red',
        displayColor: '#EF233C4D',
        value: 'var(--redBackground)',
      },
      {
        name: 'Yellow',
        displayColor: '#FFEE324D',
        value: 'var(--yellowBackground)',
      },
      {
        name: 'Orange',
        displayColor: '#FB85004D',
        value: 'var(--orangeBackground)',
      },
      {
        name: 'Blue',
        displayColor: '#0085FF4D',
        value: 'var(--blueBackground)',
      },
      {
        name: 'Green',
        displayColor: '#00A8964D',
        value: 'var(--greenBackground)',
      },
      {
        name: 'Purple',
        displayColor: '#A463F24D',
        value: 'var(--purpleBackground)',
      },
      {
        name: 'Pink',
        displayColor: '#FF5D8F4D',
        value: 'var(--pinkBackground)',
      },
      {
        name: 'Black',
        displayColor: '#0000004D',
        value: 'var(--blackBackground)',
      },
    ],
  },
};

export const darkEditorTheme: RecursivePartial<EditorTheme> = {
  ...defaultDarkEditorTheme,
  colorKeyboard: {
    ...defaultDarkEditorTheme.colorKeyboard,
    colorSelection: [
      {
        name: 'Default',
        displayColor: 'white',
        value: undefined,
      },
      {
        name: 'Red',
        displayColor: '#E5112B',
        value: 'var(--red)',
      },
      {
        name: 'Yellow',
        displayColor: '#FFEE32',
        value: 'var(--yellow)',
      },
      {
        name: 'Orange',
        displayColor: '#F18200',
        value: 'var(--orange)',
      },
      {
        name: 'Blue',
        displayColor: '#006ED3',
        value: 'var(--blue)',
      },
      {
        name: 'Green',
        displayColor: '#07CE61',
        value: 'var(--green)',
      },
      {
        name: 'Purple',
        displayColor: '#9D4EDD',
        value: 'var(--purple)',
      },
      {
        name: 'Pink',
        displayColor: '#FF77A1',
        value: 'var(--pink)',
      },
      {
        name: 'Black',
        displayColor: '#000000',
        value: 'var(--black)',
      },
    ],
    highlightSelection: [
      {
        name: 'Default',
        displayColor: '#E5E5E580',
        value: undefined,
      },
      {
        name: 'Red',
        displayColor: '#E5112B4D',
        value: 'var(--redBackground)',
      },
      {
        name: 'Yellow',
        displayColor: '#FFEE324D',
        value: 'var(--yellowBackground)',
      },
      {
        name: 'Orange',
        displayColor: '#F182004D',
        value: 'var(--orangeBackground)',
      },
      {
        name: 'Blue',
        displayColor: '#006ED34D',
        value: 'var(--blueBackground)',
      },
      {
        name: 'Green',
        displayColor: '#07CE614D',
        value: 'var(--greenBackground)',
      },
      {
        name: 'Purple',
        displayColor: '#9D4EDD4D',
        value: 'var(--purpleBackground)',
      },
      {
        name: 'Pink',
        displayColor: '#FF77A14D',
        value: 'var(--pinkBackground)',
      },
      {
        name: 'Black',
        displayColor: '#0000004D',
        value: 'var(--blackBackground)',
      },
    ],
  },
};
