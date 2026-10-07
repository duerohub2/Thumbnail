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
import { createImageElement } from '@/lib/elements/factory';
import type { CanvasElement, PlaceholderElementData } from '@/types';

interface CanvasProps {
  stageRef: React.MutableRefObject<Konva.Stage | null>;
}

export function Canvas({ stageRef }: CanvasProps) {
  const trRef = useRef<Konva.Transformer>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [bgImage, setBgImage] = useState<HTMLImageElement | null>(null);
  const [pendingSlotId, setPendingSlotId] = useState<string | null>(null);

  const canvasWidth = useEditorStore((s) => s.canvasWidth);
  const canvasHeight = useEditorStore((s) => s.canvasHeight);
  const background = useEditorStore((s) => s.background);
  const elements = useEditorStore((s) => s.elements);
  const selectedId = useEditorStore((s) => s.selectedId);
  const zoom = useEditorStore((s) => s.zoom);
  const selectElement = useEditorStore((s) => s.selectElement);
  const updateElement = useEditorStore((s) => s.updateElement);
  const addElement = useEditorStore((s) => s.addElement);
  const removeElement = useEditorStore((s) => s.removeElement);

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

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const container = stage.container();

    function applyZoom(newZoom: number) {
      const clamped = Math.max(0.1, Math.min(3, newZoom));
      useEditorStore.getState().setZoom(clamped);
    }

    function handleWheel(e: WheelEvent) {
      e.preventDefault();
      const oldScale = useEditorStore.getState().zoom;
      const scaleBy = 1.06;
      const next = e.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
      applyZoom(next);
    }

    let lastDist = 0;
    function handleTouchStart(e: TouchEvent) {
      if (e.touches.length === 2) {
        lastDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    }
    function handleTouchMove(e: TouchEvent) {
      if (e.touches.length === 2) {
        e.preventDefault();
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        if (lastDist > 0) {
          const ratio = dist / lastDist;
          const oldScale = useEditorStore.getState().zoom;
          applyZoom(oldScale * ratio);
        }
        lastDist = dist;
      }
    }
    function handleTouchEnd() {
      lastDist = 0;
    }

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove, {
      passive: false
    });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [stageRef]);

  function handlePickImage(id: string) {
    setPendingSlotId(id);
    fileRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !pendingSlotId) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target?.result as string;
      const ph = elements.find((el) => el.id === pendingSlotId);
      if (!ph || ph.type !== 'placeholder') {
        setPendingSlotId(null);
        return;
      }
      const placeholder = ph as PlaceholderElementData;
      removeElement(placeholder.id);
      addElement(
        createImageElement(src, {
          x: placeholder.x,
          y: placeholder.y,
          width: placeholder.width,
          height: placeholder.height,
          rotation: placeholder.rotation,
          cornerRadius: 8
        })
      );
      setPendingSlotId(null);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  const brightness = background.brightness ?? 0;

  return (
    <>
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
              isSelected={el.id === selectedId}
              onSelect={() => selectElement(el.id)}
              onChange={(patch) =>
                updateElement(el.id, patch as Partial<CanvasElement>)
              }
              onPickImage={handlePickImage}
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

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
}
