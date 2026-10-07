'use client';

import { useEditorStore } from '@/lib/store/editorStore';
import type { CanvasElement } from '@/types';

function elementLabel(el: CanvasElement): string {
  if (el.type === 'text') return `Text: ${el.text.slice(0, 20)}`;
  if (el.type === 'image') return 'Image';
  if (el.type === 'badge') return `Badge: ${el.text}`;
  if (el.type === 'placeholder') return `Slot: ${el.label}`;
  return 'Element';
}

export function LayersPanel() {
  const elements = useEditorStore((s) => s.elements);
  const selectedId = useEditorStore((s) => s.selectedId);
  const selectElement = useEditorStore((s) => s.selectElement);
  const removeElement = useEditorStore((s) => s.removeElement);
  const duplicateElement = useEditorStore((s) => s.duplicateElement);
  const bringForward = useEditorStore((s) => s.bringForward);
  const sendBackward = useEditorStore((s) => s.sendBackward);

  return (
    <div className="brutal-card p-3 flex flex-col gap-2">
      <h3 className="text-[10px] font-black uppercase tracking-wide">
        Layers ({elements.length})
      </h3>

      {elements.length === 0 ? (
        <p className="text-[10px] font-bold opacity-60 py-2">
          No elements yet.
        </p>
      ) : (
        <div className="flex flex-col gap-1 max-h-[40vh] overflow-y-auto no-scrollbar">
          {[...elements].reverse().map((el) => {
            const active = el.id === selectedId;
            return (
              <button
                key={el.id}
                type="button"
                onClick={() => selectElement(el.id)}
                className={`text-left px-2 py-2 text-[10px] font-black uppercase brutal-border truncate transition-colors ${
                  active
                    ? 'bg-brand-yellow text-brand-ink'
                    : 'bg-[var(--card-bg)] text-[var(--text-color)]'
                }`}
              >
                {elementLabel(el)}
              </button>
            );
          })}
        </div>
      )}

      {selectedId ? (
        <div className="grid grid-cols-2 gap-1 mt-1 border-t-3 border-dashed border-[var(--brutal-border-color)] pt-2">
          <button
            type="button"
            onClick={() => duplicateElement(selectedId)}
            className="brutal-border text-[9px] font-black uppercase py-1 bg-brand-softblue text-brand-ink"
          >
            Duplicate
          </button>
          <button
            type="button"
            onClick={() => removeElement(selectedId)}
            className="brutal-border text-[9px] font-black uppercase py-1 bg-brand-salmon text-white"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={() => bringForward(selectedId)}
            className="brutal-border text-[9px] font-black uppercase py-1 bg-[var(--card-bg)]"
          >
            Forward
          </button>
          <button
            type="button"
            onClick={() => sendBackward(selectedId)}
            className="brutal-border text-[9px] font-black uppercase py-1 bg-[var(--card-bg)]"
          >
            Backward
          </button>
        </div>
      ) : null}
    </div>
  );
}
