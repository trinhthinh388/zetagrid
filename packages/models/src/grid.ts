export type ZetaGridInstance = {
  /**
   * Render ZetaGrid to the provided root element.
   */
  render: (element: HTMLElement) => void;
};

export type ZetaGridLifeCycle = 'init' | 'mount' | 'update' | 'unmount';
