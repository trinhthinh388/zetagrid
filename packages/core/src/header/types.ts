import { HeaderRow } from '../row/header-row';
import { ElementAttributes, RowData } from '../types';

export interface IHeader<TData extends RowData = RowData> {
  init: () => void;
  destroy: () => void;
  getHeaderRows: () => HeaderRow<TData>[];
  ref: (element: HTMLDivElement | null) => void;
  getHeaderRowById: (rowId: string) => HeaderRow<TData> | undefined;
  getElementAttributes: (part: 'header' | 'headerContainer') => ElementAttributes;
}

export type HeaderState = {
  init: boolean;
};
