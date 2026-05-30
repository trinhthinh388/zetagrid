import { ColumnDefinition, IGridModule, ZetaGridInstance, ZetaGridState } from '@models';
import { proxy, ref } from 'valtio';
import { DEFAULT_GRID_SIZE } from '../constants';
import { createContext } from '../context/context';
import { createLifeCyclePipe, createLogger } from '../utils';
import { buildColumnHeader } from '../utils/build-column-header';
import { getMaxColumnsDepth } from '../utils/get-max-columns-depth';

export type CreateZetaGridParams<TData> = {
  columnDefs: ColumnDefinition<TData>[];
  modules?: IGridModule<TData>[];
};

export const createGrid = <TData = unknown>({
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
    totalHeaderWidth: 0,
    totalHeaderHeight: 0,
    width: DEFAULT_GRID_SIZE,
    height: DEFAULT_GRID_SIZE,
    root: ref<ZetaGridState['root']>({ element: null }),
  });

  const use: ZetaGridInstance<TData>['use'] = (...modules) => {
    for (const module of modules) {
      if (module.init) pipes.register('init', module.init);
      if (module.mount) pipes.register('mount', module.mount);
      if (module.update) pipes.register('update', module.update);
      if (module.unmount) pipes.register('unmount', module.unmount);
      ctx.modules.push(module);
    }
    return instance;
  };

  const getHeaders: ZetaGridInstance<TData>['getHeaders'] = () => {
    const { columnDefs } = ctx;
    const maxDepth = getMaxColumnsDepth<TData>(columnDefs);
    const headers = columnDefs.map((columnDef) =>
      buildColumnHeader({ columnDef, currentDepth: 0, maxDepth }),
    );
    return headers;
  };

  const setState: ZetaGridInstance<TData>['setState'] = (key, setter) => {
    if (typeof setter === 'function') {
      setter(state[key]);
    } else {
      state[key] = setter;
    }
  };

  const init: ZetaGridInstance<TData>['init'] = (root) => {
    if (root)
      setState('root', (state) => {
        state.element = root;
      });
    logger.info('Init pipes - Starting');
    pipes.run('init', instance);
    logger.info('Init pipes - Successfully');
  };

  const mount: ZetaGridInstance<TData>['mount'] = () => {
    logger.info('Mount pipes - Starting');
    pipes.run('mount', instance);
    logger.info('Mount pipes - Successfully');
    setState('isReady', true);
  };

  const unmount: ZetaGridInstance<TData>['unmount'] = () => {
    logger.info('Unmount pipes - Starting');
    pipes.run('unmount', instance);
    logger.info('Unmount pipes - Successfully');
  };

  const instance: ZetaGridInstance<TData> = {
    use,
    init,
    state,
    mount,
    unmount,
    setState,
    context: ctx,
    getHeaders,
  };

  instance.use(...modules);

  return instance;
};
