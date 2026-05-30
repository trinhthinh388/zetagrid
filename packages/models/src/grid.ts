import { ZetaGridContext } from './context';
import { HeaderGroup } from './header';
import { IGridModule } from './module';

export type ZetaGridState<TData = unknown> = {
  /**
   * Flag to check if the grid is ready to render.
   */
  isReady: boolean;
  /**
   * Grid's width - in `px`
   * @default 500
   */
  width: number;
  /**
   * Grid's height - in `px`
   * @default 500
   */
  height: number;
  /**
   * Root element of the Grid
   */
  readonly root: {
    element: HTMLElement | null;
  };
};

export type ZetaGridInstance<TData = unknown> = {
  /**
   * Register ZetaGrid's modules to extends the functionality.
   */
  use: (...modules: IGridModule<TData>[]) => ZetaGridInstance<TData>;
  /**
   * Initialize all registered modules.
   */
  init: (root?: HTMLElement) => void;
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
   * Update the grid context.
   */
  setState: <K extends keyof ZetaGridState<TData>>(
    key: K,
    state: ZetaGridState<TData>[K] | ((old: ZetaGridState<TData>[K]) => void),
  ) => void;
  /**
   * Grid's context
   */
  context: ZetaGridContext<TData>;
  state: ZetaGridState<TData>;
};

export type ZetaGridLifeCycle = 'init' | 'mount' | 'update' | 'unmount';
