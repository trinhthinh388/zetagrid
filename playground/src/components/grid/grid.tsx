import { VirtualizedModule } from '@core/modules/virtualized';
import { Grid as ZetaGrid } from '@react';
import { columnDefs } from './columns';

export const Grid = () => {
  return <ZetaGrid columnDefs={columnDefs} modules={[VirtualizedModule]} />;
};
