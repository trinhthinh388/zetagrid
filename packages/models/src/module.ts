import { ZetaGridInstance } from './grid';

export interface IGridModule {
  init: () => void;
  destroy: () => void;
  register: (api: ZetaGridInstance) => void;
}
