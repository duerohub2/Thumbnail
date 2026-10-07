export type ElementType = 'text' | 'image' | 'badge';

export interface BaseElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  visible: boolean;
  locked: boolean;
}

export interface TextElementData extends BaseElement {
  type: 'text';
  text: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  align: 'left' | 'center' | 'right';
  letterSpacing: number;
  lineHeight: number;
  shadowColor: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
}

export interface ImageElementData extends BaseElement {
  type: 'image';
  src: string;
  cornerRadius: number;
  shadowColor: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
}

export interface BadgeElementData extends BaseElement {
  type: 'badge';
  text: string;
  bgColor: string;
  textColor: string;
  fontSize: number;
  fontFamily: string;
  paddingX: number;
  paddingY: number;
  cornerRadius: number;
  rotationBias: number;
}

export type CanvasElement =
  | TextElementData
  | ImageElementData
  | BadgeElementData;

export interface CanvasBackground {
  imageSrc: string | null;
  color: string;
  brightness: number;
  blur: number;
}

export interface EditorState {
  canvasWidth: number;
  canvasHeight: number;
  background: CanvasBackground;
  elements: CanvasElement[];
  selectedId: string | null;
  zoom: number;
  panX: number;
  panY: number;
}
