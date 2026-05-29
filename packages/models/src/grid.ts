import { HeaderGroup } from './header';
import { IGridModule } from './module';

export type ZetaGridInstance = {
  /**
   * Register ZetaGrid's modules to extends the functionality.
   */
  use: (...modules: IGridModule[]) => ZetaGridInstance;
  /**
   * Get header groups.
   */
  getHeaderGroups: () => HeaderGroup[];
};

export type ZetaGridLifeCycle = 'init' | 'mount' | 'update' | 'unmount';
