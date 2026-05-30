import {
  ColumnDefinition,
  Header,
  HeaderGroup,
  IGridModule,
  ZetaGridInstance,
  ZetaGridState,
} from '@models';
import { proxy, ref } from 'valtio';
import { DEFAULT_GRID_SIZE, DEFAULT_HEADER_ROW_HEIGHT } from '../constants';
import { createContext } from '../context/context';
import { createLifeCyclePipe, createLogger, idGenerator } from '../utils';
import { buildColumnsPaths } from '../utils/build-column-paths';
import { getMaxColumnsDepth } from '../utils/get-max-columns-depth';

export type CreateZetaGridParams<TData> = {
  columnDefs: ColumnDefinition<TData>[];
  modules?: IGridModule<TData>[];
};

export const createGrid = <TData = unknown>({
  columnDefs,
  modules = [],
}: CreateZetaGridParams<TData>): ZetaGridInstance<TData> => {
  let totalHeaderHeight = 0;

  const logger = createLogger('Grid');
  const pipes = createLifeCyclePipe<TData>();
  const ctx = createContext<TData>({
    columnDefs,
  });

  const state = proxy<ZetaGridState<TData>>({
    isReady: false,
    root: ref<ZetaGridState['root']>({ element: null }),
    width: DEFAULT_GRID_SIZE,
    height: DEFAULT_GRID_SIZE,
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

  const getHeaderGroups: ZetaGridInstance<TData>['getHeaderGroups'] = () => {
    const { columnDefs } = ctx;

    const maxDepth = getMaxColumnsDepth<TData>(columnDefs);
    totalHeaderHeight = maxDepth * DEFAULT_HEADER_ROW_HEIGHT;
    if (maxDepth === 0) return [];

    const paths = buildColumnsPaths({ columnDefs, maxDepth, currentDepth: 0 });

    // Pre-compute the left offset for each leaf column (path index).
    const leafLeftOffsets: number[] = [];
    let cumulativeLeft = 0;
    for (const path of paths) {
      leafLeftOffsets.push(cumulativeLeft);
      const leafNode = path[path.length - 1];
      cumulativeLeft += leafNode.column.width;
    }

    const groups: HeaderGroup[] = [];

    for (let d = 0; d < maxDepth; d++) {
      const levelNodes = paths.map((path) => path[d]);
      const headers: Header[] = [];
      const top = d * DEFAULT_HEADER_ROW_HEIGHT;

      let i = 0;
      while (i < levelNodes.length) {
        const node = levelNodes[i];
        let colSpan = 1;

        while (
          i + colSpan < levelNodes.length &&
          levelNodes[i + colSpan].column === node.column &&
          levelNodes[i + colSpan].isPlaceholder === node.isPlaceholder
        ) {
          colSpan++;
        }

        const column = node.column;
        const isLeaf = !column.children || column.children.length === 0;
        const rowSpan = !node.isPlaceholder && isLeaf ? maxDepth - d : 1;

        // Calculate exact width by summing the leaf column widths this cell spans.
        let cellWidth = 0;
        for (let j = i; j < i + colSpan; j++) {
          const leafNode = paths[j][paths[j].length - 1];
          cellWidth += leafNode.column.width;
        }

        // Calculate exact height from rowSpan.
        const cellHeight = rowSpan * DEFAULT_HEADER_ROW_HEIGHT;

        // Left offset is the cumulative width of all leaf columns before this cell.
        const left = leafLeftOffsets[i];

        const headerId = node.isPlaceholder ? idGenerator.placeholder() : idGenerator.header();

        headers.push({
          width: cellWidth,
          height: cellHeight,
          left,
          top,
          isLeaf,
          colSpan,
          rowSpan,
          id: headerId,
          isPlaceholder: node.isPlaceholder,
          title: node.isPlaceholder ? '' : column.title,
          placeholderId: node.isPlaceholder ? column.id : undefined,
        });

        i += colSpan;
      }
      groups.push({
        id: idGenerator.headerGroup(),
        getHeaders: () => headers,
      });
    }

    return groups;
  };

  const setState: ZetaGridInstance<TData>['setState'] = (key, value) => {
    state[key] = value;
  };

  const getTotalHeaderHeight: ZetaGridInstance<TData>['getTotalHeaderHeight'] = () =>
    totalHeaderHeight;

  const init: ZetaGridInstance<TData>['init'] = (root) => {
    if (root) state.root.element = root;
    logger.info('Init pipes - Starting');
    pipes.run('init', instance);
    logger.info('Init pipes - Successfully');
    setState('isReady', true);
  };

  const unmount = () => {
    logger.info('Running Unmount pipes');
    pipes.run('unmount', instance);
  };

  const instance: ZetaGridInstance<TData> = {
    use,
    init,
    state,
    unmount,
    setState,
    context: ctx,
    getHeaderGroups,
    getTotalHeaderHeight,
  };

  instance.use(...modules);

  return instance;
};
