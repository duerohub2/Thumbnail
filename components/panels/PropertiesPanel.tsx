'use client';

import { useRef } from 'react';
import { useEditorStore } from '@/lib/store/editorStore';
import {
  ColorInput,
  Input,
  RangeInput,
  Select,
  Textarea
} from '@/components/ui/Input';
import { BADGE_PRESETS, FONT_OPTIONS } from '@/lib/constants';
import { createImageElement } from '@/lib/elements/factory';
import type {
  BadgeElementData,
  ImageElementData,
  PlaceholderElementData,
  TextElementData
} from '@/types';

export function PropertiesPanel() {
  const selectedId = useEditorStore((s) => s.selectedId);
  const elements = useEditorStore((s) => s.elements);
  const updateElement = useEditorStore((s) => s.updateElement);
  const removeElement = useEditorStore((s) => s.removeElement);
  const addElement = useEditorStore((s) => s.addElement);

  const element = elements.find((el) => el.id === selectedId);

  if (!element) {
    return (
      <div className="brutal-card p-3">
        <h3 className="text-[10px] font-black uppercase tracking-wide mb-2">
          Properties
        </h3>
        <p className="text-[10px] font-bold opacity-60">
          Select an element to edit its properties.
        </p>
      </div>
    );
  }

  function patch(p: Record<string, unknown>) {
    updateElement(element!.id, p as never);
  }

  return (
    <div className="brutal-card p-3 flex flex-col gap-2 max-h-[60vh] overflow-y-auto no-scrollbar">
      <h3 className="text-[10px] font-black uppercase tracking-wide">
        Properties
      </h3>

      {element.type === 'placeholder' ? (
        <PlaceholderProps
          element={element}
          onPick={(src) => {
            const ph = element as PlaceholderElementData;
            removeElement(ph.id);
            addElement(
              createImageElement(src, {
                x: ph.x,
                y: ph.y,
                width: ph.width,
                height: ph.height,
                rotation: ph.rotation,
                cornerRadius: 8
              })
            );
          }}
        />
      ) : null}

      {element.type === 'text' ? (
        <TextProps element={element} patch={patch} />
      ) : null}
      {element.type === 'image' ? (
        <ImageProps element={element} patch={patch} />
      ) : null}
      {element.type === 'badge' ? (
        <BadgeProps element={element} patch={patch} />
      ) : null}

      {element.type !== 'placeholder' ? (
        <div className="border-t-3 border-dashed border-[var(--brutal-border-color)] pt-2 grid grid-cols-2 gap-2">
          <Input
            label="Rotation"
            type="number"
            value={Math.round(element.rotation)}
            onChange={(e) => patch({ rotation: Number(e.target.value) })}
          />
          <RangeInput
            label="Opacity"
            min={0}
            max={100}
            value={Math.round(element.opacity * 100)}
            onChange={(v) => patch({ opacity: v / 100 })}
          />
        </div>
      ) : null}
    </div>
  );
}

function PlaceholderProps({
  element,
  onPick
}: {
  element: PlaceholderElementData;
  onPick: (src: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onPick(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="brutal-border border-dashed p-3 text-center">
        <p className="text-[10px] font-black uppercase opacity-70 mb-1">
          Slot: {element.label}
        </p>
        <p className="text-[9px] font-bold opacity-50">
          Tap button below to upload
        </p>
      </div>

      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="brutal-btn bg-brand-yellow text-brand-ink py-3 text-xs w-full"
      >
        Choose Image
      </button>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  );
}

function TextProps({
  element,
  patch
}: {
  element: TextElementData;
  patch: (p: Record<string, unknown>) => void;
}) {
  return (
    <>
      <Textarea
        label="Text"
        rows={2}
        value={element.text}
        onChange={(e) => patch({ text: e.target.value })}
      />
      <Select
        label="Font"
        value={element.fontFamily}
        onChange={(e) => patch({ fontFamily: e.target.value })}
      >
        {FONT_OPTIONS.map((f) => (
          <option key={f.value} value={f.value}>
            {f.label}
          </option>
        ))}
      </Select>
      <RangeInput
        label="Font size"
        min={12}
        max={200}
        value={element.fontSize}
        onChange={(v) => patch({ fontSize: v })}
      />
      <ColorInput
        label="Fill"
        value={element.fill}
        onChange={(v) => patch({ fill: v })}
      />
      <ColorInput
        label="Outline color"
        value={element.stroke}
        onChange={(v) => patch({ stroke: v })}
      />
      <RangeInput
        label="Outline width"
        min={0}
        max={20}
        value={element.strokeWidth}
        onChange={(v) => patch({ strokeWidth: v })}
      />
      <Select
        label="Align"
        value={element.align}
        onChange={(e) => patch({ align: e.target.value })}
      >
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </Select>
    </>
  );
}

function ImageProps({
  element,
  patch
}: {
  element: ImageElementData;
  patch: (p: Record<string, unknown>) => void;
}) {
  return (
    <>
      <RangeInput
        label="Corner radius"
        min={0}
        max={100}
        value={element.cornerRadius}
        onChange={(v) => patch({ cornerRadius: v })}
      />
      <RangeInput
        label="Shadow blur"
        min={0}
        max={60}
        value={element.shadowBlur}
        onChange={(v) => patch({ shadowBlur: v })}
      />
    </>
  );
}

function BadgeProps({
  element,
  patch
}: {
  element: BadgeElementData;
  patch: (p: Record<string, unknown>) => void;
}) {
  return (
    <>
      <Input
        label="Text"
        value={element.text}
        onChange={(e) => patch({ text: e.target.value })}
      />

      <div>
        <label className="panel-label">Presets</label>
        <div className="flex flex-wrap gap-1">
          {BADGE_PRESETS.map((p) => (
            <button
              key={p.text}
              type="button"
              onClick={() =>
                patch({
                  text: p.text,
                  bgColor: p.bgColor,
                  textColor: p.textColor
                })
              }
              className="brutal-border px-2 py-1 text-[9px] font-black uppercase"
              style={{ backgroundColor: p.bgColor, color: p.textColor }}
            >
              {p.text}
            </button>
          ))}
        </div>
      </div>

      <ColorInput
        label="Background"
        value={element.bgColor}
        onChange={(v) => patch({ bgColor: v })}
      />
      <ColorInput
        label="Text color"
        value={element.textColor}
        onChange={(v) => patch({ textColor: v })}
      />
      <RangeInput
        label="Font size"
        min={10}
        max={80}
        value={element.fontSize}
        onChange={(v) => patch({ fontSize: v })}
      />
      <RangeInput
        label="Corner radius"
        min={0}
        max={40}
        value={element.cornerRadius}
        onChange={(v) => patch({ cornerRadius: v })}
      />
    </>
  );
}
