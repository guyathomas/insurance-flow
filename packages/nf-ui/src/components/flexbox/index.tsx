/* eslint react/destructuring-assignment: 0 */
import * as React from 'react';

export type AlignItems = 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'stretch' | 'initial';

export type AlignContent = 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between' | 'stretch';

export type JustifyContent = 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between' | 'initial';

export type JustifyItems = 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between' | 'initial';

export type FlexDirection = 'column-reverse' | 'column' | 'row-reverse' | 'row';

interface Props {
  alignContent?: AlignContent;
  alignItems?: AlignItems;
  alignSelf?: AlignItems;
  children?: React.ReactNode;
  display?: 'flex' | 'inline-flex';
  as?: 'article' | 'aside' | 'div' | 'figure' | 'footer' | 'header' | 'main' | 'nav' | 'section';
  flex?: string | number;
  flexBasis?: string | number;
  flexDirection?: FlexDirection;
  flexGrow?: string | number;
  flexShrink?: string | number;
  flexWrap?: 'nowrap' | 'wrap-reverse' | 'wrap';
  height?: string | number;
  inline?: boolean;
  justifyContent?: JustifyContent;
  margin?: string | number;
  marginBottom?: string | number;
  marginLeft?: string | number;
  marginRight?: string | number;
  marginTop?: string | number;
  maxHeight?: string | number;
  maxWidth?: string | number;
  minHeight?: string | number;
  minWidth?: string | number;
  order?: number;
  padding?: string | number;
  paddingBottom?: string | number;
  paddingLeft?: string | number;
  paddingRight?: string | number;
  paddingTop?: string | number;
  style?: React.CSSProperties;
  width?: string | number;
}

export function Flexbox(props: Props): JSX.Element {
  const style: React.CSSProperties = {
    alignContent: props.alignContent,
    alignItems: props.alignItems,
    alignSelf: props.alignSelf,
    display: props.display || 'flex',
    flexBasis: props.flexBasis,
    flexDirection: props.flexDirection,
    flexGrow: props.flexGrow ? Number(props.flexGrow) : 'initial',
    flexShrink: props.flexShrink ? Number(props.flexShrink) : 'initial',
    flexWrap: props.flexWrap,
    flex: props.flex,
    height: props.height,
    justifyContent: props.justifyContent,
    margin: props.margin,
    marginBottom: props.marginBottom,
    marginLeft: props.marginLeft,
    marginRight: props.marginRight,
    marginTop: props.marginTop,
    maxHeight: props.maxHeight,
    maxWidth: props.maxWidth,
    minHeight: props.minHeight,
    minWidth: props.minWidth,
    order: props.order,
    padding: props.padding,
    paddingBottom: props.paddingBottom,
    paddingLeft: props.paddingLeft,
    paddingRight: props.paddingRight,
    paddingTop: props.paddingTop,
    width: props.width,
    ...props.style,
  };
  return <div style={style}>{props.children}</div>;
}

interface FlexCellProps {
  flex?: string | number;
  alignSelf?: AlignItems;
  children: React.ReactNode;
  height?: string | number;
  width?: string | number;
}

export function FlexCell(props: FlexCellProps): JSX.Element {
  const style = {
    flex: props.flex,
    alignSelf: props.alignSelf,
    height: props.height,
    width: props.width,
  };
  return <div style={style}>{props.children}</div>;
}
