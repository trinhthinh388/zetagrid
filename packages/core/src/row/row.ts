import { Cell } from '../cell/cell';
import { BaseGridComponent, RenderResult } from '../common';
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

  getCells = (): Cell<TData>[] => {
    return this.cells;
  };

  destroy = (): void => {
    this.disposes.forEach((dispose) => dispose());
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

  render = (): RenderResult[] => [
    {
      children: [],
      attributes: {
        role: 'row',
        className: '',
        'data-slot': 'row',
      },
    },
  ];
}
