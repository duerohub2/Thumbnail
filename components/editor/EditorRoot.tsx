'use client';

import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import type Konva from 'konva';
import { Toolbar } from './Toolbar';
import { FontLoader } from './FontLoader';
import { LayersPanel } from '@/components/panels/LayersPanel';
import { PropertiesPanel } from '@/components/panels/PropertiesPanel';
import { useEditorStore } from '@/lib/store/editorStore';
import { downloadDataUrl, timestampFilename } from '@/lib/utils/export';
import { CANVAS_PRESETS } from '@/lib/constants';

const Canvas = dynamic(
  () => import('./Canvas').then((mod) => mod.Canvas),
  { ssr: false }
);

export function EditorRoot() {
  const stageRef = useRef<Konva.Stage | null>(null);
  const [exporting, setExporting] = useState(false);

  const canvasWidth = useEditorStore((s) => s.canvasWidth);
  const canvasHeight = useEditorStore((s) => s.canvasHeight);
  const setCanvasSize = useEditorStore((s) => s.setCanvasSize);
  const zoom = useEditorStore((s) => s.zoom);
  const setZoom = useEditorStore((s) => s.setZoom);
  const selectElement = useEditorStore((s) => s.selectElement);

  async function handleExport() {
    const stage = stageRef.current;
    if (!stage) return;

    setExporting(true);
    selectElement(null);

    await new Promise((r) => setTimeout(r, 120));

    try {
      const dataUrl = stage.toDataURL({
        pixelRatio: 2,
        mimeType: 'image/png'
      });
      downloadDataUrl(dataUrl, timestampFilename('png'));
    } catch (err) {
      alert('Export failed. Please try again.');
    } finally {
      setExporting(false);
    }
  }

  return (
    <>
      <FontLoader />

      <div className="flex flex-col gap-3">
        <div className="brutal-card p-3 flex flex-wrap gap-2 items-center">
          <div className="flex-1 min-w-[200px]">
            <label className="panel-label">Canvas preset</label>
            <select
              className="brutal-input"
              value={`${canvasWidth}x${canvasHeight}`}
              onChange={(e) => {
                const [w, h] = e.target.value.split('x').map(Number);
                setCanvasSize(w, h);
              }}
            >
              {CANVAS_PRESETS.map((p) => (
                <option key={p.value} value={`${p.width}x${p.height}`}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <div className="min-w-[140px]">
            <label className="panel-label">
              Zoom ({Math.round(zoom * 100)}%)
            </label>
            <input
              type="range"
              min={20}
              max={200}
              value={zoom * 100}
              onChange={(e) => setZoom(Number(e.target.value) / 100)}
              className="w-full"
            />
          </div>
        </div>

        <Toolbar onExport={handleExport} exporting={exporting} />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-3">
          <div className="brutal-card p-2 overflow-auto">
            <div className="flex justify-center">
              <Canvas stageRef={stageRef} />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <LayersPanel />
            <PropertiesPanel />
          </div>
        </div>
      </div>
    </>
  );
}
