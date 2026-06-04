import { RowData } from '../types';
import { ComputedRect } from '../types/rect';
import { getComputedRect } from '../utils/get-computed-rect';
import { CellRenderer, ICell } from './type';

export type CellContructorParams<TData extends RowData = RowData> = {
  data: TData;
  rowIndex: number;
  colIndex: number;
  renderer: CellRenderer<TData>;
};

export class Cell<TData extends RowData = RowData> implements ICell<TData> {
  data: TData;
  colIndex: number;
  rowIndex: number;
  dom: HTMLDivElement;
  renderer: CellRenderer<TData>;
  rect: ComputedRect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  constructor({ data, rowIndex, colIndex, renderer }: CellContructorParams<TData>) {
    this.data = data;
    this.colIndex = colIndex;
    this.rowIndex = rowIndex;
    this.renderer = renderer;
    this.dom = window.document.createElement('div');
  }

  render(): unknown {
    return this.renderer(this.data, this);
  }

  measure(): ComputedRect {
    this.rect = getComputedRect(this.dom);
    return this.rect;
  }
}
