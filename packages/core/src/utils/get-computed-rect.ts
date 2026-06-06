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

  if (
    !x ||
    !y ||
    !width ||
    !height ||
    !borderTopWidth ||
    !borderLeftWidth ||
    !borderRightWidth ||
    !borderBottomWidth
  )
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };

  return {
    x: parseFloat(x),
    y: parseFloat(y),
    width: pxToNumber(width) - pxToNumber(borderLeftWidth) - pxToNumber(borderRightWidth),
    height: pxToNumber(height) - pxToNumber(borderTopWidth) - pxToNumber(borderBottomWidth),
  };
};
