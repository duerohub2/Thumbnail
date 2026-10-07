'use client';

import { useEffect, useRef, useState } from 'react';
import { Image as KonvaImage } from 'react-konva';
import type Konva from 'konva';
import type { ImageElementData } from '@/types';

interface Props {
  element: ImageElementData;
  onSelect: () => void;
  onChange: (patch: Partial<ImageElementData>) => void;
}

export function ImageElement({ element, onSelect, onChange }: Props) {
  const ref = useRef<Konva.Image>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => setImage(img);
    img.src = element.src;
  }, [element.src]);

  if (!image) return null;

  return (
    <KonvaImage
      ref={ref}
      id={element.id}
      name="selectable-element"
      image={image}
      x={element.x}
      y={element.y}
      width={element.width}
      height={element.height}
      rotation={element.rotation}
      opacity={element.opacity}
      visible={element.visible}
      listening={!element.locked}
      draggable={!element.locked}
      cornerRadius={element.cornerRadius}
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
          width: Math.max(20, node.width() * scaleX),
          height: Math.max(20, node.height() * scaleY),
          rotation: node.rotation()
        });
      }}
    />
  );
}
