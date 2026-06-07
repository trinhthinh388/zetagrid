import { RenderResult } from '../common';
import { RowData } from '../types';
import { Row } from './row';
import { RowType } from './types';

export class HeaderRow<TData extends RowData = RowData> extends Row<TData> {
  override type: RowType = 'header';

  override render = (): RenderResult[] => [
    {
      children: [],
      attributes: {
        role: 'row',
        'data-slot': 'header-row',
        'data-row-id': this.rowId,
        'aria-rowindex': this.rowIndex,
        className: 'zeta-grid__header-row',
        style: {
          top: this.rect.get('top'),
          left: this.rect.get('left'),
          width: this.rect.get('width'),
          height: this.rect.get('height'),
        },
      },
    },
  ];
}
