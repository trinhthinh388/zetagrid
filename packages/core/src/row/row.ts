import { Cell } from '../cell/cell';
import { RowData } from '../types';
import { IRow, RowType } from './type';

export type RowContructorParams<TData extends RowData = RowData> = {
  data: TData;
  type: RowType;
};

export abstract class Row<TData extends RowData = RowData> implements IRow<TData> {
  data: TData;
  type: RowType;
  cells: Cell<TData>[];

  constructor({ data, type }: RowContructorParams<TData>) {
    this.data = data;
    this.type = type;
    this.cells = [];
  }
}
