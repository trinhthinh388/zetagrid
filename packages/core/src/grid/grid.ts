import { ColumnDefinition, Header, HeaderGroup, ZetaGridContext, ZetaGridInstance } from '@models';
import { createContext } from '../context/context';
import { generateId } from '../utils';

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

    const getColumnDepth = (column: ColumnDefinition<TData>): number => {
      let depth = 0;
      let queue = [column];
      while (queue.length > 0) {
        depth++;
        const nextQueue: ColumnDefinition<TData>[] = [];
        for (const node of queue) {
          if (node.children && node.children.length > 0) {
            nextQueue.push(...node.children);
          }
        }
        queue = nextQueue;
      }
      return depth;
    };

    const maxDepth = columnDefs.length > 0 ? Math.max(...columnDefs.map(getColumnDepth)) : 0;
    if (maxDepth === 0) {
      return [];
    }

    // Helper to build paths
    function buildPathsForColumns(
      columns: ColumnDefinition<TData>[],
      maxDepth: number,
      currentDepth = 0,
    ): { column: ColumnDefinition<TData>; isPlaceholder: boolean }[][] {
      const paths: { column: ColumnDefinition<TData>; isPlaceholder: boolean }[][] = [];

      for (const col of columns) {
        if (col.children && col.children.length > 0) {
          const childPaths = buildPathsForColumns(col.children, maxDepth, currentDepth + 1);
          for (const childPath of childPaths) {
            paths.push([{ column: col, isPlaceholder: false }, ...childPath]);
          }
        } else {
          const path: { column: ColumnDefinition<TData>; isPlaceholder: boolean }[] = [
            { column: col, isPlaceholder: false },
          ];
          for (let d = currentDepth + 1; d < maxDepth; d++) {
            path.push({ column: col, isPlaceholder: true });
          }
          paths.push(path);
        }
      }

      return paths;
    }

    const paths = buildPathsForColumns(columnDefs, maxDepth, 0);
    console.log(paths);
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

        const headerId = node.isPlaceholder ? `${column.id}_placeholder_${d}` : column.id;

        headers.push({
          id: headerId,
          title: node.isPlaceholder ? '' : column.title,
          colSpan,
          rowSpan,
          isPlaceholder: node.isPlaceholder,
          placeholderId: node.isPlaceholder ? column.id : undefined,
        });

        i += colSpan;
      }

      groups.push({
        id: generateId('hg-'),
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
