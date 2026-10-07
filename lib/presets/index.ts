export interface StylePreset {
  id: string;
  name: string;
  description: string;
  title: {
    fontFamily: string;
    fill: string;
    stroke: string;
    strokeWidth: number;
  };
  badge: {
    bgColor: string;
    textColor: string;
    fontFamily: string;
  };
  text: {
    fontFamily: string;
    fill: string;
    stroke: string;
    strokeWidth: number;
  };
}

export const PRESETS: StylePreset[] = [
  {
    id: 'roblox',
    name: 'Roblox',
    description: 'Brand palette',
    title: {
      fontFamily: 'Bungee',
      fill: '#FFD84D',
      stroke: '#1F1F1F',
      strokeWidth: 6
    },
    badge: {
      bgColor: '#A8E6A3',
      textColor: '#0F3F0F',
      fontFamily: 'Bungee'
    },
    text: {
      fontFamily: 'Bungee',
      fill: '#FFFFFF',
      stroke: '#1F1F1F',
      strokeWidth: 5
    }
  },
  {
    id: 'neon',
    name: 'Neon',
    description: 'Bright + glow',
    title: {
      fontFamily: 'Bungee',
      fill: '#FF00FF',
      stroke: '#FFFFFF',
      strokeWidth: 5
    },
    badge: {
      bgColor: '#00FFFF',
      textColor: '#000000',
      fontFamily: 'Bungee'
    },
    text: {
      fontFamily: 'Bungee',
      fill: '#FFFF00',
      stroke: '#FF00FF',
      strokeWidth: 4
    }
  },
  {
    id: 'cartoon',
    name: 'Cartoon',
    description: 'Playful pastel',
    title: {
      fontFamily: 'Lilita One',
      fill: '#FFC4D6',
      stroke: '#1F1F1F',
      strokeWidth: 6
    },
    badge: {
      bgColor: '#FFD84D',
      textColor: '#1F1F1F',
      fontFamily: 'Lilita One'
    },
    text: {
      fontFamily: 'Lilita One',
      fill: '#FFFFFF',
      stroke: '#B8A4E8',
      strokeWidth: 5
    }
  },
  {
    id: 'dark',
    name: 'Dark',
    description: 'Moody & sharp',
    title: {
      fontFamily: 'Anton',
      fill: '#FFFFFF',
      stroke: '#000000',
      strokeWidth: 7
    },
    badge: {
      bgColor: '#1F1F1F',
      textColor: '#FFD84D',
      fontFamily: 'Anton'
    },
    text: {
      fontFamily: 'Anton',
      fill: '#FF8579',
      stroke: '#000000',
      strokeWidth: 5
    }
  },
  {
    id: 'retro',
    name: 'Retro',
    description: 'Warm vintage',
    title: {
      fontFamily: 'Permanent Marker',
      fill: '#FFD84D',
      stroke: '#8B4513',
      strokeWidth: 5
    },
    badge: {
      bgColor: '#FF8579',
      textColor: '#FFFFFF',
      fontFamily: 'Permanent Marker'
    },
    text: {
      fontFamily: 'Permanent Marker',
      fill: '#FFD84D',
      stroke: '#8B4513',
      strokeWidth: 4
    }
  }
];
