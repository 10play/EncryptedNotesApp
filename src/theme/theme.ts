/* eslint-disable @typescript-eslint/naming-convention */
/* Opacities */
const opacities = {
  '--1': '0.01',
  '--2': '0.02',
  '--4': '0.04',
  '--6': '0.06',
  '--8': '0.08',
  '--10': '0.10',
  '--12': '0.12',
  '--14': '0.14',
  '--16': '0.16',
  '--20': '0.20',
  '--24': '0.24',
  '--26': '0.26',
  '--28': '0.28',
  '--32': '0.32',
  '--36': '0.36',
  '--42': '0.42',
  '--44': '0.44',
  '--48': '0.48',
  '--54': '0.54',
  '--56': '0.56',
  '--60': '0.60',
  '--64': '0.64',
  '--72': '0.72',
  '--80': '0.80',
  '--88': '0.88',
};

/* White & Black */
const grey_colors = {
  '--white': '255, 255, 255',
  '--grey-100': '239, 239, 239',
  '--grey-200': '223, 223, 223',
  '--grey-300': '207, 207, 207',
  '--grey-400': '175, 175, 175',
  '--grey-500': '143, 143, 143',
  '--grey-600': '112, 112, 112',
  '--grey-700': '80, 80, 80',
  '--grey-800': '48, 48, 48',
  '--grey-900': '31, 31, 31',
  '--black': '0, 0, 0',
};

/* Orange */
const orange_colors = {
  '--orange-100': '255, 235, 231',
  '--orange-200': '255, 215, 207',
  '--orange-300': '255, 195, 183',
  '--orange-400': '255, 142, 120',
  '--orange-500': '239, 90, 60',
  '--orange-600': '199, 64, 37',
  '--orange-700': '151, 41, 19',
  '--orange-800': '96, 16, 0',
};

/* Green */
const green_colors = {
  '--green-100': '191, 255, 229',
  '--green-200': '124, 247, 196',
  '--green-300': '72, 231, 165',
  '--green-400': '25, 199, 127',
  '--green-500': '0, 160, 94',
  '--green-600': '0, 128, 75',
  '--green-700': '0, 88, 51',
  '--green-800': '0, 56, 33',
};

/* Pink */
const pink_colors = {
  '--pink-100': '255, 239, 247',
  '--pink-200': '255, 215, 235',
  '--pink-300': '255, 191, 223',
  '--pink-400': '239, 149, 194',
  '--pink-500': '175, 88, 131',
  '--pink-600': '175, 88, 131',
  '--pink-700': '128, 56, 92',
  '--pink-800': '80, 30, 55',
};

/* Yellow */
const yellow_colors = {
  '--yellow-100': '255, 237, 183',
  '--yellow-200': '255, 223, 128',
  '--yellow-300': '255, 203, 48',
  '--yellow-400': '223, 171, 14',
  '--yellow-500': '183, 137, 0',
  '--yellow-600': '143, 108, 0',
  '--yellow-700': '104, 78, 0',
  '--yellow-800': '64, 48, 0',
};

/* Blue */
const blue_colors = {
  '--blue-100': '223, 244, 255',
  '--blue-200': '183, 231, 255',
  '--blue-300': '143, 218, 255',
  '--blue-400': '74, 183, 238',
  '--blue-500': '39, 151, 207',
  '--blue-600': '11, 121, 175',
  '--blue-700': '8, 88, 128',
  '--blue-800': '0, 53, 80',
};

/* Red */
const red_colors = {
  '--red-100': '255, 231, 231',
  '--red-200': '255, 215, 215',
  '--red-300': '255, 191, 191',
  '--red-400': '255, 143, 143',
  '--red-500': '255, 80, 80',
  '--red-600': '215, 40, 40',
  '--red-700': '159, 10, 10',
  '--red-800': '96, 0, 0',
};

/* Dark blue */
const dark_blue = {
  '--dark-blue-100': '231, 239, 255',
  '--dark-blue-200': '207, 223, 255',
  '--dark-blue-300': '183, 207, 255',
  '--dark-blue-400': '135, 175, 255',
  '--dark-blue-500': '85, 139, 247',
  '--dark-blue-600': '43, 106, 231',
  '--dark-blue-700': '13, 72, 191',
  '--dark-blue-800': '0, 40, 120',
};

export const colors = {
  ...grey_colors,
  ...orange_colors,
  ...green_colors,
  ...pink_colors,
  ...yellow_colors,
  ...blue_colors,
  ...red_colors,
  ...dark_blue,
};

export interface Theme {
  light: Record<string, string>;
  dark: Record<string, string>;
}

const theme = {
  light: {
    ...colors,
    '--text-primary': `rgb(${colors['--black']})`,
    '--text-secondary': `rgba(${colors['--black']}, ${opacities['--56']})`,
    '--background-primary': `rgb(${colors['--white']})`,
    '--background-destructive': `rgb(${colors['--red-100']})`,
    '--border-primary': `rgba(${colors['--black']}, ${opacities['--12']})`,
    '--border-secondary': `rgba(${colors['--black']}, ${opacities['--12']})`,
  },
  dark: {
    ...colors,
    '--text-primary': `rgb(${colors['--white']})`,
    '--text-secondary': `rgba(${colors['--white']}, ${opacities['--54']})`,
    '--background-primary': `rgb(${colors['--black']})`,
    '--background-destructive': `rgb(${colors['--red-500']})`,
    '--border-primary': `rgba(${colors['--white']}, ${opacities['--12']})`,
    '--border-secondary': `rgba(${colors['--white']}, ${opacities['--12']})`,
  },
} as const;

export const themes: Theme & typeof theme = theme;

export const DarkNavigationTheme = {
  dark: true,
  colors: {
    primary: themes.dark['--text-primary'],
    background: themes.dark['--background-primary'],
    text: themes.dark['--text-primary'],
    border: 'rgb(39, 39, 41)',
    card: themes.dark['--background-primary'],
    notification: themes.dark['--red-500'],
  },
};
