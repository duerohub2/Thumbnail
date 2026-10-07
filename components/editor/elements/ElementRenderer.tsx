'use client';

import { TextElement } from './TextElement';
import { ImageElement } from './ImageElement';
import { BadgeElement } from './BadgeElement';
import type { CanvasElement } from '@/types';

interface Props {
  element: CanvasElement;
  onSelect: () => void;
  onChange: (patch: Partial<CanvasElement>) => void;
}

export function ElementRenderer({ element, onSelect, onChange }: Props) {
  if (element.type === 'text') {
    return (
      <TextElement
        element={element}
        onSelect={onSelect}
        onChange={onChange}
      />
    );
  }

  if (element.type === 'image') {
    return (
      <ImageElement
        element={element}
        onSelect={onSelect}
        onChange={onChange}
      />
    );
  }

  if (element.type === 'badge') {
    return (
      <BadgeElement
        element={element}
        onSelect={onSelect}
        onChange={onChange}
      />
    );
  }

  return null;
}
