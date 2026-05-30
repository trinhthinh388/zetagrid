import { ZetaGridInstance } from './grid';

export type ZetaElementAttributes = {
  [key: string]: string | undefined | Record<string, string | number>;
  className: string;
  'data-slot': string;
  role: string;
  style?: Record<string, string | number>;
};

export interface IGridModule<TContext = unknown> {
  _name: string;
  init?: (grid: ZetaGridInstance) => void;
  destroy?: (grid: ZetaGridInstance) => void;
  register?: (grid: ZetaGridInstance) => void;
  modifyElementAttributes?: (params: {
    slot: string;
    context?: TContext;
    attributes: ZetaElementAttributes;
  }) => ZetaElementAttributes;
}
