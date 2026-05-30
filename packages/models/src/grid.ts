import { ZetaGridContext } from './context';
import { HeaderGroup } from './header';
import { IGridModule } from './module';

export type ZetaGridInstance<TData = unknown> = {
  /**
   * Register ZetaGrid's modules to extends the functionality.
   */
  use: (...modules: IGridModule<TData>[]) => ZetaGridInstance<TData>;
  /**
   * Initialize all registered modules.
   */
  init: () => void;
  /**
   * Unomunt the grid instance and clean up modules and listeners.
   */
  unmount: () => void;
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
   * Update the grid context. Using this to update root, width, height ...
   */
  setContext: (partialContext: Partial<ZetaGridContext<TData>>) => void;
  /**
   * Grid's context
   */
  context: ZetaGridContext<TData>;
  /**
   * Flag to check if the grid is ready to render.
   */
  isReady: boolean;
};

export type ZetaGridLifeCycle = 'init' | 'mount' | 'update' | 'unmount';
