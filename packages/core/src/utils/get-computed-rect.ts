import { ComputedRect } from '../types/rect';
import { pxToNumber } from './px-to-number';

export const getComputedRect = (el: HTMLDivElement): ComputedRect => {
  const {
    x,
    y,
    width,
    height,
    borderTopWidth,
    borderLeftWidth,
    borderRightWidth,
    borderBottomWidth,
  } = window.getComputedStyle(el);
  return {
    x: parseFloat(x),
    y: parseFloat(y),
    width: pxToNumber(width) - pxToNumber(borderLeftWidth) - pxToNumber(borderRightWidth),
    height: pxToNumber(height) - pxToNumber(borderTopWidth) - pxToNumber(borderBottomWidth),
  };
};
