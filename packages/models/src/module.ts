import { ZetaGridContext } from './context';
import { ZetaGridInstance } from './grid';

export type ZetaElementAttributes = {
  [key: string]: string | undefined | Record<string, string | number>;
  className: string;
  'data-slot': string;
  role: string;
  style?: Record<string, string | number>;
};

export interface IGridModule<TData = unknown> {
  _name: string;
  init?: (grid: ZetaGridInstance<TData>) => void;
  destroy?: (grid: ZetaGridInstance<TData>) => void;
  register?: (grid: ZetaGridInstance<TData>) => void;
  modifyElementAttributes?: (params: {
    slot: string;
    context: ZetaGridContext<TData>;
    attributes: ZetaElementAttributes;
  }) => ZetaElementAttributes;
}
