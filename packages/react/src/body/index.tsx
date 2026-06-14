import { RowData } from '@core';
import { Renderer } from '../common/renderer';
import { useBody, useWatch } from '../hooks';

export const Body = <TData extends RowData = RowData>() => {
  const body = useBody();
  const { init } = useWatch(body.getState());

  return <Renderer render={body.render()}></Renderer>;
};
