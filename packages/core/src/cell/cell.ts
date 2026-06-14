import { RenderResult } from '../common';
import { GridChildComponent } from '../common/grid-child-component';
import { RowData } from '../types';
import { generateId } from '../utils';
import { CellRenderer, CellState, ICell } from './types';

export type CellContructorParams<TData extends RowData = RowData> = {
  gridId: string;
  rowSpan: number;
  colSpan: number;
  rowIndex: number;
  colIndex: number;
  renderer: CellRenderer<TData>;
};

export class Cell<TData extends RowData = RowData>
  extends GridChildComponent<CellState<TData>, TData>
  implements ICell<TData>
{
  static DEFAULT_CELL_HEIGHT = 40;
  static DEFAULT_CELL_WIDTH = 200;

  private id: string;
  private colSpan: number;
  private rowSpan: number;
  private colIndex: number;
  private rowIndex: number;

  private renderer: CellRenderer<TData>;

  getId = (): string => this.id;

  getColSpan = (): number => this.colSpan;

  getRowSpan = (): number => this.rowSpan;

  getRowIndex = (): number => this.rowIndex;

  getColIndex = (): number => this.colIndex;

  renderCell = <T = unknown>(): T => this.renderer();

  override refresh = (): void => {
    console.log('refresh cell');
  };

  destroy = (): void => {
    this.disposes.forEach((dispose) => dispose());
  };

  init = (): void => {
    this.rect.set(
      'width',
      Math.max(this.rect.get('width'), Cell.DEFAULT_CELL_WIDTH) * this.colSpan,
    );
    this.rect.set(
      'height',
      Math.max(this.rect.get('height'), Cell.DEFAULT_CELL_HEIGHT) * this.rowSpan,
    );
    this.state.set('init', true);
  };

  render = (): RenderResult[] => [
    {
      children: [],
      attributes: {
        role: 'gridcell',
        'data-cell-id': this.id,
        'data-slot': 'grid-cell',
        className: 'zeta-grid__cell',
        'aria-rowspan': this.rowSpan,
        'aria-colspan': this.colSpan,
        'aria-rowindex': this.rowIndex,
        'aria-colindex': this.colIndex,
        style: {
          top: this.rect.get('top'),
          left: this.rect.get('left'),
          width: this.rect.get('width'),
          height: this.rect.get('height'),
        },
      },
    },
  ];

  constructor({
    gridId,
    rowSpan,
    colSpan,
    rowIndex,
    colIndex,
    renderer,
  }: CellContructorParams<TData>) {
    super({ gridId });
    this.id = `cell-${generateId()}`;
    this.colSpan = colSpan;
    this.rowSpan = rowSpan;
    this.colIndex = colIndex;
    this.rowIndex = rowIndex;
    this.renderer = renderer;
  }
}
