/* eslint-env browser */
import { useEffect, useState } from 'react';
import Tether from 'tether';

interface Constraint {
  to: string;
  pin: boolean | string[];
  attachment: string;
}

export interface TetherOptions {
  attachment: string;
  targetAttachment?: string;
  offset?: string;
  targetOffset?: string;
  targetModifier?: 'visible' | 'scroll-handle';
  enabled?: boolean;
  constraints?: Constraint[];
}

export function useTether(
  options: TetherOptions,
): {
  elementRef: (node: HTMLElement | null) => void;
  targetRef: (node: HTMLElement | null) => void;
} {
  const {
    attachment,
    targetAttachment = attachment,
    offset = '0 0',
    targetOffset = '0 0',
    targetModifier,
    constraints,
  } = options;

  const [elementEl, setElement] = useState<HTMLElement | null>(null);
  const [targetEl, setTarget] = useState<HTMLElement | null>(null);

  let tether =
    typeof document === 'undefined' || !elementEl || !targetEl
      ? undefined
      : new Tether({
          element: elementEl,
          target: targetEl,
          attachment,
          targetAttachment,
          offset,
          targetOffset,
          targetModifier,
          constraints,
        });

  function reposition(): void {
    if (tether) tether.position();
  }

  function destroy(): void {
    if (tether) tether.destroy();
  }

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    if (!elementEl || !targetEl) return undefined;

    tether = new Tether({
      element: elementEl,
      target: targetEl,
      attachment,
      targetAttachment,
      offset,
      targetOffset,
      targetModifier,
      constraints,
    });

    reposition();

    window.addEventListener('resize', reposition);
    document.body.addEventListener('resize', reposition);

    return () => {
      window.removeEventListener('resize', reposition);
      destroy();
    };
  }, [elementEl, targetEl, attachment, targetAttachment, offset, targetOffset, targetModifier, constraints]);

  return { elementRef: setElement, targetRef: setTarget };
}
