import React from 'react';
import { DefinitionListType } from '.';
import {
  MiniIconName,
  MiniIconBusiness,
  MiniIconDocument,
  MiniIconDate,
  MiniIconCurrency,
  MiniIconNote,
  MiniIconHash,
} from '../mini-icons';

interface DefinitionListProps {
  type: DefinitionListType;
}

export default function DefinitionListIcon(props: DefinitionListProps): JSX.Element {
  const { type } = props;

  switch (type) {
    case 'name':
      return <MiniIconName />;
    case 'business':
      return <MiniIconBusiness />;
    case 'document':
      return <MiniIconDocument />;
    case 'date':
      return <MiniIconDate />;
    case 'dateRange':
      return <MiniIconDate />;
    case 'currency':
      return <MiniIconCurrency />;
    case 'note':
      return <MiniIconNote />;
    case 'number':
      return <MiniIconHash />;
    default:
      return <svg />;
  }
}
