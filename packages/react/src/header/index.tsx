import { RowData } from '@core';
import { useSnapshot } from 'valtio';
import { useGrid } from '../grid/grid-context';
import { HeaderRow } from './header-row';

export const Header = <TData extends RowData = RowData>() => {
  const grid = useGrid();
  const header = grid.getHeader();
  const { init } = useSnapshot(header.state);

  return (
    <div ref={header.ref} {...header.getElementAttributes('header')}>
      {!!init && (
        <div {...header.getElementAttributes('headerContainer')}>
          {header.getHeaderRows().map((row) => (
            <HeaderRow id={row.rowId} key={row.rowId} />
          ))}
        </div>
      )}
    </div>
  );
};
