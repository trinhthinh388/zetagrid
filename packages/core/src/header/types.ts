import { Cell } from '../cell/cell';
import { HeaderRow } from '../row/header-row';
import { RowData } from '../types';

export interface IHeader<TData extends RowData = RowData> {
  getPrefixWidthSum: () => number[];
  getPrefixHeightSum: () => number[];
  getHeaderRows: () => HeaderRow<TData>[];
  getCellById: (cellId: string) => Cell<TData>;
  getHeaderRowById: (rowId: string) => HeaderRow<TData>;
}

export type HeaderState = {
  init: boolean;
};
