import { ColumnDefinition, Header, RowData } from '@models';
import { DEFAULT_CELL_HEIGHT, DEFAULT_CELL_WIDTH } from '../constants';

export const buildColumnHeader = <TData extends RowData>({
  columnDef,
  currentDepth,
  maxDepth,
}: {
  columnDef: ColumnDefinition<TData>;
  currentDepth: number;
  maxDepth: number;
}): Header => {
  const hasChildren = !!columnDef.children?.length;
  const isGroup = hasChildren && currentDepth !== maxDepth;

  const children =
    columnDef.children?.map((childDef) =>
      buildColumnHeader({ columnDef: childDef, currentDepth: currentDepth + 1, maxDepth }),
    ) ?? [];
  const width = isGroup
    ? children.reduce((sum, child) => sum + child.width, 0)
    : (columnDef.width ?? DEFAULT_CELL_WIDTH);
  const height = DEFAULT_CELL_HEIGHT * (maxDepth - currentDepth);

  return {
    width,
    height,
    isGroup,
    children,
    id: columnDef.id,
    title: columnDef.title,
  };
};
