/* eslint-env browser */
import React, { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  name: string;
  children: React.ReactNode;
}

function createRootElement(id: string): HTMLDivElement {
  const el = document.createElement('div');
  el.setAttribute('id', id);
  document.body.appendChild(el);
  return el;
}

export function usePortal(id: string): HTMLElement | null {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const existingParent = document.querySelector(`#${id}`);
    const el = (existingParent as HTMLDivElement) || createRootElement(id);
    setContainer(el);
  }, []);

  return container;
}

export function Portal(props: PortalProps): React.ReactPortal | null {
  const container = usePortal(props.name);
  if (!container) {
    return null;
  }
  return createPortal(props.children, container);
}
