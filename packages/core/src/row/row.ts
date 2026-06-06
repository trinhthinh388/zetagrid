import { proxy } from 'valtio';
import { batch, effect } from 'valtio-reactive';
import { Cell } from '../cell/cell';
import { Grid } from '../grid/grid';
import { ComputedRect, ElementAttributes, RowData } from '../types';
import { generateId } from '../utils/generate-id';
import { IRow, RowState, RowType } from './types';

export type RowContructorParams<TData extends RowData = RowData> = {
  rowIndex: number;
  nodeCount: number;
  grid: Grid<TData>;
};

export abstract class Row<TData extends RowData = RowData> implements IRow<TData> {
  rowId: string;
  type: RowType;
  rowIndex: number;
  grid: Grid<TData>;
  cells: Cell<TData>[];
  disposes: VoidFunction[];
  dom: HTMLDivElement | null;
  cellMaps: Map<string, Cell<TData>>;

  state: RowState<TData> = proxy({
    init: false,
  });
  rect: ComputedRect = proxy({
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  constructor({ grid, rowIndex }: RowContructorParams<TData>) {
    this.dom = null;
    this.cells = [];
    this.grid = grid;
    this.disposes = [];
    this.type = 'body';
    this.rowIndex = rowIndex;
    this.cellMaps = new Map();
    this.rowId = `row:${generateId()}`;
  }

  destroy = (): void => {
    this.disposes.forEach((dispose) => dispose());
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

  init = (): void => {
    if (!this.dom) return;

    this.cells.forEach((cell) => cell.init());
    this.#listenToCellRectChange();

    this.state.init = true;
  };

  measure() {
    batch(() => {
      this.rect.width = this.cells.reduce((sum, cell) => sum + cell.rect.width, 0);
      this.rect.height = this.cells.reduce(
        (height, cell) => Math.min(height, cell.rect.height),
        Infinity,
      );
    });
  }

  #listenToCellRectChange() {
    this.disposes.push(
      effect(() => {
        this.measure();
      }),
    );
  }
}
