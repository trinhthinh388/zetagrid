import { Header } from '../header/header';
import { ColumnDefinition, ElementAttributes, RowData } from '../types';

export interface IGrid<TData extends RowData = RowData> {
  init(): void;
  destroy(): void;
  getHeader(): Header<TData>;
  ref(element: HTMLDivElement | null): void;
  getElementAttributes(): ElementAttributes;
  getColumnDefinitions(): ColumnDefinition<TData>[];
}

export type GridObservers = {
  resize: ResizeObserver;
};

export type GridState = {
  init: boolean;
};
