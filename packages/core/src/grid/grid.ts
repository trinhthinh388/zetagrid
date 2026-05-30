import { ColumnDefinition, Header, HeaderGroup, ZetaGridContext, ZetaGridInstance } from '@models';
import { createContext } from '../context/context';
import { idGenerator } from '../utils';
import { buildColumnsPaths } from '../utils/build-column-paths';
import { getMaxColumnsDepth } from '../utils/get-max-columns-depth';

export type CreateZetaGridParams<TData> = {
  columnDefs: ColumnDefinition<TData>[];
} & Partial<Pick<ZetaGridContext<TData>, 'width' | 'height'>>;

export const createGrid = <TData = unknown>({
  width,
  height,
  columnDefs,
}: CreateZetaGridParams<TData>): ZetaGridInstance => {
  const ctx = createContext({
    width,
    height,
    columnDefs,
  });

  const getHeaderGroups: ZetaGridInstance['getHeaderGroups'] = () => {
    const { columnDefs } = ctx;

    const maxDepth = getMaxColumnsDepth<TData>(columnDefs);
    if (maxDepth === 0) return [];

    const paths = buildColumnsPaths({ columnDefs, maxDepth, currentDepth: 0 });
    const groups: HeaderGroup[] = [];

    for (let d = 0; d < maxDepth; d++) {
      const levelNodes = paths.map((path) => path[d]);
      const headers: Header[] = [];

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

        const headerId = node.isPlaceholder ? idGenerator.placeholder() : idGenerator.header();

        headers.push({
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

  const instance: ZetaGridInstance = {
    getHeaderGroups,
    use: (module) => {
      ctx.modules.push(module);
      return instance;
    },
  };

  return instance;
};
