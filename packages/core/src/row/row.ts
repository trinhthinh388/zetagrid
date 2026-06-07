import { batch } from 'valtio-reactive';
import { Cell } from '../cell/cell';
import { BaseGridComponent } from '../common';
import { Grid } from '../grid/grid';
import { RowData } from '../types';
import { generateId } from '../utils/generate-id';
import { IRow, RowState, RowType } from './types';

export type RowContructorParams<TData extends RowData = RowData> = {
  rowIndex: number;
  nodeCount: number;
  grid: Grid<TData>;
};

export abstract class Row<TData extends RowData = RowData>
  extends BaseGridComponent<RowState<TData>>
  implements IRow<TData>
{
  protected rowId: string;
  protected type: RowType;
  protected rowIndex: number;
  protected grid: Grid<TData>;
  protected cells: Cell<TData>[];
  protected cellMaps: Map<string, Cell<TData>>;

  constructor({ grid, rowIndex }: RowContructorParams<TData>) {
    super();
    this.cells = [];
    this.grid = grid;
    this.type = 'body';
    this.rowIndex = rowIndex;
    this.cellMaps = new Map();
    this.rowId = `row:${generateId()}`;
  }

  getRowId = (): string => {
    return this.rowId;
  };

  destroy = (): void => {
    this.state.cleanup();
  };

  render = (): HTMLDivElement => {
    return this.dom;
  };

  getCells = (): Cell<TData>[] => {
    return this.cells;
  };

  getCellById = (cellId: string): Cell<TData> | undefined => {
    return this.cellMaps.get(cellId);
  };

  init = (): void => {
    this.cells.forEach((cell) => cell.init());

    this.state.set('init', true);
  };

  insertCell = (cell: Cell<TData>): void => {
    this.cells.push(cell);
    this.cellMaps.set(cell.id, cell);
  };

  measure = () => {
    batch(() => {
      this.rect.width = this.cells.reduce((sum, cell) => sum + cell.rect.width, 0);
      this.rect.height = this.cells.reduce(
        (height, cell) => Math.min(height, cell.rect.height),
        Infinity,
      );
    });
  };
}
