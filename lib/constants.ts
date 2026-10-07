export const FONT_OPTIONS = [
  { value: 'Bungee', label: 'Bungee' },
  { value: 'Anton', label: 'Anton' },
  { value: 'Titan One', label: 'Titan One' },
  { value: 'Russo One', label: 'Russo One' },
  { value: 'Lilita One', label: 'Lilita One' },
  { value: 'Archivo Black', label: 'Archivo Black' },
  { value: 'Luckiest Guy', label: 'Luckiest Guy' },
  { value: 'Permanent Marker', label: 'Permanent Marker' },
  { value: 'Righteous', label: 'Righteous' },
  { value: 'Passion One', label: 'Passion One' }
];

export const CANVAS_PRESETS = [
  { value: 'youtube', label: 'YouTube (1280x720)', width: 1280, height: 720 },
  { value: 'youtube-4k', label: 'YouTube 4K (2560x1440)', width: 2560, height: 1440 },
  { value: 'roblox-card', label: 'Roblox Card (1200x750)', width: 1200, height: 750 },
  { value: 'instagram', label: 'Instagram (1080x1080)', width: 1080, height: 1080 },
  { value: 'tiktok', label: 'TikTok (1080x1920)', width: 1080, height: 1920 }
];

export const BADGE_PRESETS = [
  { text: 'Keyless', bgColor: '#A8E6A3', textColor: '#0F3F0F' },
  { text: 'Verified', bgColor: '#FF8579', textColor: '#FFFFFF' },
  { text: 'New', bgColor: '#FFD84D', textColor: '#1F1F1F' },
  { text: 'Hot', bgColor: '#FF5A5F', textColor: '#FFFFFF' },
  { text: 'Free', bgColor: '#9BC5E8', textColor: '#1F1F1F' },
  { text: 'Update', bgColor: '#B8A4E8', textColor: '#1F1F1F' }
];

export const STORAGE_KEY = 'duerohub-thumb-editor';

export const GOOGLE_FONTS_URL =
  'https://fonts.googleapis.com/css2?family=' +
  FONT_OPTIONS.map((f) => f.value.replace(/ /g, '+')).join('&family=') +
  '&display=swap';
