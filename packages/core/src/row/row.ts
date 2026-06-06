import { proxy } from 'valtio';
import { Cell } from '../cell/cell';
import { Grid } from '../grid/grid';
import { ComputedRect, ElementAttributes, RowData } from '../types';
import { generateId } from '../utils/generate-id';
import { IRow, RowState, RowType } from './types';

export type RowContructorParams<TData extends RowData = RowData> = {
  rowIndex: number;
  grid: Grid<TData>;
};

export abstract class Row<TData extends RowData = RowData> implements IRow<TData> {
  rowId: string;
  type: RowType;
  rowIndex: number;
  grid: Grid<TData>;
  cells: Cell<TData>[];
  prefixWidthSum: number[];
  dom: HTMLDivElement | null;
  cellMaps: Map<string, Cell<TData>>;
  state: RowState<TData> = proxy({
    init: false,
  });
  rect: ComputedRect = proxy({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  constructor({ grid, rowIndex }: RowContructorParams<TData>) {
    this.dom = null;
    this.cells = [];
    this.grid = grid;
    this.type = 'body';
    this.prefixWidthSum = [];
    this.rowIndex = rowIndex;
    this.cellMaps = new Map();
    this.rowId = `row:${generateId()}`;
  }

  destroy = (): void => {
    return void 0;
  };

  init = (): void => {
    if (!this.dom) return;
    this.state.init = true;
  };

  getCellById = (cellId: string): Cell<TData> | undefined => {
    return this.cellMaps.get(cellId);
  };

  ref = (el: HTMLDivElement | null): void => {
    this.dom = el;
    if (!this.state.init) this.init();
  };

  insertCell = (cell: Cell<TData>): void => {
    this.cells.push(cell);
    this.cellMaps.set(cell.id, cell);
  };

  getElementAttributes = (): ElementAttributes => {
    return {
      className: 'row',
      'data-slot': 'row',
      role: 'presentation',
    };
  };
}
