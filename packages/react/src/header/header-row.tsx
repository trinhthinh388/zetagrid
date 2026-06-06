import { RowData } from '@core';
import { VirtualizationPlugin } from '@core/plugins/virtualization';
import { useSnapshot } from 'valtio';
import { Cell } from '../cell';
import { useGrid } from '../grid/grid-context';
import { usePlugin } from '../hooks';

export type HeaderRowProps<TData extends RowData = RowData> = { id: string };

export const HeaderRow = <TData extends RowData = RowData>({ id }: HeaderRowProps<TData>) => {
  const grid = useGrid<TData>();
  const row = grid.getHeader().getHeaderRowById(id);
  const virtualization = usePlugin<TData, typeof VirtualizationPlugin<TData>>(VirtualizationPlugin);

  const { init } = useSnapshot(row.state);
  const { top, left, width, height } = useSnapshot(row.rect);

  // Subscribe to scroll changes so the component re-renders on scroll
  useSnapshot(virtualization.scroll);

  const visibleCells = row.cells.filter((cell) => virtualization.isCellVisible(cell));

  return (
    <div style={{ top, left, width, height }} ref={row.ref} {...row.getElementAttributes()}>
      {!!init &&
        visibleCells.map((cell) => (
          <Cell
            id={cell.id}
            type="header"
            key={cell.id}
            rowIndex={cell.rowIndex}
            colIndex={cell.colIndex}
          />
        ))}
    </div>
  );
};
