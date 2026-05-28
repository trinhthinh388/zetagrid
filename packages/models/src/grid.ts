import { IGridModule } from './module';

export type ZetaGridInstance = {
  /**
   * Render ZetaGrid to the provided root element.
   */
  render: (element: HTMLElement) => void;
  /**
   * Register ZetaGrid's modules to extends the functionality.
   */
  use: (...modules: IGridModule[]) => ZetaGridInstance;
};

export type ZetaGridLifeCycle = 'init' | 'mount' | 'update' | 'unmount';
