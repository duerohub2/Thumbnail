import type { CanvasBackground, CanvasElement } from '@/types';
import {
  createBadgeElement,
  createPlaceholderElement,
  createTextElement
} from '@/lib/elements/factory';

export interface TemplateBuildResult {
  elements: CanvasElement[];
  background?: Partial<CanvasBackground>;
}

export interface TemplateDefinition {
  id: string;
  name: string;
  description: string;
  build: (w: number, h: number) => TemplateBuildResult;
}

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: 'youtube-gaming',
    name: 'YouTube Gaming',
    description: 'Character left, script right',
    build: (w, h) => ({
      elements: [
        createTextElement({
          x: w * 0.28,
          y: h * 0.03,
          width: w * 0.44,
          text: 'TITLE LINE 1',
          fontSize: Math.round(w * 0.05),
          fill: '#FFFFFF',
          stroke: '#1F1F1F',
          strokeWidth: 6,
          align: 'center'
        }),
        createTextElement({
          x: w * 0.28,
          y: h * 0.13,
          width: w * 0.44,
          text: 'SCRIPT NAME',
          fontSize: Math.round(w * 0.07),
          fill: '#FFD84D',
          stroke: '#1F1F1F',
          strokeWidth: 6,
          align: 'center'
        }),
        createPlaceholderElement({
          x: w * 0.03,
          y: h * 0.25,
          width: w * 0.26,
          height: h * 0.38,
          label: 'Add character'
        }),
        createPlaceholderElement({
          x: w * 0.7,
          y: h * 0.22,
          width: w * 0.27,
          height: h * 0.5,
          label: 'Add script'
        }),
        createBadgeElement({
          x: w * 0.03,
          y: h * 0.72,
          width: w * 0.22,
          height: h * 0.07,
          text: 'Auto Farm',
          fontSize: Math.round(w * 0.018)
        }),
        createBadgeElement({
          x: w * 0.03,
          y: h * 0.8,
          width: w * 0.22,
          height: h * 0.07,
          text: 'Auto Quest',
          fontSize: Math.round(w * 0.018)
        }),
        createBadgeElement({
          x: w * 0.03,
          y: h * 0.88,
          width: w * 0.22,
          height: h * 0.07,
          text: 'Auto Boss',
          fontSize: Math.round(w * 0.018)
        }),
        createBadgeElement({
          x: w * 0.76,
          y: h * 0.85,
          width: w * 0.21,
          height: h * 0.1,
          text: 'Keyless',
          bgColor: '#A8E6A3',
          textColor: '#0F3F0F',
          fontSize: Math.round(w * 0.028),
          rotation: -4
        })
      ],
      background: { color: '#3a8fdc' }
    })
  },
  {
    id: 'roblox-card',
    name: 'Roblox Card',
    description: 'Centered title + placeholders',
    build: (w, h) => ({
      elements: [
        createTextElement({
          x: w * 0.05,
          y: h * 0.04,
          width: w * 0.9,
          text: 'GAME NAME',
          fontSize: Math.round(w * 0.06),
          fill: '#FFFFFF',
          stroke: '#1F1F1F',
          strokeWidth: 6,
          align: 'center'
        }),
        createTextElement({
          x: w * 0.05,
          y: h * 0.15,
          width: w * 0.9,
          text: 'SCRIPT TITLE',
          fontSize: Math.round(w * 0.08),
          fill: '#FFD84D',
          stroke: '#1F1F1F',
          strokeWidth: 6,
          align: 'center'
        }),
        createPlaceholderElement({
          x: w * 0.35,
          y: h * 0.3,
          width: w * 0.3,
          height: h * 0.45,
          label: 'Add character'
        }),
        createPlaceholderElement({
          x: w * 0.68,
          y: h * 0.35,
          width: w * 0.29,
          height: h * 0.4,
          label: 'Add script'
        }),
        createBadgeElement({
          x: w * 0.04,
          y: h * 0.72,
          width: w * 0.24,
          height: h * 0.07,
          text: 'Feature One',
          fontSize: Math.round(w * 0.016)
        }),
        createBadgeElement({
          x: w * 0.04,
          y: h * 0.8,
          width: w * 0.24,
          height: h * 0.07,
          text: 'Feature Two',
          fontSize: Math.round(w * 0.016)
        }),
        createBadgeElement({
          x: w * 0.04,
          y: h * 0.88,
          width: w * 0.24,
          height: h * 0.07,
          text: 'Feature Three',
          fontSize: Math.round(w * 0.016)
        })
      ],
      background: { color: '#FF8579' }
    })
  },
  {
    id: 'showcase',
    name: 'Showcase',
    description: 'Big title, hero image',
    build: (w, h) => ({
      elements: [
        createTextElement({
          x: w * 0.08,
          y: h * 0.05,
          width: w * 0.84,
          text: 'SCRIPT NAME HERE',
          fontSize: Math.round(w * 0.08),
          fill: '#FFFFFF',
          stroke: '#1F1F1F',
          strokeWidth: 7,
          align: 'center'
        }),
        createTextElement({
          x: w * 0.08,
          y: h * 0.18,
          width: w * 0.84,
          text: 'LATEST UPDATE',
          fontSize: Math.round(w * 0.04),
          fill: '#FFD84D',
          stroke: '#1F1F1F',
          strokeWidth: 5,
          align: 'center'
        }),
        createPlaceholderElement({
          x: w * 0.28,
          y: h * 0.32,
          width: w * 0.44,
          height: h * 0.48,
          label: 'Add character'
        }),
        createBadgeElement({
          x: w * 0.4,
          y: h * 0.83,
          width: w * 0.2,
          height: h * 0.1,
          text: 'Keyless',
          bgColor: '#A8E6A3',
          textColor: '#0F3F0F',
          fontSize: Math.round(w * 0.026),
          rotation: -4
        })
      ],
      background: { color: '#1F1F1F' }
    })
  },
  {
    id: 'update-notice',
    name: 'Update Notice',
    description: 'Huge title, feature list',
    build: (w, h) => ({
      elements: [
        createTextElement({
          x: w * 0.08,
          y: h * 0.05,
          width: w * 0.84,
          text: 'BIG UPDATE',
          fontSize: Math.round(w * 0.1),
          fill: '#FFD84D',
          stroke: '#1F1F1F',
          strokeWidth: 8,
          align: 'center'
        }),
        createPlaceholderElement({
          x: w * 0.42,
          y: h * 0.3,
          width: w * 0.5,
          height: h * 0.5,
          label: 'Add image'
        }),
        createBadgeElement({
          x: w * 0.04,
          y: h * 0.52,
          width: w * 0.32,
          height: h * 0.07,
          text: 'New Feature',
          bgColor: '#9BC5E8',
          textColor: '#1F1F1F',
          fontSize: Math.round(w * 0.018)
        }),
        createBadgeElement({
          x: w * 0.04,
          y: h * 0.62,
          width: w * 0.32,
          height: h * 0.07,
          text: 'Bug Fixes',
          bgColor: '#9BC5E8',
          textColor: '#1F1F1F',
          fontSize: Math.round(w * 0.018)
        }),
        createBadgeElement({
          x: w * 0.04,
          y: h * 0.72,
          width: w * 0.32,
          height: h * 0.07,
          text: 'New Map',
          bgColor: '#9BC5E8',
          textColor: '#1F1F1F',
          fontSize: Math.round(w * 0.018)
        }),
        createBadgeElement({
          x: w * 0.74,
          y: h * 0.85,
          width: w * 0.23,
          height: h * 0.1,
          text: 'Update',
          bgColor: '#FF8579',
          textColor: '#FFFFFF',
          fontSize: Math.round(w * 0.026),
          rotation: -4
        })
      ],
      background: { color: '#7B5BFF' }
    })
  },
  {
    id: 'feature-list',
    name: 'Feature List',
    description: 'Title top, features on right',
    build: (w, h) => ({
      elements: [
        createTextElement({
          x: w * 0.05,
          y: h * 0.04,
          width: w * 0.9,
          text: 'SCRIPT NAME',
          fontSize: Math.round(w * 0.075),
          fill: '#FFFFFF',
          stroke: '#1F1F1F',
          strokeWidth: 6,
          align: 'center'
        }),
        createPlaceholderElement({
          x: w * 0.04,
          y: h * 0.28,
          width: w * 0.6,
          height: h * 0.55,
          label: 'Add character'
        }),
        createBadgeElement({
          x: w * 0.72,
          y: h * 0.32,
          width: w * 0.25,
          height: h * 0.09,
          text: 'Auto Farm',
          fontSize: Math.round(w * 0.02)
        }),
        createBadgeElement({
          x: w * 0.72,
          y: h * 0.44,
          width: w * 0.25,
          height: h * 0.09,
          text: 'Auto Quest',
          fontSize: Math.round(w * 0.02)
        }),
        createBadgeElement({
          x: w * 0.72,
          y: h * 0.56,
          width: w * 0.25,
          height: h * 0.09,
          text: 'Auto Boss',
          fontSize: Math.round(w * 0.02)
        }),
        createBadgeElement({
          x: w * 0.72,
          y: h * 0.68,
          width: w * 0.25,
          height: h * 0.09,
          text: 'Anti AFK',
          fontSize: Math.round(w * 0.02)
        }),
        createBadgeElement({
          x: w * 0.04,
          y: h * 0.86,
          width: w * 0.22,
          height: h * 0.1,
          text: 'Keyless',
          bgColor: '#A8E6A3',
          textColor: '#0F3F0F',
          fontSize: Math.round(w * 0.024),
          rotation: -4
        })
      ],
      background: { color: '#4a90d9' }
    })
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean title + hero',
    build: (w, h) => ({
      elements: [
        createTextElement({
          x: w * 0.1,
          y: h * 0.06,
          width: w * 0.8,
          text: 'SCRIPT NAME',
          fontSize: Math.round(w * 0.1),
          fill: '#FFFFFF',
          stroke: '#1F1F1F',
          strokeWidth: 8,
          align: 'center'
        }),
        createPlaceholderElement({
          x: w * 0.3,
          y: h * 0.28,
          width: w * 0.4,
          height: h * 0.55,
          label: 'Add image'
        }),
        createBadgeElement({
          x: w * 0.4,
          y: h * 0.87,
          width: w * 0.2,
          height: h * 0.09,
          text: 'Verified',
          bgColor: '#FF8579',
          textColor: '#FFFFFF',
          fontSize: Math.round(w * 0.026),
          rotation: -4
        })
      ],
      background: { color: '#1F1F1F' }
    })
  }
];
