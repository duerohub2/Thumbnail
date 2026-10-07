'use client';

import { useRef } from 'react';
import { Group, Rect, Text, Line } from 'react-konva';
import type Konva from 'konva';
import type { PlaceholderElementData } from '@/types';

interface Props {
  element: PlaceholderElementData;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (patch: Partial<PlaceholderElementData>) => void;
  onPickImage: () => void;
}

export function PlaceholderElement({
  element,
  isSelected,
  onSelect,
  onChange,
  onPickImage
}: Props) {
  const groupRef = useRef<Konva.Group>(null);
  const cx = element.width / 2;
  const cy = element.height / 2;
  const plusSize = Math.min(element.width, element.height) * 0.12;
  const labelFont = Math.max(
    14,
    Math.min(28, Math.min(element.width, element.height) * 0.06)
  );

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
      draggable={isSelected && !element.locked}
      onClick={() => {
        if (isSelected) {
          onPickImage();
        } else {
          onSelect();
        }
      }}
      onTap={() => {
        if (isSelected) {
          onPickImage();
        } else {
          onSelect();
        }
      }}
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
          height: Math.max(60, element.height * scaleY),
          rotation: node.rotation()
        });
      }}
    >
      <Rect
        width={element.width}
        height={element.height}
        fill="rgba(255, 255, 255, 0.12)"
        stroke="#FFFFFF"
        strokeWidth={4}
        dash={[14, 10]}
        cornerRadius={12}
        listening={false}
      />

      <Line
        points={[cx - plusSize, cy - 15, cx + plusSize, cy - 15]}
        stroke="#FFFFFF"
        strokeWidth={6}
        lineCap="round"
        listening={false}
      />
      <Line
        points={[cx, cy - 15 - plusSize, cx, cy - 15 + plusSize]}
        stroke="#FFFFFF"
        strokeWidth={6}
        lineCap="round"
        listening={false}
      />

      <Text
        y={cy + plusSize + 5}
        width={element.width}
        text={element.label}
        fontFamily="Bungee"
        fontSize={labelFont}
        fill="#FFFFFF"
        align="center"
        listening={false}
      />
    </Group>
  );
}
