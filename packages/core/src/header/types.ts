import { Cell } from '../cell/cell';
import { HeaderRow } from '../row/header-row';
import { ElementAttributes, RowData } from '../types';

export interface IHeader<TData extends RowData = RowData> {
  init: () => void;
  destroy: () => void;
  getHeaderRows: () => HeaderRow<TData>[];
  getCellById: (cellId: string) => Cell<TData>;
  ref: (element: HTMLDivElement | null) => void;
  getHeaderRowById: (rowId: string) => HeaderRow<TData>;
  getElementAttributes: (part: 'header' | 'headerContainer') => ElementAttributes;
}

export type HeaderState = {
  init: boolean;
};
