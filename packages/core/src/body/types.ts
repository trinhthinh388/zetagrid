import { RowData } from '../types';

export interface IBody<TData extends RowData = RowData> {}

export type BodyState = {
  init: boolean;
};
