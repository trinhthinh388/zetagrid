import { Grid, RowData } from '@core';
import { HeaderRow } from './header-row';

export const Header = <TData extends RowData = RowData>({ grid }: { grid: Grid<TData> }) => {
  const header = grid.getHeader();

  return (
    <div {...header.getElementAttributes('header')}>
      <div {...header.getElementAttributes('headerContainer')}>
        {header.getHeaderRows().map((row) => (
          <HeaderRow id={row.rowId} key={row.rowId} />
        ))}
      </div>
    </div>
  );
};
