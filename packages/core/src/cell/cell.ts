import { proxy } from 'valtio';
import { Grid } from '../grid/grid';
import { RowData } from '../types';
import { ComputedRect } from '../types/rect';
import { getComputedRect } from '../utils/get-computed-rect';
import { CellState, ICell } from './types';

export type CellContructorParams<TData extends RowData = RowData> = {
  rowSpan: number;
  colSpan: number;
  rowIndex: number;
  colIndex: number;
  grid: Grid<TData>;
};

export class Cell<TData extends RowData = RowData> implements ICell<TData> {
  colSpan: number;
  rowSpan: number;
  colIndex: number;
  rowIndex: number;
  grid: Grid<TData>;
  dom: HTMLDivElement;

  state: CellState<TData> = proxy({
    init: false,
  });
  rect: ComputedRect = proxy({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  constructor({ grid, rowSpan, colSpan, rowIndex, colIndex }: CellContructorParams<TData>) {
    this.grid = grid;
    this.colSpan = colSpan;
    this.rowSpan = rowSpan;
    this.colIndex = colIndex;
    this.rowIndex = rowIndex;
    this.dom = window.document.createElement('div');
  }

  destroy = (): void => {};

  render = (): unknown => {};

  init = (): void => {
    this.state.init = true;
  };

  measure = (): ComputedRect => {
    this.rect = getComputedRect(this.dom);
    return this.rect;
  };
}
