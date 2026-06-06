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

  ref = (element: HTMLDivElement | null): void => {
    this.dom = element;
    if (!this.state.init) this.init();
  };

  getHeaderRowById = (rowId: string): HeaderRow<TData> => {
    const row = this.rowsMap.get(rowId);
    if (!row) throw new Error('Cannot get row');
    return row;
  };

  init = (): void => {
    if (!this.dom) return;
    this.#maxDepth = this.#getMaxColumnDefinitionDepth();
    this.#initRows();
    this.#initCells();
    this.state.init = true;
  };

  getCellById = (cellId: string): Cell<TData> => {
    for (const row of this.rows) {
      const cell = row.getCellById(cellId);
      if (cell) return cell;
    }

    throw new Error(`Cannot find cell with id ${cellId}`);
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
    this.rows = Array.from({ length: this.#maxDepth }).map((_, rowIndex) => {
      const row = new HeaderRow<TData>({ rowIndex, grid: this.grid });
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
    const _isLeaf = (columnDefinition: ColumnDefinition<TData>) =>
      !columnDefinition.children.length;

    const _getColSpan = (columnDefinition: ColumnDefinition<TData>): number => {
      if (!columnDefinition.children.length) return 1;
      return columnDefinition.children.reduce((acc, child) => acc + _getColSpan(child), 0);
    };

    const _insert = (
      columnDefinitions: ColumnDefinition<TData>[],
      colIndex: number,
      currentLevel = 0,
    ) => {
      columnDefinitions.forEach((columnDefinition) => {
        const isLeaf = _isLeaf(columnDefinition);
        const colSpan = _getColSpan(columnDefinition);
        const rowSpan = isLeaf ? this.#maxDepth - currentLevel : 1;
        const rowIndex = isLeaf ? this.#maxDepth - 1 : currentLevel;
        this.rows.at(rowIndex)?.insertCell(
          new Cell<TData>({
            colSpan,
            rowSpan,
            colIndex,
            rowIndex,
            grid: this.grid,
            renderer: () => columnDefinition.title,
          }),
        );

        if (columnDefinition.children) {
          _insert(columnDefinition.children, colIndex, currentLevel + 1);
        }
      });
    };

    _insert(this.grid.getColumnDefinitions(), 0, 0);
  }
}
