import { IGridModule } from './module';
import { GridRenderResult } from './renderer';

export type ZetaGridInstance = {
  /**
   * Render ZetaGrid to the provided root element.
   */
  render: (element: HTMLElement) => GridRenderResult;
  /**
   * Register ZetaGrid's modules to extends the functionality.
   */
  use: (...modules: IGridModule[]) => ZetaGridInstance;
};

export type ZetaGridLifeCycle = 'init' | 'mount' | 'update' | 'unmount';
