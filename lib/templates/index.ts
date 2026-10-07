import type { CanvasBackground, CanvasElement } from '@/types';
import {
  createBadgeElement,
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
    description: 'Character left, script right, title top',
    build: (w, h) => ({
      elements: [
        createTextElement({
          x: w * 0.28,
          y: 20,
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
          y: 90,
          width: w * 0.44,
          text: 'SCRIPT NAME',
          fontSize: Math.round(w * 0.07),
          fill: '#FFD84D',
          stroke: '#1F1F1F',
          strokeWidth: 6,
          align: 'center'
        }),
        createBadgeElement({
          x: w * 0.03,
          y: h * 0.7,
          width: w * 0.22,
          height: h * 0.07,
          text: 'Auto Farm',
          bgColor: '#A8E6A3',
          textColor: '#0F3F0F',
          fontSize: Math.round(w * 0.018)
        }),
        createBadgeElement({
          x: w * 0.03,
          y: h * 0.79,
          width: w * 0.22,
          height: h * 0.07,
          text: 'Auto Quest',
          bgColor: '#A8E6A3',
          textColor: '#0F3F0F',
          fontSize: Math.round(w * 0.018)
        }),
        createBadgeElement({
          x: w * 0.03,
          y: h * 0.88,
          width: w * 0.22,
          height: h * 0.07,
          text: 'Auto Boss',
          bgColor: '#A8E6A3',
          textColor: '#0F3F0F',
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
    description: 'Centered title, character middle, badges stacked',
    build: (w, h) => ({
      elements: [
        createTextElement({
          x: w * 0.05,
          y: 30,
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
          y: 110,
          width: w * 0.9,
          text: 'SCRIPT TITLE',
          fontSize: Math.round(w * 0.08),
          fill: '#FFD84D',
          stroke: '#1F1F1F',
          strokeWidth: 6,
          align: 'center'
        }),
        createBadgeElement({
          x: w * 0.04,
          y: h * 0.6,
          width: w * 0.24,
          height: h * 0.07,
          text: 'Feature One',
          fontSize: Math.round(w * 0.016)
        }),
        createBadgeElement({
          x: w * 0.04,
          y: h * 0.69,
          width: w * 0.24,
          height: h * 0.07,
          text: 'Feature Two',
          fontSize: Math.round(w * 0.016)
        }),
        createBadgeElement({
          x: w * 0.04,
          y: h * 0.78,
          width: w * 0.24,
          height: h * 0.07,
          text: 'Feature Three',
          fontSize: Math.round(w * 0.016)
        }),
        createBadgeElement({
          x: w * 0.72,
          y: h * 0.83,
          width: w * 0.25,
          height: h * 0.1,
          text: 'Verified',
          bgColor: '#FF8579',
          textColor: '#FFFFFF',
          fontSize: Math.round(w * 0.026),
          rotation: -4
        })
      ],
      background: { color: '#FF8579' }
    })
  },
  {
    id: 'showcase',
    name: 'Showcase',
    description: 'Big title, big center space',
    build: (w, h) => ({
      elements: [
        createTextElement({
          x: w * 0.08,
          y: 40,
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
          y: 170,
          width: w * 0.84,
          text: 'LATEST UPDATE',
          fontSize: Math.round(w * 0.04),
          fill: '#FFD84D',
          stroke: '#1F1F1F',
          strokeWidth: 5,
          align: 'center'
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
          y: 40,
          width: w * 0.84,
          text: 'BIG UPDATE',
          fontSize: Math.round(w * 0.1),
          fill: '#FFD84D',
          stroke: '#1F1F1F',
          strokeWidth: 8,
          align: 'center'
        }),
        createTextElement({
          x: w * 0.08,
          y: 180,
          width: w * 0.84,
          text: 'New features added',
          fontSize: Math.round(w * 0.04),
          fill: '#FFFFFF',
          stroke: '#1F1F1F',
          strokeWidth: 5,
          align: 'center'
        }),
        createBadgeElement({
          x: w * 0.04,
          y: h * 0.52,
          width: w * 0.28,
          height: h * 0.07,
          text: 'New Feature',
          bgColor: '#9BC5E8',
          textColor: '#1F1F1F',
          fontSize: Math.round(w * 0.018)
        }),
        createBadgeElement({
          x: w * 0.04,
          y: h * 0.62,
          width: w * 0.28,
          height: h * 0.07,
          text: 'Bug Fixes',
          bgColor: '#9BC5E8',
          textColor: '#1F1F1F',
          fontSize: Math.round(w * 0.018)
        }),
        createBadgeElement({
          x: w * 0.04,
          y: h * 0.72,
          width: w * 0.28,
          height: h * 0.07,
          text: 'New Map',
          bgColor: '#9BC5E8',
          textColor: '#1F1F1F',
          fontSize: Math.round(w * 0.018)
        }),
        createBadgeElement({
          x: w * 0.74,
          y: h * 0.83,
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
    description: 'Title top, features on the right',
    build: (w, h) => ({
      elements: [
        createTextElement({
          x: w * 0.05,
          y: 30,
          width: w * 0.9,
          text: 'SCRIPT NAME',
          fontSize: Math.round(w * 0.075),
          fill: '#FFFFFF',
          stroke: '#1F1F1F',
          strokeWidth: 6,
          align: 'center'
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
    description: 'Clean title + badge',
    build: (w, h) => ({
      elements: [
        createTextElement({
          x: w * 0.1,
          y: h * 0.32,
          width: w * 0.8,
          text: 'SCRIPT NAME',
          fontSize: Math.round(w * 0.1),
          fill: '#FFFFFF',
          stroke: '#1F1F1F',
          strokeWidth: 8,
          align: 'center'
        }),
        createBadgeElement({
          x: w * 0.4,
          y: h * 0.58,
          width: w * 0.2,
          height: h * 0.1,
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
