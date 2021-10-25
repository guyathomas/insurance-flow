import React from 'react';
import { FadeIn } from '../fade-in';
import { Tab } from './hook';

interface Props {
  tab: Tab;
  children: React.ReactNode;
}

export function TabPanel(props: Props): JSX.Element {
  const { tab, children } = props;

  return (
    <div id={tab.panelId} role="tabpanel" aria-labelledby={tab.id} hidden={!tab.isActive}>
      <FadeIn duration="400ms">{children}</FadeIn>
    </div>
  );
}
