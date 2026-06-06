import { RowData } from '@core';
import { VirtualizationPlugin } from '@core/plugins/virtualization';
import { useSnapshot } from 'valtio';
import { useGrid } from '../grid/grid-context';
import { usePlugin } from '../hooks';
import { HeaderRow } from './header-row';

export const Header = <TData extends RowData = RowData>() => {
  const grid = useGrid();
  const header = grid.getHeader();
  const plugin = usePlugin<TData, typeof VirtualizationPlugin<TData>>(VirtualizationPlugin);
  const { init } = useSnapshot(header.state);

  return (
    <div ref={header.ref} {...header.getElementAttributes('header')}>
      {!!init && (
        <div ref={plugin.register} {...header.getElementAttributes('headerContainer')}>
          {header.getHeaderRows().map((row) => (
            <HeaderRow id={row.rowId} key={row.rowId} />
          ))}
        </div>
      )}
    </div>
  );
};
