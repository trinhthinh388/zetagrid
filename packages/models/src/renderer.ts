/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDefinition } from './column';

export type ZetaGridHeaderRenderer<TData> = (columnDefinition: ColumnDefinition<TData>) => any;
export type ZetaGridCellRenderer<TData> = (data: TData) => any;

export type IGridRenderer<TData> = {
  cellRenderer: ZetaGridCellRenderer<TData>;
  headerRenderer: ZetaGridHeaderRenderer<TData>;
};

export type GridRenderResult = {
  headers: any[];
};
