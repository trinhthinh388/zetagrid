import { proxy } from 'valtio';
import { Grid } from '../grid/grid';
import { ElementAttributes, RowData } from '../types';
import { ComputedRect } from '../types/rect';
import { generateId } from '../utils';
import { getComputedRect } from '../utils/get-computed-rect';
import { CellRenderer, CellState, ICell } from './types';

export type CellContructorParams<TData extends RowData = RowData> = {
  rowSpan: number;
  colSpan: number;
  rowIndex: number;
  colIndex: number;
  grid: Grid<TData>;
  renderer: CellRenderer<TData>;
};

export class Cell<TData extends RowData = RowData> implements ICell<TData> {
  static DEFAULT_CELL_HEIGHT = 40;
  static DEFAULT_CELL_WIDTH = 200;

  id: string;
  colSpan: number;
  rowSpan: number;
  colIndex: number;
  rowIndex: number;
  grid: Grid<TData>;
  dom: HTMLDivElement | null;
  renderer: CellRenderer<TData>;

  state: CellState<TData> = proxy({
    init: false,
  });
  rect: ComputedRect = proxy({
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    width: Cell.DEFAULT_CELL_WIDTH,
    height: Cell.DEFAULT_CELL_HEIGHT,
  });

  constructor({
    grid,
    rowSpan,
    colSpan,
    rowIndex,
    colIndex,
    renderer,
  }: CellContructorParams<TData>) {
    this.id = `cell-${generateId()}`;
    this.dom = null;
    this.grid = grid;
    this.colSpan = colSpan;
    this.rowSpan = rowSpan;
    this.colIndex = colIndex;
    this.rowIndex = rowIndex;
    this.renderer = renderer;
  }

  destroy = (): void => {
    // Do noting
  };

  // @ts-expect-error temporary
  render = <T = unknown>(): T => this.renderer() as T;

  ref = (el: HTMLDivElement | null): void => {
    this.dom = el;
    if (!this.state.init) this.init();
  };

  measure = (): ComputedRect => {
    if (!this.dom) return this.rect;
    this.rect = getComputedRect(this.dom);
    return this.rect;
  };

  init = (): void => {
    this.rect.width = this.rect.width * this.colSpan;
    this.rect.height = this.rect.height * this.rowSpan;
    this.state.init = true;
  };

  getElementAttributes = (): ElementAttributes => {
    return {
      role: 'gridcell',
      'data-cell-id': this.id,
      'data-slot': 'grid-cell',
      className: 'zeta-grid__cell',
      'aria-rowspan': this.rowSpan,
      'aria-colspan': this.colSpan,
      'aria-rowindex': this.rowIndex,
      'aria-colindex': this.colIndex,
    };
  };
}
