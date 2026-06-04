import { ColumnDefinition, GridApi, GridElements, GridInstance, GridState, RowData } from '@models';
import { proxy, ref } from 'valtio';
import { DATA_SLOTS, DEFAULT_GRID_SIZE } from '../constants';
import { createContext } from '../context/context';
import { createLifeCyclePipe, createLogger } from '../utils';

export type CreateZetaGridParams<TData extends RowData> = {
  columnDefs: ColumnDefinition<TData>[];
  data: TData[];
};

export const createGrid = <TData extends RowData = RowData>({
  columnDefs,
}: CreateZetaGridParams<TData>): GridInstance<TData> => {
  const logger = createLogger('Grid');
  const pipes = createLifeCyclePipe<TData>();
  const context = createContext<TData>({
    columnDefs,
  });

  const state = proxy<GridState<TData>>({
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
    elements: ref<GridElements>({ root: null, header: null, body: null }),
  });

  // #region Internals helpers
  const getGridElements = (root: HTMLDivElement) => ({
    header: root.querySelector(`[data-slot="${DATA_SLOTS.HEADER}"]`) as HTMLDivElement,
    body: root.querySelector(`[data-slot="${DATA_SLOTS.BODY}"]`) as HTMLDivElement,
  });
  // #endregion

  // #region APIs
  const getTotalWidth: GridApi<TData>['getTotalWidth'] = () =>
    Math.max(state.rect.bodyWidth, state.rect.headerWidth, state.rect.containerWidth);

  const getTotalHeight: GridApi<TData>['getTotalHeight'] = () =>
    Math.max(state.rect.bodyHeight + state.rect.headerHeight, state.rect.containerHeight);
  const use: GridInstance<TData>['use'] = (...modules) => {
    for (const module of modules) {
      const instance = module();
      context.modules.push(instance);
    }
    return instance;
  };
  const init: GridApi<TData>['init'] = (root) => {
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

  const mount: GridApi<TData>['mount'] = () => {
    logger.info('Mount pipes - Starting');
    pipes.run('mount', instance);
    logger.info('Mount pipes - Successfully');
    state.isReady = true;
  };

  const unmount: GridApi<TData>['unmount'] = () => {
    logger.info('Unmount pipes - Starting');
    pipes.run('unmount', instance);
    logger.info('Unmount pipes - Successfully');
  };
  // #endregion

  const instance: GridInstance<TData> = {
    use,
    context,
    state,
    api: {
      init,
      mount,
      unmount,
      getTotalHeight,
      getTotalWidth,
    } as unknown as GridApi<TData>,
  };

  return instance;
};
