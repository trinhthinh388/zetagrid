import { ZetaGridContext } from './context';
import { Header } from './header';
import { GridModule } from './module';

export type ZetaGridRect = {
  /**
   * Rendered Grid's width - in `px`
   * @default 500
   */
  containerWidth: number;
  /**
   * Rendered Grid's height - in `px`
   * @default 500
   */
  containerHeight: number;
  /**
   * Total width of the header group
   */
  headerWidth: number;
  /**
   * Total height of the header group
   */
  headerHeight: number;
  /**
   * Total width of the body group
   */
  bodyWidth: number;
  /**
   * Total height of the body group
   */
  bodyHeight: number;
};

export type ZetaGridSrollState = {
  thumb: {
    horizontal: {
      size: number;
      offset: number;
    };
    vertical: {
      size: number;
      offset: number;
    };
  };
};

export type ZetaGridState<TData = unknown> = {
  rect: ZetaGridRect;
  scrollState: ZetaGridSrollState;
  /**
   * Flag to check if the grid is ready to render.
   */
  isReady: boolean;
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
  use: (...modules: GridModule<TData>[]) => ZetaGridInstance<TData>;
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
   * Grid's context
   */
  context: ZetaGridContext<TData>;
  state: ZetaGridState<TData>;
};

export type ZetaGridLifeCycle = 'init' | 'mount' | 'update' | 'unmount';
