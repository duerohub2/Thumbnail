import { generateId } from '@/lib/utils/id';
import type {
  BadgeElementData,
  ImageElementData,
  TextElementData
} from '@/types';

export function createTextElement(
  overrides: Partial<TextElementData> = {}
): TextElementData {
  return {
    id: generateId(),
    type: 'text',
    x: 100,
    y: 100,
    width: 500,
    height: 100,
    rotation: 0,
    opacity: 1,
    visible: true,
    locked: false,
    text: 'Text here',
    fontSize: 64,
    fontFamily: 'Bungee',
    fontWeight: 400,
    fill: '#FFFFFF',
    stroke: '#1F1F1F',
    strokeWidth: 4,
    align: 'center',
    letterSpacing: 0,
    lineHeight: 1,
    shadowColor: '#000000',
    shadowBlur: 0,
    shadowOffsetX: 4,
    shadowOffsetY: 4,
    ...overrides
  };
}

export function createImageElement(
  src: string,
  overrides: Partial<ImageElementData> = {}
): ImageElementData {
  return {
    id: generateId(),
    type: 'image',
    x: 100,
    y: 100,
    width: 300,
    height: 300,
    rotation: 0,
    opacity: 1,
    visible: true,
    locked: false,
    src,
    cornerRadius: 8,
    shadowColor: '#000000',
    shadowBlur: 20,
    shadowOffsetX: 0,
    shadowOffsetY: 8,
    ...overrides
  };
}

export function createBadgeElement(
  overrides: Partial<BadgeElementData> = {}
): BadgeElementData {
  return {
    id: generateId(),
    type: 'badge',
    x: 100,
    y: 100,
    width: 220,
    height: 70,
    rotation: -4,
    opacity: 1,
    visible: true,
    locked: false,
    text: 'Keyless',
    bgColor: '#A8E6A3',
    textColor: '#0F3F0F',
    fontSize: 32,
    fontFamily: 'Bungee',
    paddingX: 24,
    paddingY: 12,
    cornerRadius: 12,
    rotationBias: -4,
    ...overrides
  };
}
