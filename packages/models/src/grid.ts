import { ZetaGridContext } from './context';
import { Header } from './header';
import { IGridModule } from './module';

export type ZetaGridState<TData = unknown> = {
  /**
   * Flag to check if the grid is ready to render.
   */
  isReady: boolean;
  /**
   * Rendered Grid's width - in `px`
   * @default 500
   */
  width: number;
  /**
   * Rendered Grid's height - in `px`
   * @default 500
   */
  height: number;
  /**
   * Total width of the Grid
   */
  totalHeaderWidth: number;
  /**
   * Total height of the Grid
   */
  totalHeaderHeight: number;
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
   * Runs when grid is mounted
   */
  mount: () => void;
  /**
   * Unomunt the grid instance and clean up modules and listeners.
   */
  unmount: () => void;
  /**
   * Get header groups.
   */
  getHeaders: () => Header[];
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
