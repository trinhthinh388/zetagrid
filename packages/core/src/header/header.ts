import { proxy } from 'valtio';
import { Cell } from '../cell/cell';
import { Grid } from '../grid/grid';
import { HeaderRow } from '../row/header-row';
import { ColumnDefinition, ElementAttributes, RowData } from '../types';
import { HeaderState, IHeader } from './types';

export type HeaderContructorParams<TData extends RowData = RowData> = {
  grid: Grid<TData>;
};

export class Header<TData extends RowData = RowData> implements IHeader<TData> {
  grid: Grid<TData>;
  dom: HTMLElement | null;
  rows: HeaderRow<TData>[];
  rowsMap: Map<string, HeaderRow<TData>>;
  state: HeaderState = proxy({
    init: false,
  });

  #maxDepth = 0;

  constructor({ grid }: HeaderContructorParams<TData>) {
    this.rows = [];
    this.dom = null;
    this.grid = grid;
    this.rowsMap = new Map();
  }

  getHeaderRows = (): HeaderRow<TData>[] => {
    return this.rows;
  };

  destroy = (): void => {
    this.rowsMap.clear();
    this.rows.forEach((row) => row.destroy());
  };

  getHeaderRowById = (rowId: string): HeaderRow<TData> | undefined => {
    return this.rowsMap.get(rowId);
  };

  ref = (element: HTMLDivElement | null): void => {
    this.dom = element;
    if (!this.state.init) this.init();
  };

  init = (): void => {
    this.#maxDepth = this.#getMaxColumnDefinitionDepth();
    this.#initRows();
    this.#initCells();

    this.rows.forEach((row) => row.init());
    this.state.init = true;
  };

  getElementAttributes = (part: 'header' | 'headerContainer'): ElementAttributes => {
    if (part === 'headerContainer') {
      return {
        role: 'presentation',
        'data-slot': 'grid-header-container',
        className: 'zeta-grid__header-container',
      };
    }

    return {
      role: 'header',
      'data-slot': 'presentation',
      className: 'zeta-grid__header',
    };
  };

  #initRows() {
    this.rows = Array.from({ length: this.#maxDepth }).map(() => {
      const row = new HeaderRow<TData>({ grid: this.grid });
      this.rowsMap.set(row.rowId, row);
      return row;
    });
  }

  #getMaxColumnDefinitionDepth(): number {
    const dfs = (columnDefinition?: ColumnDefinition<TData>): number => {
      if (!columnDefinition) return 0;
      return columnDefinition.children.reduce(
        (max, def: ColumnDefinition<TData> | undefined) => Math.max(max, dfs(def) + 1),
        1,
      );
    };
    return this.grid.getColumnDefinitions().reduce((max, def) => Math.max(max, dfs(def)), 0);
  }

  #initCells() {
    const columnDefinitions = this.grid.getColumnDefinitions();

    const distributeCell = (
      columnDefinition: ColumnDefinition<TData>,
      colIndex: number,
      depth = 0,
    ) => {
      const row = this.rows[depth];
      if (!row) return;
      const rowSpan = Math.max(columnDefinition.children.length, 1);
      const colSpan = depth === 0 && !rowSpan ? this.#maxDepth : 1;
      row.cells.push(new Cell({ rowSpan, colSpan, colIndex, rowIndex: depth, grid: this.grid }));

      columnDefinition.children.forEach((columnDefinition, index) =>
        distributeCell(columnDefinition, index, depth + 1),
      );
    };

    columnDefinitions.forEach((columnDefinition, index) =>
      distributeCell(columnDefinition, index, 0),
    );
  }
}
