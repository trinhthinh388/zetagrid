import { RowData } from './data';
import { ZetaGridInstance } from './grid';

export type ZetaElementAttributes = {
  [key: string]: string | undefined | Record<string, string | number>;
  className: string;
  'data-slot': string;
  role: string;
  style?: Record<string, string | number>;
};

export interface IGridModule<TData extends RowData = RowData> {
  _name: string;
  init?: (grid: ZetaGridInstance<TData>) => void;
  unmount?: (grid: ZetaGridInstance<TData>) => void;
  mount?: (grid: ZetaGridInstance<TData>) => void;
  update?: (grid: ZetaGridInstance<TData>) => void;
}

export type GridModule<TData extends RowData = RowData> = () => IGridModule<TData>;
