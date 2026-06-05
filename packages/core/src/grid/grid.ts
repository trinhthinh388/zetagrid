import { proxy } from 'valtio';
import { HeaderRow } from '../row/header-row';
import { Row } from '../row/row';
import { ComputedRect, ElementAttributes, RowData } from '../types';
import { ColumnDefinition } from '../types/columns';
import { getComputedRect } from '../utils/get-computed-rect';
import { GridObservers, GridState, IGrid } from './types';

export type GridConstructorParams<TData extends RowData = RowData> = {
  data: TData[];
  columnDefinitions: ColumnDefinition<TData>[];
};

export class Grid<TData extends RowData = RowData> implements IGrid<TData> {
  data: TData[];
  rows: Row<TData>[];
  rect: ComputedRect;
  root: HTMLElement | null;
  observers: GridObservers;
  columnDefinitions: ColumnDefinition<TData>[];

  state: GridState = proxy({
    init: false,
  });

  constructor({ data, columnDefinitions }: GridConstructorParams<TData>) {
    this.rect = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
    this.root = null;
    this.rows = [];
    this.data = data;
    this.columnDefinitions = columnDefinitions;
    this.observers = {
      resize: this.#createResizeObserver(),
    };
  }

  destroy(): void {
    this.observers.resize.disconnect();
  }

  getHeaders(): HeaderRow<TData>[] {
    return this.rows.filter((row) => row instanceof HeaderRow);
  }

  ref(element: HTMLDivElement | null): void {
    this.root = element;
    if (!this.state.init) this.init();
  }

  init(): void {
    if (!this.root) return;
    this.#initGrid();
    this.#initRows();
    this.state.init = true;
  }

  getElementAttributes(): ElementAttributes {
    return {
      role: 'grid',
      'data-slot': 'grid',
      className: 'zeta-grid__root',
    };
  }

  #createResizeObserver(): ResizeObserver {
    const callback = () => void 0;
    return new ResizeObserver(callback);
  }

  #initGrid() {
    if (!this.root) return;
    this.rect = getComputedRect(this.root as HTMLDivElement);
    this.observers.resize.observe(this.root);
  }

  #initRows() {
    this.rows = [new HeaderRow<TData>({ grid: this, columnDefinitions: this.columnDefinitions })];
    this.rows.forEach((row) => row.init());
  }
}
