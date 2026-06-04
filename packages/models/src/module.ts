import { RowData } from './data';
import { GridInstance } from './grid';

export type ElementAttributes = {
  [key: string]: string | undefined | Record<string, string | number>;
  className: string;
  'data-slot': string;
  role: string;
  style?: Record<string, string | number>;
};

export interface IGridModule<TData extends RowData = RowData> {
  _name: string;
  init?: (grid: GridInstance<TData>) => void;
  unmount?: (grid: GridInstance<TData>) => void;
  mount?: (grid: GridInstance<TData>) => void;
  update?: (grid: GridInstance<TData>) => void;
}

export type GridModule<TData extends RowData = RowData> = () => IGridModule<TData>;
