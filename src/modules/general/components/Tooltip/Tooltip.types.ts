import React from 'react';

export interface CustomTooltipProps {
  children: React.ReactNode;
  title: string;
  content?: string;
  theme?: 'light' | 'dark';
  tipPosition: 'none' | 'top' | 'bottom' | 'left' | 'right' | 'bottom-start' | 'bottom-end';
}
