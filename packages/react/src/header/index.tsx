import { RowData } from '@core';
import { VirtualizationPlugin } from '@core/plugins/virtualization';
import { Renderer } from '../common/renderer';
import { useHeader, usePlugin, useWatch } from '../hooks';
import { HeaderRow } from './header-row';

export const Header = <TData extends RowData = RowData>() => {
  const header = useHeader();
  const { init } = useWatch(header.getState());
  const plugin = usePlugin<TData, typeof VirtualizationPlugin<TData>>(VirtualizationPlugin);

  return (
    <Renderer render={header.render()}>
      {!!init &&
        header.getHeaderRows().map((row) => <HeaderRow key={row.getRowId()} id={row.getRowId()} />)}
    </Renderer>
  );
};
