import { HeaderRow } from '../row/header-row';
import { ElementAttributes, RowData } from '../types';

export interface IGrid<TData extends RowData = RowData> {
  init(): void;
  destroy(): void;
  getHeaders(): HeaderRow<TData>[];
  ref(element: HTMLDivElement | null): void;
  getElementAttributes(): ElementAttributes;
}

export type GridObservers = {
  resize: ResizeObserver;
};

export type GridState = {
  init: boolean;
};
