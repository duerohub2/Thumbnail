'use client';

import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes
} from 'react';

interface BaseProps {
  label: string;
}

export function Input({
  label,
  className = '',
  ...rest
}: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="panel-label">{label}</label>
      <input className={`brutal-input ${className}`} {...rest} />
    </div>
  );
}

export function Textarea({
  label,
  className = '',
  ...rest
}: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label className="panel-label">{label}</label>
      <textarea className={`brutal-input ${className}`} {...rest} />
    </div>
  );
}

export function Select({
  label,
  className = '',
  children,
  ...rest
}: BaseProps & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label className="panel-label">{label}</label>
      <select className={`brutal-input ${className}`} {...rest}>
        {children}
      </select>
    </div>
  );
}

export function ColorInput({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="panel-label">{label}</label>
      <div className="flex gap-2 items-center">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="brutal-border w-10 h-10 cursor-pointer bg-white p-0"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="brutal-input flex-1"
        />
      </div>
    </div>
  );
}

export function RangeInput({
  label,
  value,
  min,
  max,
  step = 1,
  onChange
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <label className="panel-label">
        {label} ({value})
      </label>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}
