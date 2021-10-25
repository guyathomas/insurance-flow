import { colors as newColors } from './colors';
// Color variables
// _xl for extra light
// _l for light
// _d for dark
// _xd for extra dark

export const colors = {
  // primary
  primary_xxxl: '#F6F8FF',
  primary_xxl: '#F4F8FE',
  primary_xl: '#CEE2FD',
  primary_l: '#83B5F9',
  primary: '#0957C3',
  primary_d: '#063E8B',
  primary_xd: '#042553',
  primary_xxd: '#021A3C',
  // secondary
  secondary_xl: '#FFF2EB',
  secondary_l: '#FCC3A2',
  secondary: '#FFAB7A',
  secondary_d: '#D47239',
  secondary_xd: '#854621',
  // gray
  gray_xxl: '#F5F6F8',
  gray_xl: '#D6DBDF',
  gray_l: '#B8BEC2',
  gray: '#8B8F98',
  gray_d: '#3D464D',
  // green
  green_l: '#dff0d8',
  green_xl: '#E5FCF3',
  green: '#30D694',
  green_d: '#1CB779',
  // red
  red_xl: '#FFEBEB',
  red_l: '#E42F4A',
  red: '#C00D0D',
  red_d: '#A40B0B',
  red_xd: '#7F0808',
  // orange
  orange_l: '#FCC3A2',
  // brown
  brown_xl: '#FFF5EE',
  brown_l: '#AA9C95',
  brown: '#7C6860',
  // pink
  pink: '#E35298',
  pink_3: '#FF7A7A',
  // new colors
  text_default: newColors.steel[400],
  text_placeholder: newColors.steel[300],
};

export type Color = keyof typeof colors;

export const fontFamilies = {
  body: "'Open Sans', sans-serif",
  displayHeader: "'PublicoText-Bold', serif",
};

export type SpacingValue =
  | 0
  | 2
  | 4
  | 8
  | 12
  | 16
  | 20
  | 24
  | 32
  | 40
  | 48
  | 56
  | 64
  | 72
  | 80
  | 88
  | 96
  | 104
  | 112
  | 120;
