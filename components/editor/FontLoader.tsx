'use client';

import { useEffect } from 'react';
import { FONT_OPTIONS } from '@/lib/constants';

export function FontLoader() {
  useEffect(() => {
    const families = FONT_OPTIONS.map((f) => f.value.replace(/ /g, '+')).join(
      '&family='
    );
    const url = `https://fonts.googleapis.com/css2?family=${families}&display=swap`;

    if (document.querySelector(`link[data-duerohub-fonts="true"]`)) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.setAttribute('data-duerohub-fonts', 'true');
    document.head.appendChild(link);
  }, []);

  return null;
}
