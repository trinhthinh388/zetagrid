import { proxy } from 'valtio';
import { ElementAttributes, RowData } from '../types';
import { Row } from './row';
import { RowState, RowType } from './types';

type HeaderRowState = {} & RowState;

export class HeaderRow<TData extends RowData = RowData> extends Row<TData> {
  override type: RowType = 'header';
  override state: HeaderRowState = proxy({
    init: false,
  });

  override getElementAttributes = (): ElementAttributes => {
    return {
      role: 'row',
      'data-slot': 'header-row',
      'data-row-id': this.rowId,
      'aria-rowindex': this.rowIndex,
      className: 'zeta-grid__header-row',
    };
  };
}
