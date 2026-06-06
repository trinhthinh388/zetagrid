import { proxy } from 'valtio';
import { ElementAttributes, RowData } from '../types';
import { Row } from './row';
import { RowState, RowType } from './types';

type HeaderRowState = {} & RowState;

export class HeaderRow<TData extends RowData = RowData> extends Row<TData> {
  override type: RowType = 'header';
  state: HeaderRowState = proxy({
    init: false,
  });

  override ref = (el: HTMLDivElement | null): void => {
    this.dom = el;
    if (!this.state.init) this.init();
  };

  override getElementAttributes = (): ElementAttributes => {
    return {
      role: 'row',
      'data-slot': 'header-row',
      'data-row-id': this.rowId,
      'aria-rowindex': this.rowIndex,
      className: 'zeta-grid__header-row',
    };
  };

  override init = (): void => {
    this.cells.forEach((cell) => cell.init());
    this.rect.width = this.cells.reduce((width, cell) => cell.rect.width + width, 0);
    this.rect.height = this.cells.reduce((height, cell) => Math.max(height, cell.rect.height), 0);
    this.state.init = true;
  };
}
