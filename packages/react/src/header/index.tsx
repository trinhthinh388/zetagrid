import { RowData } from '@core';
import { VirtualizationPlugin } from '@core/plugins/virtualization';
import { useHeader, usePlugin, useWatch } from '../hooks';

export const Header = <TData extends RowData = RowData>() => {
  const header = useHeader();
  const { init } = useWatch(header.getState());
  const plugin = usePlugin<TData, typeof VirtualizationPlugin<TData>>(VirtualizationPlugin);

  return (
    <div>
      {/* {!!init && (
        <div ref={plugin.register} {...header.getElementAttributes('headerContainer')}>
          {header.getHeaderRows().map((row) => (
            <HeaderRow id={row.rowId} key={row.rowId} />
          ))}
        </div>
      )} */}
    </div>
  );
};
