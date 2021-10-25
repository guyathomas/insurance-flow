import React from 'react';
import { colors } from '../../theme/colors';

interface Props {
  color?: string;
}

const DEFAULT_COLOR = colors.steel[400];

/* eslint-disable  max-len */
export const MiniIconName = ({ color = DEFAULT_COLOR }: Props): JSX.Element => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6 6.75C4.35 6.75 3 5.4 3 3.75V3C3 1.35 4.35 0 6 0C7.65 0 9 1.35 9 3V3.75C9 5.4 7.65 6.75 6 6.75Z"
      fill={color}
    />
    <path d="M7.5 8.25H4.5C2.4 8.25 0.75 9.9 0.75 12H11.25C11.25 9.9 9.6 8.25 7.5 8.25Z" fill={color} />
  </svg>
);

export const MiniIconBusiness = ({ color = DEFAULT_COLOR }: Props): JSX.Element => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.75 6V0.75C9.75 0.3 9.45 0 9 0H3C2.55 0 2.25 0.3 2.25 0.75V6H0V12H12V6H9.75ZM7.5 9.75H4.5V8.25H7.5V9.75ZM7.5 6.75H4.5V5.25H7.5V6.75ZM7.5 3.75H4.5V2.25H7.5V3.75Z"
      fill={color}
    />
  </svg>
);

export const MiniIconDocument = ({ color = DEFAULT_COLOR }: Props): JSX.Element => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.25 11.25V3.75L7.5 0H1.5C1.05 0 0.75 0.3 0.75 0.75V11.25C0.75 11.7 1.05 12 1.5 12H10.5C10.95 12 11.25 11.7 11.25 11.25ZM2.25 1.5H6.75V4.5H9.75V10.5H2.25V1.5Z"
      fill={color}
    />
  </svg>
);

export const MiniIconDate = ({ color = DEFAULT_COLOR }: Props): JSX.Element => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11 2H10V0H8V2H4V0H2V2H1C0.734784 2 0.48043 2.10536 0.292893 2.29289C0.105357 2.48043 0 2.73478 0 3L0 11C0 11.2652 0.105357 11.5196 0.292893 11.7071C0.48043 11.8946 0.734784 12 1 12H11C11.2652 12 11.5196 11.8946 11.7071 11.7071C11.8946 11.5196 12 11.2652 12 11V3C12 2.73478 11.8946 2.48043 11.7071 2.29289C11.5196 2.10536 11.2652 2 11 2V2ZM10 10H2V5H10V10Z"
      fill={color}
    />
  </svg>
);

export const MiniIconCurrency = ({ color = DEFAULT_COLOR }: Props): JSX.Element => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.25 1.5H0.75C0.3 1.5 0 1.8 0 2.25V9.75C0 10.2 0.3 10.5 0.75 10.5H11.25C11.7 10.5 12 10.2 12 9.75V2.25C12 1.8 11.7 1.5 11.25 1.5ZM8.325 9H3.675C3.375 7.95 2.55 7.125 1.5 6.825V5.175C2.55 4.875 3.375 4.05 3.675 3H8.4C8.7 4.05 9.525 4.875 10.575 5.175V6.9C9.45 7.125 8.625 7.95 8.325 9Z"
      fill={color}
    />
    <path
      d="M6 7.5C6.82843 7.5 7.5 6.82843 7.5 6C7.5 5.17157 6.82843 4.5 6 4.5C5.17157 4.5 4.5 5.17157 4.5 6C4.5 6.82843 5.17157 7.5 6 7.5Z"
      fill={color}
    />
  </svg>
);

export const MiniIconNote = ({ color = DEFAULT_COLOR }: Props): JSX.Element => (
  <svg height="12" width="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
    <g fill={color}>
      <path d="M10,0H2A1,1,0,0,0,1,1V11a1,1,0,0,0,1,1h8a1,1,0,0,0,1-1V1A1,1,0,0,0,10,0ZM9,10H3V2H9Z" fill={color} />
      <rect height="1" width="4" x="4" y="4" />
      <rect height="1" width="4" x="4" y="7" />
    </g>
  </svg>
);

export const MiniIconHash = ({ color = DEFAULT_COLOR }: Props): JSX.Element => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.28467 5.06301L8.82725 6.96986H11.3382V8.66301H8.44769L7.6983 12H5.55718L6.3163 8.66301H4.42822L3.68856 12H1.59611L2.3163 8.66301H0V6.96986H2.69586L3.15328 5.06301H0.70073V3.34521H3.51338L4.26277 0H6.39416L5.64477 3.34521H7.57178L8.3309 0H10.4234L9.66423 3.34521H12V5.06301H9.28467ZM4.80779 6.96986H6.71533L7.17275 5.06301H5.26521L4.80779 6.96986Z"
      fill={color}
    />
  </svg>
);

export const MiniIconHourGlass = ({ color = DEFAULT_COLOR }: Props): JSX.Element => (
  <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1.5H10" stroke={color} strokeWidth="1.66667" strokeMiterlimit="10" strokeLinecap="square" />
    <path d="M1 12.5H10" stroke={color} strokeWidth="1.66667" strokeMiterlimit="10" strokeLinecap="square" />
    <path
      d="M3.5 10.9999V10.6054C3.50003 10.5071 3.52907 10.4109 3.5835 10.3289L5.0835 8.07894C5.12916 8.01046 5.19102 7.95431 5.26359 7.91548C5.33616 7.87664 5.41719 7.85632 5.4995 7.85632C5.58181 7.85632 5.66284 7.87664 5.73541 7.91548C5.80798 7.95431 5.86984 8.01046 5.9155 8.07894L7.4155 10.3289C7.47029 10.4111 7.49952 10.5077 7.4995 10.6064V10.9999H3.5Z"
      fill={color}
    />
    <path
      d="M2 12.5V10.6055C2.00001 10.2106 2.11692 9.82455 2.336 9.496L4 7L2.336 4.504C2.11692 4.17545 2.00001 3.78939 2 3.3945V1.5"
      stroke={color}
      strokeWidth="1.66667"
      strokeMiterlimit="10"
    />
    <path
      d="M9 1.5V3.3945C8.99999 3.78939 8.88308 4.17545 8.664 4.504L7 7L8.664 9.496C8.88308 9.82455 8.99999 10.2106 9 10.6055V12.5"
      stroke={color}
      strokeWidth="1.66667"
      strokeMiterlimit="10"
    />
  </svg>
);

export const MiniIconPerson = ({ color = DEFAULT_COLOR }: Props): JSX.Element => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6 6.75C4.35 6.75 3 5.4 3 3.75V3C3 1.35 4.35 0 6 0C7.65 0 9 1.35 9 3V3.75C9 5.4 7.65 6.75 6 6.75Z"
      fill={color}
    />
    <path d="M7.5 8.25H4.5C2.4 8.25 0.75 9.9 0.75 12H11.25C11.25 9.9 9.6 8.25 7.5 8.25Z" fill={color} />
  </svg>
);

export const MiniIconContactCard = ({ color }: Props): JSX.Element => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.25 1.5H9.75C9.3 1.5 9 1.8 9 2.25C9 2.7 8.7 3 8.25 3C7.8 3 7.5 2.7 7.5 2.25C7.5 1.8 7.2 1.5 6.75 1.5H5.25C4.8 1.5 4.5 1.8 4.5 2.25C4.5 2.7 4.2 3 3.75 3C3.3 3 3 2.7 3 2.25C3 1.8 2.7 1.5 2.25 1.5H0.75C0.3 1.5 0 1.8 0 2.25V9.75C0 10.2 0.3 10.5 0.75 10.5H11.25C11.7 10.5 12 10.2 12 9.75V2.25C12 1.8 11.7 1.5 11.25 1.5ZM5.25 8.25H2.25V5.25H5.25V8.25ZM9.75 8.25H6.75V7.5H9.75V8.25ZM9.75 6H6.75V5.25H9.75V6Z"
      fill={color}
    />
  </svg>
);

export const MiniIconQuestionMark = ({ color = '#B8BEC2' }: Props): JSX.Element => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="6" r="6" fill={color} />
    <path
      d="M5.0439 7.64992V7.28802C5.0439 6.97503 5.11231 6.7028 5.24914 6.47131C5.38596 6.23983 5.63626 5.99368 6.00001 5.73285C6.35042 5.48833 6.58069 5.28945 6.69082 5.13622C6.80429 4.98298 6.86102 4.81181 6.86102 4.62272C6.86102 4.4108 6.78093 4.24941 6.62074 4.13856C6.46055 4.02771 6.23696 3.97228 5.94996 3.97228C5.44937 3.97228 4.87871 4.13204 4.23796 4.45155L3.69232 3.38054C4.43652 2.973 5.22578 2.76923 6.06008 2.76923C6.74755 2.76923 7.29319 2.93061 7.69699 3.25338C8.10414 3.57615 8.30771 4.00652 8.30771 4.54447C8.30771 4.9031 8.22428 5.21283 8.05741 5.47366C7.89055 5.73448 7.57352 6.02791 7.1063 6.35394C6.78593 6.58543 6.58236 6.76148 6.49559 6.88211C6.41216 7.00275 6.37045 7.16087 6.37045 7.35649V7.64992H5.0439ZM4.88371 9.32246C4.88371 9.04859 4.9588 8.84156 5.10897 8.70137C5.25915 8.56118 5.47774 8.49108 5.76474 8.49108C6.04173 8.49108 6.25531 8.56281 6.40549 8.70626C6.559 8.84972 6.63576 9.05512 6.63576 9.32246C6.63576 9.58003 6.559 9.7838 6.40549 9.93377C6.25197 10.0805 6.03839 10.1538 5.76474 10.1538C5.48441 10.1538 5.26749 10.0821 5.11398 9.93866C4.96047 9.79195 4.88371 9.58655 4.88371 9.32246Z"
      fill="#ffffff"
    />
  </svg>
);

export const MiniIconPlus = ({ color = DEFAULT_COLOR }: Props): JSX.Element => (
  <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.1429 5.21429H7.28571V1.35714C7.28571 0.883839 6.90188 0.5 6.42857 0.5H5.57143C5.09812 0.5 4.71429 0.883839 4.71429 1.35714V5.21429H0.857143C0.383839 5.21429 0 5.59812 0 6.07143V6.92857C0 7.40188 0.383839 7.78571 0.857143 7.78571H4.71429V11.6429C4.71429 12.1162 5.09812 12.5 5.57143 12.5H6.42857C6.90188 12.5 7.28571 12.1162 7.28571 11.6429V7.78571H11.1429C11.6162 7.78571 12 7.40188 12 6.92857V6.07143C12 5.59812 11.6162 5.21429 11.1429 5.21429Z"
      fill={color}
    />
  </svg>
);

export const MiniIconClock = ({ color = DEFAULT_COLOR }: Props): JSX.Element => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 2.5V6H9.5" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M6 11.5C9.03757 11.5 11.5 9.03757 11.5 6C11.5 2.96243 9.03757 0.5 6 0.5C2.96243 0.5 0.5 2.96243 0.5 6C0.5 9.03757 2.96243 11.5 6 11.5Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
