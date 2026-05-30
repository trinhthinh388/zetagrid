import {
  ColumnDefinition,
  Header,
  HeaderGroup,
  IGridModule,
  ZetaGridContext,
  ZetaGridInstance,
} from '@models';
import { createContext } from '../context/context';
import { createLifeCyclePipe, createLogger, idGenerator } from '../utils';
import { buildColumnsPaths } from '../utils/build-column-paths';
import { getMaxColumnsDepth } from '../utils/get-max-columns-depth';

const DEFAULT_HEADER_ROW_HEIGHT = 40;

export type CreateZetaGridParams<TData> = {
  columnDefs: ColumnDefinition<TData>[];
  modules?: IGridModule<TData>[];
} & Partial<Pick<ZetaGridContext<TData>, 'width' | 'height' | 'root'>>;

export const createGrid = <TData = unknown>({
  root,
  width,
  height,
  columnDefs,
  modules = [],
}: CreateZetaGridParams<TData>): ZetaGridInstance<TData> => {
  let isReady = false;
  let totalHeaderHeight = 0;

  const logger = createLogger('Grid');
  const pipes = createLifeCyclePipe<TData>();
  const ctx = createContext<TData>({
    root,
    width,
    height,
    columnDefs,
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

  const setContext: ZetaGridInstance<TData>['setContext'] = (partials) => {
    Object.assign(ctx, partials);
  };

  const getTotalHeaderHeight: ZetaGridInstance<TData>['getTotalHeaderHeight'] = () =>
    totalHeaderHeight;

  const init = () => {
    logger.info('Running Init pipes');
    pipes.run('init', instance);
    isReady = true;
  };

  const unmount = () => {
    logger.info('Running Unmount pipes');
    pipes.run('unmount', instance);
  };

  const instance: ZetaGridInstance<TData> = {
    use,
    init,
    unmount,
    isReady,
    setContext,
    context: ctx,
    getHeaderGroups,
    getTotalHeaderHeight,
  };

  instance.use(...modules);

  return instance;
};
