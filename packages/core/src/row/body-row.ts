import { RenderResult } from '../common';
import { RowData } from '../types';
import { Row } from './row';
import { RowType } from './types';

export class BodyRow<TData extends RowData = RowData> extends Row<TData> {
  override type: RowType = 'body';

  override render = (): RenderResult[] => [
    {
      children: [],
      attributes: {
        role: 'row',
        'data-slot': 'body-row',
        'data-row-id': this.rowId,
        'aria-rowindex': this.rowIndex,
        className: 'zeta-grid__body-row',
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
