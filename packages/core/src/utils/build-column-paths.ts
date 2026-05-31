import { ColumnDefinition, RowData } from '@models';

export type BuildColumnsPathsParams<TData extends RowData> = {
  maxDepth: number;
  columnDefs: ColumnDefinition<TData>[];
  currentDepth?: number;
};

export type ColumnPathNode<TData extends RowData> = {
  column: ColumnDefinition<TData>;
  /**
   * Placeholder node
   * This is used for rendering empty space when the columns are not balanced.
   */
  isPlaceholder: boolean;
};

export const buildColumnsPaths = <TData extends RowData>({
  columnDefs,
  maxDepth,
  currentDepth = 0,
}: BuildColumnsPathsParams<TData>): ColumnPathNode<TData>[][] => {
  const paths: ColumnPathNode<TData>[][] = [];

  for (const def of columnDefs) {
    if (def.children && def.children.length > 0) {
      const childPaths = buildColumnsPaths({
        maxDepth,
        columnDefs: def.children,
        currentDepth: currentDepth + 1,
      });
      for (const childPath of childPaths) {
        paths.push([{ column: def, isPlaceholder: false }, ...childPath]);
      }
    } else {
      const path: ColumnPathNode<TData>[] = [{ column: def, isPlaceholder: false }];
      for (let d = currentDepth + 1; d < maxDepth; d++) {
        path.push({ column: def, isPlaceholder: true });
      }
      paths.push(path);
    }
  }

  return paths;
};
