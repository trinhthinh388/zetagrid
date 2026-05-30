import { HeaderGroup } from './header';
import { IGridModule, ZetaElementAttributes } from './module';

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
   * Destroy the grid instance and clean up modules and listeners.
   */
  destroy: () => void;
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

  /** Attribute Hook Application */
  applyElementAttributes: (
    slot: string,
    attributes: ZetaElementAttributes,
  ) => ZetaElementAttributes;
};

export type ZetaGridLifeCycle = 'init' | 'mount' | 'update' | 'unmount';
