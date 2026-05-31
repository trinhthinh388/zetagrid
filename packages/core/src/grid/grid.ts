import {
  ColumnDefinition,
  GridModule,
  RowData,
  ZetaGridElements,
  ZetaGridInstance,
  ZetaGridState,
} from '@models';
import { proxy, ref } from 'valtio';
import { DATA_SLOTS, DEFAULT_GRID_SIZE } from '../constants';
import { createContext } from '../context/context';
import { createLifeCyclePipe, createLogger } from '../utils';
import { buildColumnHeader } from '../utils/build-column-header';
import { getMaxColumnsDepth } from '../utils/get-max-columns-depth';

export type CreateZetaGridParams<TData extends RowData> = {
  columnDefs: ColumnDefinition<TData>[];
  modules?: GridModule<TData>[];
  data: TData[];
};

export const createGrid = <TData extends RowData = RowData>({
  columnDefs,
  modules = [],
}: CreateZetaGridParams<TData>): ZetaGridInstance<TData> => {
  const logger = createLogger('Grid');
  const pipes = createLifeCyclePipe<TData>();
  const ctx = createContext<TData>({
    columnDefs,
  });

  const state = proxy<ZetaGridState<TData>>({
    isReady: false,
    rect: {
      containerWidth: DEFAULT_GRID_SIZE,
      containerHeight: DEFAULT_GRID_SIZE,
      headerHeight: 0,
      headerWidth: 0,
      bodyHeight: 0,
      bodyWidth: 0,
    },
    scrollState: {
      thumb: {
        horizontal: {
          size: 0,
          offset: 0,
        },
        vertical: {
          size: 0,
          offset: 0,
        },
      },
    },
    elements: ref<ZetaGridElements>({ root: null, header: null, body: null }),
  });

  const use: ZetaGridInstance<TData>['use'] = (...modules) => {
    for (const module of modules) {
      const instance = module();
      ctx.modules.push(instance);
      if (instance.init) pipes.register('init', instance.init);
      if (instance.mount) pipes.register('mount', instance.mount);
      if (instance.update) pipes.register('update', instance.update);
      if (instance.unmount) pipes.register('unmount', instance.unmount);
    }
    return instance;
  };

  // #region Internals helpers
  const getGridElements = (root: HTMLDivElement) => ({
    header: root.querySelector(`[data-slot="${DATA_SLOTS.HEADER}"]`) as HTMLDivElement,
    body: root.querySelector(`[data-slot="${DATA_SLOTS.BODY}"]`) as HTMLDivElement,
  });
  // #endregion

  // #region APIs
  const getHeaders: ZetaGridInstance<TData>['getHeaders'] = () => {
    const { columnDefs } = ctx;
    const maxDepth = getMaxColumnsDepth<TData>(columnDefs);
    const headers = columnDefs.map((columnDef) =>
      buildColumnHeader({ columnDef, currentDepth: 0, maxDepth }),
    );
    return headers;
  };

  const getTotalWidth: ZetaGridInstance<TData>['getTotalWidth'] = () =>
    Math.max(state.rect.bodyWidth, state.rect.headerWidth, state.rect.containerWidth);

  const getTotalHeight: ZetaGridInstance<TData>['getTotalHeight'] = () =>
    Math.max(state.rect.bodyHeight + state.rect.headerHeight, state.rect.containerHeight);
  // #endregion

  // #region Life cycle
  const init: ZetaGridInstance<TData>['init'] = (root) => {
    if (root) {
      const { header, body } = getGridElements(root);
      if (!header || !body) {
        // TODO: Create ZetaGridError
        throw new Error('Header or body element not found');
      }
      state.elements.root = root;
      state.elements.header = header;
      state.elements.body = body;
    }
    logger.info('Init pipes - Starting');
    pipes.run('init', instance);
    logger.info('Init pipes - Successfully');
  };

  const mount: ZetaGridInstance<TData>['mount'] = () => {
    logger.info('Mount pipes - Starting');
    pipes.run('mount', instance);
    logger.info('Mount pipes - Successfully');
    state.isReady = true;
  };

  const unmount: ZetaGridInstance<TData>['unmount'] = () => {
    logger.info('Unmount pipes - Starting');
    pipes.run('unmount', instance);
    logger.info('Unmount pipes - Successfully');
  };
  // #endregion

  const instance: ZetaGridInstance<TData> = {
    use,
    init,
    state,
    mount,
    unmount,
    getHeaders,
    context: ctx,
    getTotalWidth,
    getTotalHeight,
  };

  instance.use(...modules);

  return instance;
};
