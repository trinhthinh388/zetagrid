import { proxy } from 'valtio';
import { batch, effect } from 'valtio-reactive';
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
  /**
   * Disposed functions used to cleanup any `effect` listeners.
   */
  disposes: VoidFunction[];
  /**
   * Pre-calculated prefixSum of cells' width
   */
  prefixWidthSum: number[];
  /**
   * Pre-calculated prefixSum of cells' height
   */
  prefixHeightSum: number[];
  rowsMap: Map<string, HeaderRow<TData>>;

  state: HeaderState = proxy({
    init: false,
  });

  #maxDepth = 0;
  #leafNodeCount = 0;

  constructor({ grid }: HeaderContructorParams<TData>) {
    this.rows = [];
    this.dom = null;
    this.grid = grid;
    this.disposes = [];
    this.rowsMap = new Map();
    this.prefixWidthSum = [];
    this.prefixHeightSum = [];
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

  getCellById = (cellId: string): Cell<TData> => {
    for (const row of this.rows) {
      const cell = row.getCellById(cellId);
      if (cell) return cell;
    }

    throw new Error(`Cannot find cell with id ${cellId}`);
  };

  init = (): void => {
    if (!this.dom) return;
    this.#leafNodeCount = this.#getLeafNodeCount();
    this.#maxDepth = this.#getMaxColumnDefinitionDepth();
    this.#initRows();
    this.#initCells();

    // Calculation
    this.#calculatePrefixWidthSum();
    this.#calculatePrefixHeightSum();

    // Listeners
    this.#listenToRowRectChange();

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

  #isLeaf = (columnDefinition: ColumnDefinition<TData>) => !columnDefinition.children.length;

  #getLeafNodeCount(): number {
    return this.grid
      .getColumnDefinitions()
      .reduce((count, current) => count + this.#getColSpan(current), 0);
  }

  #calculatePrefixHeightSum() {
    let sofar = 0;
    for (let i = 0; i < this.rows.length; i++) {
      const row = this.rows[i];
      this.prefixHeightSum[i] = sofar;
      sofar += row.rect.height;
    }
  }

  #listenToRowRectChange() {
    this.disposes.push(
      effect(() => {
        this.#calculatePrefixWidthSum();
        this.#calculatePrefixHeightSum();
        this.#calculateCellPosition();
      }),
    );
  }

  #getColSpan = (columnDefinition: ColumnDefinition<TData>): number => {
    if (!columnDefinition.children.length) return 1;
    return columnDefinition.children.reduce((acc, child) => acc + this.#getColSpan(child), 0);
  };

  #calculatePrefixWidthSum() {
    const lastRow = this.rows.at(-1);
    if (!lastRow) return;

    let sofar = 0;
    for (let i = 0; i < lastRow.cells.length; i++) {
      const cell = lastRow.cells[i];
      this.prefixWidthSum[i] = sofar;
      sofar += cell.rect.width;
    }
  }

  #calculateCellPosition() {
    batch(() => {
      this.rows.forEach((row, rowIndex) => {
        row.cells.forEach((cell) => {
          cell.rect.left = this.prefixWidthSum[cell.colIndex];
          cell.rect.top = this.prefixHeightSum[rowIndex - (cell.rowSpan - 1)];
        });
      });
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

  #initRows() {
    const rowCount = this.#maxDepth;
    const columnCount = this.#leafNodeCount;

    this.rows = Array.from({ length: rowCount });
    this.prefixWidthSum = Array.from({ length: columnCount });

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      const row = new HeaderRow<TData>({
        rowIndex,
        grid: this.grid,
        nodeCount: this.#leafNodeCount,
      });
      this.rows[rowIndex] = row;
      this.rowsMap.set(row.rowId, row);
    }
  }

  #initCells() {
    const _insert = (
      columnDefinitions: ColumnDefinition<TData>[],
      currentLevel = 0,
      leafColStart = 0,
    ) => {
      let leafColOffset = leafColStart;
      columnDefinitions.forEach((columnDefinition) => {
        const isLeaf = this.#isLeaf(columnDefinition);
        const colSpan = this.#getColSpan(columnDefinition);
        const rowSpan = isLeaf ? this.#maxDepth - currentLevel : 1;
        const rowIndex = isLeaf ? this.#maxDepth - 1 : currentLevel; // Insert leaf node at the last row
        this.rows.at(rowIndex)?.insertCell(
          new Cell<TData>({
            colSpan,
            rowSpan,
            rowIndex,
            grid: this.grid,
            colIndex: leafColOffset,
            renderer: () => columnDefinition.title,
          }),
        );

        if (columnDefinition.children.length) {
          _insert(columnDefinition.children, currentLevel + 1, leafColOffset);
        }

        leafColOffset += colSpan;
      });
    };

    _insert(this.grid.getColumnDefinitions(), 0, 0);
  }
}
