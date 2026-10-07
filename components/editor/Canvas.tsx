'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Stage,
  Layer,
  Rect,
  Image as KonvaImage,
  Transformer
} from 'react-konva';
import type Konva from 'konva';
import { useEditorStore } from '@/lib/store/editorStore';
import { ElementRenderer } from './elements/ElementRenderer';

interface CanvasProps {
  stageRef: React.MutableRefObject<Konva.Stage | null>;
}

export function Canvas({ stageRef }: CanvasProps) {
  const trRef = useRef<Konva.Transformer>(null);
  const [bgImage, setBgImage] = useState<HTMLImageElement | null>(null);

  const canvasWidth = useEditorStore((s) => s.canvasWidth);
  const canvasHeight = useEditorStore((s) => s.canvasHeight);
  const background = useEditorStore((s) => s.background);
  const elements = useEditorStore((s) => s.elements);
  const selectedId = useEditorStore((s) => s.selectedId);
  const zoom = useEditorStore((s) => s.zoom);
  const selectElement = useEditorStore((s) => s.selectElement);
  const updateElement = useEditorStore((s) => s.updateElement);

  useEffect(() => {
    if (!background.imageSrc) {
      setBgImage(null);
      return;
    }
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => setBgImage(img);
    img.src = background.imageSrc;
  }, [background.imageSrc]);

  useEffect(() => {
    const tr = trRef.current;
    const stage = stageRef.current;
    if (!tr || !stage) return;

    if (!selectedId) {
      tr.nodes([]);
      tr.getLayer()?.batchDraw();
      return;
    }

    const node = stage.findOne(`#${selectedId}`);
    if (node) {
      tr.nodes([node]);
    } else {
      tr.nodes([]);
    }
    tr.getLayer()?.batchDraw();
  }, [selectedId, elements, stageRef]);

  const brightness = background.brightness ?? 0;

  return (
    <Stage
      ref={(node) => {
        stageRef.current = node;
      }}
      width={canvasWidth * zoom}
      height={canvasHeight * zoom}
      scaleX={zoom}
      scaleY={zoom}
      onMouseDown={(e) => {
        if (e.target === e.target.getStage()) selectElement(null);
      }}
      onTouchStart={(e) => {
        if (e.target === e.target.getStage()) selectElement(null);
      }}
    >
      <Layer>
        <Rect
          x={0}
          y={0}
          width={canvasWidth}
          height={canvasHeight}
          fill={background.color}
          listening={false}
        />

        {bgImage ? (
          <KonvaImage
            image={bgImage}
            x={0}
            y={0}
            width={canvasWidth}
            height={canvasHeight}
            listening={false}
          />
        ) : null}

        {brightness < 0 ? (
          <Rect
            x={0}
            y={0}
            width={canvasWidth}
            height={canvasHeight}
            fill="black"
            opacity={Math.min(0.85, Math.abs(brightness) / 100)}
            listening={false}
          />
        ) : null}
      </Layer>

      <Layer>
        {elements.map((el) => (
          <ElementRenderer
            key={el.id}
            element={el}
            onSelect={() => selectElement(el.id)}
            onChange={(patch) => updateElement(el.id, patch)}
          />
        ))}

        <Transformer
          ref={trRef}
          rotateEnabled
          keepRatio={false}
          borderStroke="#7B5BFF"
          borderStrokeWidth={2}
          anchorStroke="#1F1F1F"
          anchorFill="#FFD84D"
          anchorSize={14}
          anchorCornerRadius={7}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 20 || newBox.height < 20) return oldBox;
            return newBox;
          }}
        />
      </Layer>
    </Stage>
  );
}
