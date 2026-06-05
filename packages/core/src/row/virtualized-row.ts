import { RowData } from '../types';
import { Row } from './row';

export class VirtualizedRow<TData extends RowData = RowData> extends Row<TData> {}
