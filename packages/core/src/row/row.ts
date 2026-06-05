import { Grid } from '../grid/grid';
import { ElementAttributes, RowData } from '../types';
import { generateId } from '../utils/generate-id';
import { IRow, RowType } from './types';

export type RowContructorParams<TData extends RowData = RowData> = {
  grid: Grid<TData>;
};

export abstract class Row<TData extends RowData = RowData> implements IRow<TData> {
  rowId: string;
  type: RowType;
  grid: Grid<TData>;
  dom: HTMLDivElement | null;

  constructor({ grid }: RowContructorParams<TData>) {
    this.dom = null;
    this.grid = grid;
    this.type = 'body';
    this.rowId = `row:${generateId()}`;
  }

  init(): void {
    return void 0;
  }

  destroy(): void {
    return void 0;
  }

  ref(el: HTMLDivElement | null): void {
    this.dom = el;
  }

  getElementAttributes(): ElementAttributes {
    return {
      className: 'row',
      'data-slot': 'row',
      role: 'presentation',
    };
  }
}
