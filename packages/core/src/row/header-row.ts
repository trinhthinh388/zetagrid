import { RowData } from '../types';
import { Row } from './row';
import { RowType } from './types';

export class HeaderRow<TData extends RowData = RowData> extends Row<TData> {
  override type: RowType = 'header';
}
