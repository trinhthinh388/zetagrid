/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDefinition } from './column';
import { RowData } from './data';

export type ZetaGridHeaderRenderer<TData extends RowData> = (columnDefinition: ColumnDefinition<TData>) => any;
export type ZetaGridCellRenderer<TData extends RowData> = (data: TData) => any;

export type IGridRenderer<TData extends RowData> = {
  cellRenderer: ZetaGridCellRenderer<TData>;
  headerRenderer: ZetaGridHeaderRenderer<TData>;
};

export type GridRenderResult = {
  headers: any[];
};
