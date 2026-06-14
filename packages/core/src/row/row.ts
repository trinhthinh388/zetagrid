import { Cell } from '../cell/cell';
import { RenderResult } from '../common';
import { GridChildComponent } from '../common/grid-child-component';
import { ComputedRect, RowData } from '../types';
import { generateId } from '../utils/generate-id';
import { IRow, RowState, RowType } from './types';

export type RowContructorParams<TData extends RowData = RowData> = {
  gridId: string;
  rowIndex: number;
  nodeCount: number;
};

export abstract class Row<TData extends RowData = RowData>
  extends GridChildComponent<RowState<TData>, TData>
  implements IRow<TData>
{
  protected rowId: string;
  protected type: RowType;
  protected rowIndex: number;
  protected cells: Cell<TData>[];
  protected cellMaps: Map<string, Cell<TData>>;

  getRowId = (): string => {
    return this.rowId;
  };

  getCells = (): Cell<TData>[] => {
    return this.cells;
  };

  override refresh = (): void => {
    this.cells.forEach((cell) => cell.refresh());
  };

  getCellById = (cellId: string): Cell<TData> | undefined => {
    return this.cellMaps.get(cellId);
  };

  insertCell = (cell: Cell<TData>): void => {
    this.cells.push(cell);
    this.cellMaps.set(cell.getId(), cell);
  };

  destroy = (): void => {
    this.cells.forEach((cell) => cell.destroy());
    this.disposes.forEach((dispose) => dispose());
    this.cellMaps.clear();
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

  init = (): void => {
    this.cells.forEach((cell) => cell.init());
    this.measure();

    this.useEffect(() => {
      this.measure();
    });

    this.state.set('init', true);
  };

  override measure = (): ComputedRect => {
    this.rect.set(
      'height',
      this.cells.reduce((height, cell) => Math.min(height, cell.getRect().height), Infinity),
    );
    this.rect.set(
      'width',
      this.cells.reduce((width, cell) => width + cell.getRect().width, 0),
    );
    return this.rect.get();
  };

  constructor({ gridId, rowIndex }: RowContructorParams<TData>) {
    super({ gridId });
    this.cells = [];
    this.type = 'body';
    this.rowIndex = rowIndex;
    this.cellMaps = new Map();
    this.rowId = `row:${generateId()}`;
  }
}
