import { ELEMENT_CLASSES } from '../constants';
import { RowData } from '../types';
import { Row } from './row';
import { RowType } from './types';

export class HeaderRow<TData extends RowData = RowData> extends Row<TData> {
  override type: RowType = 'header';

  override render = (): HTMLDivElement => {
    this.dom.setAttribute('data-slot', 'header-row');
    this.dom.setAttribute('data-row-id', this.rowId);
    this.dom.setAttribute('aria-rowindex', this.rowIndex.toString());
    this.dom.classList.add(ELEMENT_CLASSES.headerRow());

    return this.dom;
  };
}
