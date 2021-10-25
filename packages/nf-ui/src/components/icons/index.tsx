import React from 'react';
import styled from 'styled-components';

import { colors } from '../../theme/colors';

interface Props {
  color?: string;
  display?: string;
  size?: 12 | 16 | 24 | 32 | 40;
  rotate?: number;
  backgroundColor?: string;
  foregroundColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  isFullLogo?: boolean;
  isActive?: boolean;
  testId?: string;
}

/* eslint-disable  max-len */
export function Arrow({ color, size = 24, rotate = 0 }: Props): JSX.Element {
  return (
    <StyledSVG
      width={size}
      height={size}
      viewBox="0 0 22 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path
        d="M0.293006 8.293L8.00001 0.585999L9.41401 2L3.41401 8H21C21.553 8 22 8.448 22 9C22 9.552 21.553 10 21 10H3.41401L9.41401 16L8.00001 17.414L0.293006 9.707C-0.0979941 9.316 -0.0979941 8.684 0.293006 8.293Z"
        fill={color || '#333333'}
      />
    </StyledSVG>
  );
}

export function ExternalArrow({ color }: Props): JSX.Element {
  return (
    <StyledSVG width="12" height="12" viewBox="0 0 11 11" fill="none">
      <path
        d="M10 1L1 10M10 1H3.99971M10 1L9.9997 7"
        stroke={color || '#262D46'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StyledSVG>
  );
}

export function NewfrontLogo({ isFullLogo, primaryColor = '#0957C3', secondaryColor = '#D2D2D2' }: Props): JSX.Element {
  if (isFullLogo) {
    return (
      <StyledSVG xmlns="http://www.w3.org/2000/svg" width="126" viewBox="0 0 276 58">
        <g fill="none">
          <path
            fill={secondaryColor}
            d="M30 34.5h3.001v3.001H30V34.5zm-6 0h3.001v3.001H24V34.5zm6-6h3.001v3.001H30V28.5zm-6 0h3.001v3.001H24V28.5zm0-6h3.001v3.001H24V22.5zm-6 0h3.001v3.001H18V22.5zm-6 0h3.001v3.001H12V22.5zm6-6h3.001v3.001H18V16.5zm-6 0h3.001v3.001H12V16.5zm0-6h3.001v3.001H12V10.5zm-6 0h3.001v3.001H6V10.5zm-6 0h3.001v3.001H0V10.5zm6-6h3.001v3.001H6V4.5zm-6 0h3.001v3.001H0V4.5z"
          />
          <path
            fill={primaryColor}
            d="M30 22.5h3.001v3.001H30V22.5zm0-6l3 .005V19.5h-2.992l-.008-3zm-6 0h3.001v3.001H24V16.5zm6-6h3.001v3.001H30V10.5zm-6 0h3.001v3.001H24V10.5zm-6 0h3.001v3.001H18V10.5zm12-6h3.001v3.001H30V4.5zm-6 0h3.001v3.001H24V4.5zm-6 0h3.001v3.001H18V4.5zm-6 0h3.001v3.001H12V4.5zm66.917 35.523L58.276 9.717h-.21V33.51c0 3.94.367 4.202 2.468 4.622l1.89.368v1.47H51.5V38.5l1.576-.368c1.68-.368 2.258-.63 2.258-4.36V9.245c0-3.204-.472-3.466-2.048-3.834L51.5 5.042v-1.47h13.814l14.391 21.22h.21v-14.76c0-3.94-.315-4.15-2.468-4.622l-1.996-.368v-1.47h11.03v1.47l-1.576.368c-1.68.368-2.258.63-2.258 4.36v30.253h-3.73zm20.796.578c-9.14 0-13.71-5.463-13.71-14.392 0-9.139 6.776-14.234 13.71-14.234 7.248 0 11.765 3.625 11.922 13.131H94.303c.157 8.614 3.414 10.978 8.824 10.978 3.256 0 5.725-.946 7.72-1.996v1.733c-1.838 2.049-5.83 4.78-11.134 4.78zm-.42-26.63c-2.68 0-4.78 2.521-4.99 9.14l8.981-.473c0-6.356-.84-8.667-3.992-8.667zm24.16 26l-7.983-21.43c-1.156-3.1-1.786-3.73-3.152-4.15l-.998-.315v-1.365h14.812v1.365l-1.156.315c-.892.263-1.313.736-1.313 1.629 0 .788.368 1.943.84 3.414l3.887 12.133h.316l3.886-11.293-.577-1.733c-1.103-3.152-1.576-3.782-2.732-4.15l-1.05-.315v-1.365h14.654v1.365l-1.418.368c-.998.263-1.47.945-1.47 2.048 0 .683.21 1.681.63 2.942l3.991 12.133h.263l3.782-12.133c.42-1.366.63-2.259.63-2.994 0-1.05-.473-1.68-1.628-1.996l-1.418-.368v-1.365h9.716v1.365l-.945.315c-1.366.473-2.048 1.261-3.309 4.728l-7.563 20.851h-4.517l-5.673-16.177h-.158l-5.882 16.177h-4.465zm32.828 0v-1.419l1.365-.367c1.733-.473 1.944-.736 1.944-2.994V15.81h-3.677v-1.313l3.676-1.839V11.24c0-7.038 5.043-11.24 13.184-11.24 4.15 0 6.618 1.47 6.618 4.202 0 1.838-1.156 2.941-3.152 2.941-2.363 0-3.519-.84-3.729-3.571-.157-1.313-.367-1.524-.998-1.524-1.89 0-3.571 1.156-3.571 5.463v5.2h6.092l-.735 3.099h-5.357v19.276c0 2.468.157 2.784 1.838 3.046l1.996.42v1.418h-15.494zm18.488 0v-1.419l1.365-.367c1.734-.473 1.944-.736 1.944-2.994V18.856c0-2.259-.263-2.416-1.733-3.414l-1.734-1.156v-1.05l11.083-1.26.577.42-.105 3.624h.21c1.629-1.734 4.623-4.045 7.669-4.045 2.521 0 4.044 1.366 4.044 3.94 0 2.52-1.575 3.939-3.624 3.939-2.416 0-3.046-.735-4.044-2.364-.315-.577-.63-.682-1.103-.682-.946 0-2.154.682-2.889 1.365v17.018c0 2.468.21 2.731 1.786 2.994l1.733.367v1.418h-15.18zm36.421.63c-7.616 0-14.234-4.622-14.234-14.234 0-10.085 7.144-14.392 14.234-14.392 7.616 0 14.287 4.57 14.287 14.13 0 10.084-7.039 14.496-14.287 14.496zm.158-2.049c3.151 0 5.305-1.838 5.305-11.923 0-10.61-2.049-12.605-5.62-12.605-3.31 0-5.253 2.416-5.253 11.45 0 10.767 1.734 13.078 5.568 13.078zm14.204 1.418v-1.418l1.365-.367c1.734-.473 1.944-.736 1.944-2.994V18.856c0-2.259-.263-2.416-1.734-3.414l-1.733-1.156v-1.05l11.083-1.26.577.367-.105 3.362h.21c2.784-1.996 6.25-3.73 10.085-3.73 4.464 0 6.88 2.311 6.88 7.039V35.19c0 2.31.21 2.573 1.891 2.994l1.366.367v1.418h-14.654v-1.418l1.26-.315c1.576-.42 1.734-.578 1.734-3.046V21.062c0-3.204-1.156-4.202-3.624-4.202-1.839 0-3.73.42-4.885.683V35.19c0 2.521.157 2.626 1.733 3.046l1.26.315v1.418h-14.653zm41.463.63c-4.727 0-7.3-2.1-7.3-7.248V15.81h-3.31v-1.261c4.097-1.576 7.249-4.622 8.72-8.824h2.993v6.986h6.986l-.683 3.099h-6.303v17.017c0 2.626.788 3.677 3.414 3.677 1.26 0 2.837-.263 3.782-.473v1.47c-1.26 1.156-3.887 3.1-8.299 3.1zM162.788 57.776v-9.657h2.795v9.657h-2.795zm8.451 0v-9.657h3.12l3.093 5.443V48.12h2.418v9.657h-2.674l-3.526-6.064v6.064h-2.43zm17.785.162c-2.701 0-4.079-1.134-4.16-3.228h2.634c.067.689.378 1.256 1.526 1.256.797 0 1.242-.392 1.242-.959 0-.594-.364-.756-1.526-.932-2.728-.324-3.646-1.134-3.646-3.08 0-1.741 1.431-3.01 3.74-3.01 2.324 0 3.634.972 3.81 3.01h-2.567c-.094-.688-.486-1.039-1.242-1.039-.743 0-1.121.338-1.121.824 0 .54.297.783 1.499.945 2.445.27 3.7.905 3.7 2.999 0 1.769-1.404 3.214-3.89 3.214zm13.03 0c-2.728 0-4.281-1.378-4.281-4.079v-5.74h2.769v5.619c0 1.364.337 2.026 1.512 2.026 1.148 0 1.513-.622 1.513-2.067V48.12h2.796v5.7c0 2.809-1.648 4.12-4.309 4.12zm9.857-.162v-9.657h3.781c2.526 0 3.93 1.027 3.93 3.066v.054c0 1.378-.729 2.148-1.742 2.54l2.31 3.997h-2.917l-1.959-3.458h-.648v3.458h-2.755zm2.755-5.254h.891c.932 0 1.391-.392 1.391-1.175v-.054c0-.783-.486-1.094-1.377-1.094h-.905v2.323zm9.654 5.254l3.093-9.657h3.579l3.066 9.657h-2.931l-.513-1.796h-3.201l-.514 1.796h-2.58zm4.7-7.415l-1.067 3.714h2.12l-1.053-3.714zm9.897 7.415v-9.657h3.12l3.093 5.443V48.12h2.417v9.657h-2.674l-3.525-6.064v6.064h-2.431zm18.784.162c-3.377 0-5.038-1.972-5.038-4.93V52.9c0-2.971 2.107-4.93 4.93-4.93 2.512 0 4.254 1.162 4.484 3.715h-2.85c-.108-.986-.648-1.526-1.62-1.526-1.243 0-2.027.972-2.027 2.728v.108c0 1.742.743 2.728 2.067 2.728.972 0 1.661-.513 1.796-1.58h2.755c-.189 2.498-1.999 3.795-4.497 3.795zm9.465-.162v-9.657h6.672v2.134h-3.917v1.661h3.12v1.972h-3.12v1.756h4.133v2.134h-6.888z"
          />
        </g>
      </StyledSVG>
    );
  }
  return (
    <StyledSVG width="24" height="24" viewBox="0 0 286 286" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="260" y="260" width="26" height="26" fill={secondaryColor} />
      <rect x="208" y="260" width="26" height="26" fill={secondaryColor} />
      <rect x="260" y="208" width="26" height="26" fill={secondaryColor} />
      <rect x="208" y="208" width="26" height="26" fill={secondaryColor} />
      <rect x="208" y="156" width="26" height="26" fill={secondaryColor} />
      <rect x="156" y="156" width="26" height="26" fill={secondaryColor} />
      <rect x="104" y="156" width="26" height="26" fill={secondaryColor} />
      <rect x="156" y="104" width="26" height="26" fill={secondaryColor} />
      <rect x="104" y="104" width="26" height="26" fill={secondaryColor} />
      <rect x="104" y="52" width="26" height="26" fill={secondaryColor} />
      <rect x="52" y="52" width="26" height="26" fill={secondaryColor} />
      <rect y="52" width="26" height="26" fill={secondaryColor} />
      <rect x="52" width="26" height="26" fill={secondaryColor} />
      <rect width="26" height="26" fill={secondaryColor} />
      <rect x="260" y="156" width="26" height="26" fill={primaryColor} />
      <rect x="260" y="104" width="26" height="26" fill={primaryColor} />
      <rect x="208" y="104" width="26" height="26" fill={primaryColor} />
      <rect x="260" y="52" width="26" height="26" fill={primaryColor} />
      <rect x="208" y="52" width="26" height="26" fill={primaryColor} />
      <rect x="156" y="52" width="26" height="26" fill={primaryColor} />
      <rect x="260" width="26" height="26" fill={primaryColor} />
      <rect x="208" width="26" height="26" fill={primaryColor} />
      <rect x="156" width="26" height="26" fill={primaryColor} />
      <rect x="104" width="26" height="26" fill={primaryColor} />
    </StyledSVG>
  );
}

export function ArchivePaperCheck({ backgroundColor, foregroundColor }: Props): JSX.Element {
  return (
    <StyledSVG width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M29 7V22C29 22.2652 28.8946 22.5196 28.7071 22.7071C28.5196 22.8946 28.2652 23 28 23H21V26H11V23H4C3.73478 23 3.48043 22.8946 3.29289 22.7071C3.10536 22.5196 3 22.2652 3 22V7H1V27C1 28.0609 1.42143 29.0783 2.17157 29.8284C2.92172 30.5786 3.93913 31 5 31H27C28.0609 31 29.0783 30.5786 29.8284 29.8284C30.5786 29.0783 31 28.0609 31 27V7H29Z"
        fill={backgroundColor || '#D47239'}
      />
      <path
        d="M26 1H6C5.73478 1 5.48043 1.10536 5.29289 1.29289C5.10536 1.48043 5 1.73478 5 2V20C5 20.2652 5.10536 20.5196 5.29289 20.7071C5.48043 20.8946 5.73478 21 6 21H26C26.2652 21 26.5196 20.8946 26.7071 20.7071C26.8946 20.5196 27 20.2652 27 20V2C27 1.73478 26.8946 1.48043 26.7071 1.29289C26.5196 1.10536 26.2652 1 26 1ZM14.707 15.707C14.5195 15.8945 14.2652 15.9998 14 15.9998C13.7348 15.9998 13.4805 15.8945 13.293 15.707L9.586 12L11 10.586L14 13.586L21 6.586L22.414 8L14.707 15.707Z"
        fill={foregroundColor || '#FFAB7A'}
      />
    </StyledSVG>
  );
}

export function Caret({ color = colors.brand[400], rotate = 0, display }: Props): JSX.Element {
  return (
    <StyledSVG width="9" height="7" viewBox="0 0 9 7" fill="none" display={display}>
      <path
        d="M8.07118 1.53553L4.53564 5.07107L1.00011 1.53553"
        style={{
          transform: `rotate(${rotate}deg)`,
          transformOrigin: 'center',
        }}
        stroke={color}
        strokeWidth="2"
      />
    </StyledSVG>
  );
}

export function IconClock({ color }: Props): JSX.Element {
  return (
    <StyledSVG width="16" height="16" viewBox="0 0 16 16">
      <path
        d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 14C4.7 14 2 11.3 2 8C2 4.7 4.7 2 8 2C11.3 2 14 4.7 14 8C14 11.3 11.3 14 8 14Z"
        fill={color || '#333333'}
      />
      <path d="M9 4H7V9H12V7H9V4Z" fill={color || '#333333'} />
    </StyledSVG>
  );
}

export function FileContent({ color }: Props): JSX.Element {
  return (
    <StyledSVG x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16">
      <g transform="translate(0, 0)">
        <line
          fill="none"
          stroke={color || colors.brand[400]}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          x1="4.5"
          y1="11.5"
          x2="11.5"
          y2="11.5"
          data-color="color-2"
        />
        <line
          fill="none"
          stroke={color || colors.brand[400]}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          x1="4.5"
          y1="8.5"
          x2="11.5"
          y2="8.5"
          data-color="color-2"
        />
        <line
          fill="none"
          stroke={color || colors.brand[400]}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          x1="4.5"
          y1="5.5"
          x2="6.5"
          y2="5.5"
          data-color="color-2"
        />
        <polygon
          fill="none"
          stroke={color || colors.brand[400]}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          points="9.5,0.5
    1.5,0.5 1.5,15.5 14.5,15.5 14.5,5.5 "
        />
        <polyline
          fill="none"
          stroke={color || colors.brand[400]}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          points="9.5,0.5
    9.5,5.5 14.5,5.5 "
        />
      </g>
    </StyledSVG>
  );
}

export function FileAdd({ color }: Props): JSX.Element {
  return (
    <StyledSVG x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16">
      <g transform="translate(0, 0)">
        <polyline
          fill="none"
          stroke={color || colors.brand[400]}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          points="6.5,15.5
    0.5,15.5 0.5,0.5 13.5,0.5 13.5,5.5 "
        />
        <line
          fill="none"
          stroke={color || colors.brand[400]}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          x1="3.5"
          y1="3.5"
          x2="10.5"
          y2="3.5"
        />
        <line
          fill="none"
          stroke={color || colors.brand[400]}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          x1="3.5"
          y1="6.5"
          x2="7.5"
          y2="6.5"
        />
        <line
          fill="none"
          stroke={color || colors.brand[400]}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          x1="3.5"
          y1="9.5"
          x2="5.5"
          y2="9.5"
        />
        <line
          fill="none"
          stroke={color || colors.brand[400]}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          x1="3.5"
          y1="12.5"
          x2="5.5"
          y2="12.5"
        />
        <circle
          fill="none"
          stroke={color || colors.brand[400]}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          cx="11.5"
          cy="11.5"
          r="4"
          data-color="color-2"
        />
        <line
          fill="none"
          stroke={color || colors.brand[400]}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          x1="11.5"
          y1="9.5"
          x2="11.5"
          y2="13.5"
          data-color="color-2"
        />
        <line
          fill="none"
          stroke={color || colors.brand[400]}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          x1="9.5"
          y1="11.5"
          x2="13.5"
          y2="11.5"
          data-color="color-2"
        />
      </g>
    </StyledSVG>
  );
}

export function IconTick({ color }: Props): JSX.Element {
  return (
    <StyledSVG width="14" height="9" viewBox="0 0 12 9" fill="none">
      <path
        d="M10.2929 0.293041L3.99992 6.58604L1.70692 4.29304C1.51832 4.11088 1.26571 4.01009 1.00352 4.01237C0.741321 4.01465 0.490508 4.11981 0.3051 4.30522C0.119692 4.49063 0.0145233 4.74144 0.0122448 5.00364C0.00996641 5.26584 0.110761 5.51844 0.292919 5.70704L3.29292 8.70704C3.48045 8.89451 3.73475 8.99983 3.99992 8.99983C4.26508 8.99983 4.51939 8.89451 4.70692 8.70704L11.7069 1.70704C11.8891 1.51844 11.9899 1.26584 11.9876 1.00364C11.9853 0.741443 11.8801 0.49063 11.6947 0.305222C11.5093 0.119814 11.2585 0.0146453 10.9963 0.0123669C10.7341 0.0100885 10.4815 0.110883 10.2929 0.293041Z"
        fill={color || 'white'}
      />
    </StyledSVG>
  );
}

export function IconCheckActive({ size = 40 }: Props): JSX.Element {
  return (
    <StyledSVG width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#1CB779" />
      <path
        d="M20.2929 12.293L13.9999 18.586L11.7069 16.293C11.5183 16.1109 11.2657 16.0101 11.0035 16.0124C10.7413 16.0146 10.4905 16.1198 10.3051 16.3052C10.1197 16.4906 10.0145 16.7414 10.0122 17.0036C10.01 17.2658 10.1108 17.5184 10.2929 17.707L13.2929 20.707C13.4804 20.8945 13.7348 20.9998 13.9999 20.9998C14.2651 20.9998 14.5194 20.8945 14.7069 20.707L21.7069 13.707C21.8891 13.5184 21.9899 13.2658 21.9876 13.0036C21.9853 12.7414 21.8801 12.4906 21.6947 12.3052C21.5093 12.1198 21.2585 12.0146 20.9963 12.0124C20.7341 12.0101 20.4815 12.1109 20.2929 12.293Z"
        fill="#FFFFFF"
      />
    </StyledSVG>
  );
}

export function IconRadioButton({ isActive }: Props): JSX.Element {
  return isActive ? <IconRadioButtonActive /> : <IconRadioButtonInactive />;
}

export function IconRadioButtonActive(): JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="10" fill={colors.brand[400]} />
      <g clipPath="url(#clip0)">
        <path
          d="M8.07574 14.2985L4.17574 10.3985C3.94144 10.1642 3.94144 9.78431 4.17574 9.54999L5.02425 8.70145C5.25855 8.46713 5.63847 8.46713 5.87278 8.70145L8.50001 11.3287L14.1272 5.70145C14.3615 5.46715 14.7415 5.46715 14.9758 5.70145L15.8243 6.54999C16.0586 6.78429 16.0586 7.16419 15.8243 7.39852L8.92427 14.2985C8.68994 14.5328 8.31004 14.5328 8.07574 14.2985V14.2985Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="12" height="12" fill="white" transform="translate(4 4)" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function IconRadioButtonInactive(): JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="9.5" fill="white" stroke="#DBDBDB" />
    </svg>
  );
}

export function IconLightning({ color = '#1CB779' }: Props): JSX.Element {
  return (
    <StyledSVG width="9" height="13" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.874876 12.25C0.817199 12.25 0.759236 12.2331 0.708818 12.198C0.589617 12.1154 0.549312 11.9576 0.614111 11.8279L3.31972 6.41667H0.291685C0.192705 6.41667 0.100565 6.36654 0.046732 6.28337C-0.00695797 6.20019 -0.0149352 6.09552 0.0256532 6.00537L2.65065 0.17204C2.69779 0.0673633 2.8019 0 2.91669 0H6.70835C6.80947 0 6.90332 0.0524096 6.95644 0.138285C7.00956 0.224303 7.0144 0.331686 6.96926 0.422117L5.43032 3.5H8.45835C8.57442 3.5 8.67938 3.56879 8.72566 3.67503C8.77209 3.78141 8.75101 3.90517 8.67212 3.9902L1.08878 12.1569C1.03168 12.2182 0.953632 12.25 0.874876 12.25Z"
        fill={color}
      />
    </StyledSVG>
  );
}

export function IconSearch({ color = colors.steel[400], testId }: Props): JSX.Element {
  return (
    <StyledSVG width="14" height="14" viewBox="0 0 14 14" fill="none" data-testid={testId}>
      <path
        d="M13.8086 12.1051L11.0824 9.37891C10.9594 9.25586 10.7926 9.1875 10.6176 9.1875H10.1719C10.9266 8.22227 11.375 7.0082 11.375 5.6875C11.375 2.5457 8.8293 0 5.6875 0C2.5457 0 0 2.5457 0 5.6875C0 8.8293 2.5457 11.375 5.6875 11.375C7.0082 11.375 8.22227 10.9266 9.1875 10.1719V10.6176C9.1875 10.7926 9.25586 10.9594 9.37891 11.0824L12.1051 13.8086C12.3621 14.0656 12.7777 14.0656 13.032 13.8086L13.8059 13.0348C14.0629 12.7777 14.0629 12.3621 13.8086 12.1051ZM5.6875 9.1875C3.7543 9.1875 2.1875 7.62344 2.1875 5.6875C2.1875 3.7543 3.75156 2.1875 5.6875 2.1875C7.6207 2.1875 9.1875 3.75156 9.1875 5.6875C9.1875 7.6207 7.62344 9.1875 5.6875 9.1875Z"
        fill={color}
      />
    </StyledSVG>
  );
}

const StyledSVG = styled.svg<{ display?: string }>`
  display: ${({ display }) => display || 'block'};
`;

export function SpreadsheetIcon({ testId }: Props): JSX.Element {
  return (
    <StyledSVG width="20" height="24" viewBox="0 0 20 24" fill="none" data-testid={testId}>
      <rect width="20" height="24" rx="1" fill="#1CB779" />
      <rect x="3" y="9" width="6" height="2" fill="white" />
      <rect x="3" y="12" width="6" height="2" fill="white" />
      <rect x="3" y="15" width="6" height="2" fill="white" />
      <rect x="11" y="9" width="6" height="2" fill="white" />
      <rect x="11" y="12" width="6" height="2" fill="white" />
      <rect x="11" y="15" width="6" height="2" fill="white" />
    </StyledSVG>
  );
}
