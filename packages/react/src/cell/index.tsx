import { RowData } from '@core';
import { Renderer } from '../common/renderer';
import { useCell, useWatch } from '../hooks';

export type CellProps<TData extends RowData = RowData> = {
  id: string;
};

export const Cell = <TData extends RowData = RowData>({ id }: CellProps<TData>) => {
  const cell = useCell({ id });

  useWatch(cell.getRect());

  return <Renderer render={cell.render()}>{cell.renderCell()}</Renderer>;
};
