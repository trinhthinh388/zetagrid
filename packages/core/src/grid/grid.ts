import {
  ColumnDefinition,
  Header,
  HeaderGroup,
  IGridModule,
  ZetaElementAttributes,
  ZetaGridContext,
  ZetaGridInstance,
} from '@models';
import { createContext } from '../context/context';
import { idGenerator } from '../utils';
import { buildColumnsPaths } from '../utils/build-column-paths';
import { getMaxColumnsDepth } from '../utils/get-max-columns-depth';

const DEFAULT_HEADER_ROW_HEIGHT = 40;

export type CreateZetaGridParams<TData> = {
  columnDefs: ColumnDefinition<TData>[];
  modules?: IGridModule<TData>[];
} & Partial<Pick<ZetaGridContext<TData>, 'width' | 'height'>>;

export const createGrid = <TData = unknown>({
  width,
  height,
  columnDefs,
  modules = [],
}: CreateZetaGridParams<TData>): ZetaGridInstance<TData> => {
  let totalHeaderHeight = 0;

  const ctx = createContext<TData>({
    width,
    height,
    modules,
    columnDefs,
  });

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

  const getTotalHeaderHeight: ZetaGridInstance<TData>['getTotalHeaderHeight'] = () =>
    totalHeaderHeight;

  const applyElementAttributes: ZetaGridInstance<TData>['applyElementAttributes'] = (
    slot,
    attributes,
  ) => {
    let result: ZetaElementAttributes = { ...attributes };
    for (const module of ctx.modules) {
      if (module.modifyElementAttributes) {
        result = module.modifyElementAttributes({ slot, context: ctx, attributes });
      }
    }
    return result;
  };

  const init = () => {
    for (const module of ctx.modules) {
      if (module.init) {
        module.init(instance);
      }
    }
  };

  const destroy = () => {
    for (const module of ctx.modules) {
      if (module.destroy) {
        module.destroy(instance);
      }
    }
  };

  const instance: ZetaGridInstance<TData> = {
    init,
    destroy,
    getHeaderGroups,
    width: ctx.width,
    height: ctx.height,
    getTotalHeaderHeight,
    applyElementAttributes,
    use: (...newModules) => {
      newModules.forEach((module) => {
        ctx.modules.push(module);
        if (module.register) {
          module.register(instance);
        }
      });
      return instance;
    },
  };

  if (modules && modules.length > 0) {
    instance.use(...modules);
  }

  return instance;
};
