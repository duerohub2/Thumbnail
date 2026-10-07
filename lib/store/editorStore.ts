'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type {
  CanvasElement,
  CanvasBackground,
  HistorySnapshot
} from '@/types';
import { STORAGE_KEY } from '@/lib/constants';
import type { TemplateDefinition } from '@/lib/templates';
import type { StylePreset } from '@/lib/presets';

const MAX_HISTORY = 25;

interface EditorStore {
  canvasWidth: number;
  canvasHeight: number;
  background: CanvasBackground;
  elements: CanvasElement[];
  selectedId: string | null;
  zoom: number;

  past: HistorySnapshot[];
  future: HistorySnapshot[];

  setCanvasSize: (w: number, h: number) => void;
  setBackground: (partial: Partial<CanvasBackground>) => void;

  addElement: (element: CanvasElement) => void;
  updateElement: (id: string, partial: Partial<CanvasElement>) => void;
  removeElement: (id: string) => void;
  duplicateElement: (id: string) => void;

  selectElement: (id: string | null) => void;
  bringForward: (id: string) => void;
  sendBackward: (id: string) => void;

  setZoom: (zoom: number) => void;

  loadTemplate: (template: TemplateDefinition) => void;
  applyPreset: (preset: StylePreset) => void;

  undo: () => void;
  redo: () => void;

  resetAll: () => void;
}

const defaultBackground: CanvasBackground = {
  imageSrc: null,
  color: '#3a8fdc',
  brightness: 0,
  blur: 0
};

function cloneElements(elements: CanvasElement[]): CanvasElement[] {
  return elements.map((el) => ({ ...el }));
}

export const useEditorStore = create<EditorStore>()(
  persist(
    (set, get) => {
      let lastPushTime = 0;

      function pushHistory(force = false) {
        const now = Date.now();
        if (!force && now - lastPushTime < 300) return;
        lastPushTime = now;
        const state = get();
        const snap: HistorySnapshot = {
          elements: cloneElements(state.elements),
          background: { ...state.background }
        };
        set({
          past: [...state.past.slice(-(MAX_HISTORY - 1)), snap],
          future: []
        });
      }

      return {
        canvasWidth: 1280,
        canvasHeight: 720,
        background: defaultBackground,
        elements: [],
        selectedId: null,
        zoom: 1,
        past: [],
        future: [],

        setCanvasSize: (w, h) => set({ canvasWidth: w, canvasHeight: h }),

        setBackground: (partial) => {
          pushHistory();
          set((state) => ({
            background: { ...state.background, ...partial }
          }));
        },

        addElement: (element) => {
          pushHistory(true);
          set((state) => ({
            elements: [...state.elements, element],
            selectedId: element.id
          }));
        },

        updateElement: (id, partial) => {
          pushHistory();
          set((state) => ({
            elements: state.elements.map((el) =>
              el.id === id ? ({ ...el, ...partial } as CanvasElement) : el
            )
          }));
        },

        removeElement: (id) => {
          pushHistory(true);
          set((state) => ({
            elements: state.elements.filter((el) => el.id !== id),
            selectedId: state.selectedId === id ? null : state.selectedId
          }));
        },

        duplicateElement: (id) => {
          const el = get().elements.find((e) => e.id === id);
          if (!el) return;
          pushHistory(true);
          const copy: CanvasElement = {
            ...el,
            id: el.id + '-c-' + Math.random().toString(36).slice(2, 6),
            x: el.x + 30,
            y: el.y + 30
          };
          set((state) => ({
            elements: [...state.elements, copy],
            selectedId: copy.id
          }));
        },

        selectElement: (id) => set({ selectedId: id }),

        bringForward: (id) => {
          pushHistory(true);
          set((state) => {
            const idx = state.elements.findIndex((e) => e.id === id);
            if (idx < 0 || idx === state.elements.length - 1) return state;
            const arr = [...state.elements];
            [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
            return { elements: arr };
          });
        },

        sendBackward: (id) => {
          pushHistory(true);
          set((state) => {
            const idx = state.elements.findIndex((e) => e.id === id);
            if (idx <= 0) return state;
            const arr = [...state.elements];
            [arr[idx], arr[idx - 1]] = [arr[idx - 1], arr[idx]];
            return { elements: arr };
          });
        },

        setZoom: (zoom) => set({ zoom }),

        loadTemplate: (template) => {
          pushHistory(true);
          const { canvasWidth, canvasHeight } = get();
          const result = template.build(canvasWidth, canvasHeight);
          set((state) => ({
            elements: result.elements,
            background: result.background
              ? { ...state.background, ...result.background }
              : state.background,
            selectedId: null
          }));
        },

        applyPreset: (preset) => {
          pushHistory(true);
          set((state) => ({
            elements: state.elements.map((el) => {
              if (el.type === 'text') {
                const isTitle = el.fontSize >= 60;
                const style = isTitle ? preset.title : preset.text;
                return {
                  ...el,
                  fontFamily: style.fontFamily,
                  fill: style.fill,
                  stroke: style.stroke,
                  strokeWidth: style.strokeWidth
                };
              }
              if (el.type === 'badge') {
                return {
                  ...el,
                  bgColor: preset.badge.bgColor,
                  textColor: preset.badge.textColor,
                  fontFamily: preset.badge.fontFamily
                };
              }
              return el;
            })
          }));
        },

        undo: () => {
          const state = get();
          if (state.past.length === 0) return;
          const prev = state.past[state.past.length - 1];
          const currentSnap: HistorySnapshot = {
            elements: cloneElements(state.elements),
            background: { ...state.background }
          };
          set({
            past: state.past.slice(0, -1),
            future: [...state.future, currentSnap],
            elements: prev.elements,
            background: prev.background,
            selectedId: null
          });
        },

        redo: () => {
          const state = get();
          if (state.future.length === 0) return;
          const next = state.future[state.future.length - 1];
          const currentSnap: HistorySnapshot = {
            elements: cloneElements(state.elements),
            background: { ...state.background }
          };
          set({
            future: state.future.slice(0, -1),
            past: [...state.past, currentSnap],
            elements: next.elements,
            background: next.background,
            selectedId: null
          });
        },

        resetAll: () => {
          pushHistory(true);
          set({
            elements: [],
            selectedId: null,
            background: defaultBackground,
            zoom: 1
          });
        }
      };
    },
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        canvasWidth: state.canvasWidth,
        canvasHeight: state.canvasHeight,
        background: state.background,
        elements: state.elements
      })
    }
  )
);
