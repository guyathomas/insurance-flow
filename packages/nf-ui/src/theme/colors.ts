export const colors = {
  steel: {
    500: '#262D46',
    400: '#546A83',
    300: '#98A6B5',
    200: '#BEC7D0',
    100: '#F4F5F6',
    50: '#F8F8F8',
  },
  brand: {
    400: '#0957C3',
    300: '#257FFB',
    200: '#A8CBFB',
    100: '#F4F8FE',
  },
  peach: {
    500: '#FFAB7A',
  },
  fire: {
    600: '#DF0762',
    500: '#FF4773',
    400: '#FF7A7A',
    300: '#FCC3A2',
    200: '#FFF3CA',
    100: '#FFFCF0',
  },
  grass: {
    500: '#1C907C',
    400: '#1CB779',
    300: '#97E4A8',
    200: '#C3FFC1',
    100: '#EFFFEB',
  },
};

export type Color = keyof typeof colors;
