import { ComputedRect, ElementAttributes, RowData } from '../types';
import { Cell } from './cell';

export interface ICell<TData extends RowData = RowData> {
  init: () => void;
  destroy: () => void;
  measure: () => ComputedRect;
  render: <T = unknown>() => T;
  ref: (el: HTMLDivElement | null) => void;
  getElementAttributes: () => ElementAttributes;
}

export type CellRenderer<TData extends RowData = RowData> = (
  data?: TData,
  cell?: Cell<TData>,
) => unknown;

export type CellState<TData extends RowData = RowData> = {
  init: boolean;
};
