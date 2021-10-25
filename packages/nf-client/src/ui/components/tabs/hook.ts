import { useState, useMemo } from 'react';
import { camelCase } from 'camel-case';

export interface Tab {
  id: string;
  panelId: string;
  label: string;
  isActive: boolean;
}

interface Options {
  initialSelected?: number;
  labels: string[];
}

export function useTabs(
  options: Options,
): {
  tabs: Tab[];
  selectTab: (index: number) => void;
  activeIndex: number;
} {
  const { initialSelected = 0, labels } = options;
  const [activeIndex, selectTab] = useState<number>(initialSelected || 0);

  const formattedTabs: Tab[] = useMemo(
    () =>
      labels.map((tab, index) => {
        const slug = camelCase(tab);
        const panelId = `tabpanel-${slug}`;

        return {
          id: `tab-${slug}`,
          panelId,
          label: tab,
          isActive: activeIndex === index,
        };
      }),
    [labels.join(''), activeIndex],
  );

  return {
    tabs: formattedTabs,
    selectTab,
    activeIndex,
  };
}
