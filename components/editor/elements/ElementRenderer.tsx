'use client';

import { TextElement } from './TextElement';
import { ImageElement } from './ImageElement';
import { BadgeElement } from './BadgeElement';
import { PlaceholderElement } from './PlaceholderElement';
import type { CanvasElement } from '@/types';

interface Props {
  element: CanvasElement;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (patch: Partial<CanvasElement>) => void;
  onPickImage: (id: string) => void;
}

export function ElementRenderer({
  element,
  isSelected,
  onSelect,
  onChange,
  onPickImage
}: Props) {
  if (element.type === 'text') {
    return (
      <TextElement
        element={element}
        isSelected={isSelected}
        onSelect={onSelect}
        onChange={onChange}
      />
    );
  }

  if (element.type === 'image') {
    return (
      <ImageElement
        element={element}
        isSelected={isSelected}
        onSelect={onSelect}
        onChange={onChange}
      />
    );
  }

  if (element.type === 'badge') {
    return (
      <BadgeElement
        element={element}
        isSelected={isSelected}
        onSelect={onSelect}
        onChange={onChange}
      />
    );
  }

  if (element.type === 'placeholder') {
    return (
      <PlaceholderElement
        element={element}
        isSelected={isSelected}
        onSelect={onSelect}
        onChange={onChange}
        onPickImage={() => onPickImage(element.id)}
      />
    );
  }

  return null;
}
