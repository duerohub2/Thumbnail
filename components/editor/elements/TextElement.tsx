'use client';

import { useRef } from 'react';
import { Text } from 'react-konva';
import type Konva from 'konva';
import type { TextElementData } from '@/types';

interface Props {
  element: TextElementData;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (patch: Partial<TextElementData>) => void;
}

export function TextElement({
  element,
  isSelected,
  onSelect,
  onChange
}: Props) {
  const ref = useRef<Konva.Text>(null);

  return (
    <Text
      ref={ref}
      id={element.id}
      name="selectable-element"
      x={element.x}
      y={element.y}
      width={element.width}
      text={element.text}
      fontSize={element.fontSize}
      fontFamily={element.fontFamily}
      fontStyle={element.fontWeight >= 700 ? 'bold' : 'normal'}
      fill={element.fill}
      stroke={element.stroke}
      strokeWidth={element.strokeWidth}
      strokeAfterFill
      align={element.align}
      letterSpacing={element.letterSpacing}
      lineHeight={element.lineHeight}
      rotation={element.rotation}
      opacity={element.opacity}
      visible={element.visible}
      listening={!element.locked}
      draggable={isSelected && !element.locked}
      shadowColor={element.shadowColor}
      shadowBlur={element.shadowBlur}
      shadowOffsetX={element.shadowOffsetX}
      shadowOffsetY={element.shadowOffsetY}
      shadowEnabled={
        element.shadowBlur > 0 ||
        element.shadowOffsetX !== 0 ||
        element.shadowOffsetY !== 0
      }
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={(e) => {
        onChange({ x: e.target.x(), y: e.target.y() });
      }}
      onTransformEnd={() => {
        const node = ref.current;
        if (!node) return;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        node.scaleX(1);
        node.scaleY(1);
        onChange({
          x: node.x(),
          y: node.y(),
          width: Math.max(40, node.width() * scaleX),
          rotation: node.rotation(),
          fontSize: Math.max(8, Math.round(element.fontSize * scaleY))
        });
      }}
    />
  );
}
