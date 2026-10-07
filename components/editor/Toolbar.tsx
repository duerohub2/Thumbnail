'use client';

import { useRef, useState } from 'react';
import { useEditorStore } from '@/lib/store/editorStore';
import {
  createBadgeElement,
  createImageElement,
  createTextElement
} from '@/lib/elements/factory';
import { TemplateGallery } from '@/components/panels/TemplateGallery';
import { PresetGallery } from '@/components/panels/PresetGallery';

interface ToolbarProps {
  onExport: () => void;
  exporting: boolean;
}

export function Toolbar({ onExport, exporting }: ToolbarProps) {
  const addElement = useEditorStore((s) => s.addElement);
  const resetAll = useEditorStore((s) => s.resetAll);
  const setBackground = useEditorStore((s) => s.setBackground);
  const background = useEditorStore((s) => s.background);
  const bgFileRef = useRef<HTMLInputElement>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  function handleAddImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target?.result as string;
      addElement(
        createImageElement(src, {
          x: 400,
          y: 150,
          width: 400,
          height: 400
        })
      );
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  function handleBgImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target?.result as string;
      setBackground({ imageSrc: src });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  function handleReset() {
    if (!confirmReset) {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 3000);
      return;
    }
    resetAll();
    setConfirmReset(false);
  }

  return (
    <div className="brutal-card p-3 flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        <TemplateGallery />
        <PresetGallery />

        <button
          type="button"
          onClick={() => addElement(createTextElement())}
          className="brutal-btn bg-brand-yellow text-brand-ink px-3 py-2 text-[10px]"
        >
          + Text
        </button>

        <button
          type="button"
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (ev) =>
              handleAddImage(
                ev as unknown as React.ChangeEvent<HTMLInputElement>
              );
            input.click();
          }}
          className="brutal-btn bg-brand-softblue text-brand-ink px-3 py-2 text-[10px]"
        >
          + Image
        </button>

        <button
          type="button"
          onClick={() => addElement(createBadgeElement())}
          className="brutal-btn bg-brand-mint text-brand-ink px-3 py-2 text-[10px]"
        >
          + Badge
        </button>

        <button
          type="button"
          onClick={() => bgFileRef.current?.click()}
          className="brutal-btn bg-[var(--card-bg)] px-3 py-2 text-[10px]"
        >
          Background
        </button>
        <input
          ref={bgFileRef}
          type="file"
          accept="image/*"
          onChange={handleBgImage}
          className="hidden"
        />

        <div className="flex-1" />

        <button
          type="button"
          onClick={handleReset}
          className={`brutal-btn px-3 py-2 text-[10px] ${
            confirmReset
              ? 'bg-brand-salmon text-white'
              : 'bg-[var(--card-bg)] text-[var(--text-color)]'
          }`}
        >
          {confirmReset ? 'Confirm reset' : 'Reset'}
        </button>

        <button
          type="button"
          onClick={onExport}
          disabled={exporting}
          className="brutal-btn bg-brand-yellow text-brand-ink px-3 py-2 text-[10px]"
        >
          {exporting ? 'Exporting...' : 'Export PNG'}
        </button>
      </div>

      {background.imageSrc ? (
        <div className="flex flex-wrap gap-3 items-center border-t-3 border-dashed border-[var(--brutal-border-color)] pt-2">
          <label className="text-[10px] font-black uppercase opacity-70">
            Brightness
          </label>
          <input
            type="range"
            min={-80}
            max={0}
            value={background.brightness}
            onChange={(e) =>
              setBackground({ brightness: Number(e.target.value) })
            }
            className="flex-1 min-w-[120px]"
          />
          <span className="text-[10px] font-black">
            {background.brightness}
          </span>
        </div>
      ) : null}
    </div>
  );
}
