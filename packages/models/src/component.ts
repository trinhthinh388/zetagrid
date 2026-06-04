import { RowData } from './data';
import { Rect } from './rect';

export interface IComponent {
  measure: () => Rect;
  getRef: () => HTMLElement | null;
  render: () => unknown;
}

export interface Cell<TData extends RowData = RowData> extends IComponent {
  id: string;
  rect: Rect;
}
