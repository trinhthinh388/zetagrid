import { GridContext } from './context';
import { RowData } from './data';
import { GridModule } from './module';

export type GridRect = {
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

export type GridSrollState = {
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

export type GridElements = {
  root: HTMLDivElement | null;
  header: HTMLDivElement | null;
  body: HTMLDivElement | null;
};

export type GridState<TData extends RowData = RowData> = {
  rect: GridRect;
  scrollState: GridSrollState;
  /**
   * Flag to check if the grid is ready to render.
   */
  isReady: boolean;
  /**
   * Elements of the Grid
   */
  readonly elements: GridElements;
};

export type GridLifeCycle = 'init' | 'mount' | 'update' | 'unmount';

export interface GridApi<TData extends RowData = RowData> {
  /**
   * Initialize all registered modules.
   */
  init: (root?: HTMLDivElement) => void;
  /**
   * Runs when grid is mounted
   */
  mount: () => void;
  /**
   * Unomunt the grid instance and clean up modules and listeners.
   */
  unmount: () => void;
  /**
   *
   * Get the total scroll width of the Grid
   */
  getTotalWidth: () => number;
  /**
   * Get the total scroll height of the Grid
   */
  getTotalHeight: () => number;
}

export interface GridInstance<TData extends RowData = RowData> {
  /**
   * Grid's context
   */
  context: GridContext<TData>;
  /**
   * Grid's state
   */
  state: GridState<TData>;
  /**
   * Grid's APIs
   */
  api: GridApi<TData>;
  /**
   * Register ZetaGrid's modules to extends the functionality.
   */
  use: (...modules: GridModule<TData>[]) => GridInstance<TData>;
}
