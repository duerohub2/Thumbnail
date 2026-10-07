'use client';

import { useState } from 'react';
import { useEditorStore } from '@/lib/store/editorStore';
import { TEMPLATES, type TemplateDefinition } from '@/lib/templates';

export function TemplateGallery() {
  const [open, setOpen] = useState(false);
  const loadTemplate = useEditorStore((s) => s.loadTemplate);

  function handleSelect(t: TemplateDefinition) {
    loadTemplate(t);
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="brutal-btn bg-brand-lavender text-brand-ink px-3 py-2 text-[10px]"
      >
        Templates
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[80] flex items-end md:items-center justify-center p-3"
          style={{
            backgroundColor: 'rgba(31, 31, 31, 0.6)',
            backdropFilter: 'blur(4px)'
          }}
          onClick={() => setOpen(false)}
        >
          <div
            className="brutal-card w-full md:max-w-2xl max-h-[85vh] overflow-y-auto no-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 px-4 py-3 border-b-3 border-[var(--brutal-border-color)] sticky top-0 bg-[var(--card-bg)] z-10">
              <div>
                <h3 className="text-sm uppercase">Templates</h3>
                <p className="text-[10px] font-bold opacity-60">
                  Pilih layout, langsung terisi
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="brutal-border brutal-shadow-sm w-9 h-9 font-black text-sm bg-brand-salmon text-white active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                X
              </button>
            </div>

            <div className="p-4 grid grid-cols-2 gap-3">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleSelect(t)}
                  className="brutal-border brutal-shadow-sm p-3 text-left bg-[var(--card-bg)] hover:bg-brand-yellow hover:text-brand-ink transition-colors active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                >
                  <p className="font-black uppercase text-xs">{t.name}</p>
                  <p className="text-[10px] font-bold opacity-70 mt-1">
                    {t.description}
                  </p>
                </button>
              ))}
            </div>

            <div className="px-4 pb-4 text-[10px] font-bold opacity-60">
              Catatan: template akan menimpa elemen yang ada.
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
