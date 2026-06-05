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

  override init(): void {
    this.state.init = true;
  }

  override ref(el: HTMLDivElement | null): void {
    this.dom = el;
    if (!this.state.init) this.init();
  }

  override getElementAttributes(): ElementAttributes {
    return {
      role: 'presentation',
      'data-slot': 'header-row',
      'data-row-id': this.rowId,
      className: 'zeta-grid__header-row',
    };
  }
}
