import { ElementAttributes, RowData } from '../types';

export type RowType = 'header' | 'body' | 'footer';

export interface IRow<TData extends RowData = RowData> {
  init(): void;
  destroy(): void;
  ref(el: HTMLDivElement | null): void;
  getElementAttributes(): ElementAttributes;
}

export type RowState = {
  init: boolean;
};
