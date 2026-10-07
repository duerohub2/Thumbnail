'use client';

import { useRef } from 'react';
import { Group, Rect, Text } from 'react-konva';
import type Konva from 'konva';
import type { BadgeElementData } from '@/types';

interface Props {
  element: BadgeElementData;
  onSelect: () => void;
  onChange: (patch: Partial<BadgeElementData>) => void;
}

export function BadgeElement({ element, onSelect, onChange }: Props) {
  const groupRef = useRef<Konva.Group>(null);

  return (
    <Group
      ref={groupRef}
      id={element.id}
      name="selectable-element"
      x={element.x}
      y={element.y}
      rotation={element.rotation}
      opacity={element.opacity}
      visible={element.visible}
      listening={!element.locked}
      draggable={!element.locked}
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={(e) => {
        onChange({ x: e.target.x(), y: e.target.y() });
      }}
      onTransformEnd={() => {
        const node = groupRef.current;
        if (!node) return;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        node.scaleX(1);
        node.scaleY(1);
        onChange({
          x: node.x(),
          y: node.y(),
          width: Math.max(60, element.width * scaleX),
          height: Math.max(30, element.height * scaleY),
          rotation: node.rotation(),
          fontSize: Math.max(8, Math.round(element.fontSize * scaleY))
        });
      }}
    >
      <Rect
        width={element.width}
        height={element.height}
        fill={element.bgColor}
        cornerRadius={element.cornerRadius}
        shadowColor="#000000"
        shadowBlur={12}
        shadowOffsetX={0}
        shadowOffsetY={4}
        shadowOpacity={0.5}
      />
      <Text
        width={element.width}
        height={element.height}
        text={element.text}
        fontSize={element.fontSize}
        fontFamily={element.fontFamily}
        fill={element.textColor}
        align="center"
        verticalAlign="middle"
        listening={false}
      />
    </Group>
  );
}
