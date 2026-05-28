import { ZetaGridInstance } from './grid';

export interface IGridModule {
  _name: string;
  init: () => void;
  destroy: () => void;
  register: (api: ZetaGridInstance) => void;
}
