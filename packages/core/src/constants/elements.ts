export const DATA_SLOTS = {
  BODY: 'body',
  ROOT: 'grid',
  HEADER: 'header',
  BODY_CONTAINER: 'body-container',
  SCROLLBAR_TRACK: 'scrollbar-track',
  SCROLLBAR_THUMB: 'scrollbar-thumb',
  HEADER_CONTAINER: 'header-container',
};

export const ELEMENT_CLASSES = {
  root: () => ELEMENT_CLASSES.prefix('root'),
  prefix: (part: string) => `zeta-grid__${part}`,
  header: () => ELEMENT_CLASSES.prefix('header'),
  wrapper: () => ELEMENT_CLASSES.prefix('wrapper'),
  headerRow: () => ELEMENT_CLASSES.prefix('header-row'),
  headerContainer: () => ELEMENT_CLASSES.prefix('header-container'),
};
