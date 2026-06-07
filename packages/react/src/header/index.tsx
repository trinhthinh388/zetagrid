import { RowData } from '@core';
import { VirtualizationPlugin } from '@core/plugins/virtualization';
import { useLayoutEffect } from 'react';
import { Renderer } from '../common/renderer';
import { useHeader, usePlugin, useWatch } from '../hooks';
import { HeaderRow } from './header-row';

export const Header = <TData extends RowData = RowData>() => {
  const header = useHeader();
  const { init } = useWatch(header.getState());
  const virtualization = usePlugin<TData, typeof VirtualizationPlugin<TData>>(VirtualizationPlugin);

  useLayoutEffect(() => {
    const element = window.document.querySelector('.zeta-grid__header-container');
    if (!element) return;
    virtualization.register(element as HTMLDivElement);
  }, [virtualization]);

  useWatch(virtualization.scroll);

  return (
    <Renderer render={header.render()}>
      {!!init &&
        header.getHeaderRows().map((row) => <HeaderRow key={row.getRowId()} id={row.getRowId()} />)}
    </Renderer>
  );
};
