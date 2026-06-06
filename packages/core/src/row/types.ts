import { Cell } from '../cell/cell';
import { ElementAttributes, RowData } from '../types';

export type RowType = 'header' | 'body' | 'footer';

export interface IRow<TData extends RowData = RowData> {
  init: () => void;
  destroy: () => void;
  insertCell: (cell: Cell<TData>) => void;
  ref: (el: HTMLDivElement | null) => void;
  getElementAttributes: () => ElementAttributes;
  getCellById: (cellId: string) => Cell<TData> | undefined;
}

export type RowState = {
  init: boolean;
};
