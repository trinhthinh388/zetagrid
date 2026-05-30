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
  /**
   * Returns the total height of the header section in pixels,
   * calculated as `headerRowHeight * numberOfHeaderRows`.
   */
  getTotalHeaderHeight: () => number;
  /**
   * Rendered width
   */
  width: number;
  /**
   * Rendered height
   */
  height: number;
};

export type ZetaGridLifeCycle = 'init' | 'mount' | 'update' | 'unmount';
