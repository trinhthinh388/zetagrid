import { VirtualizedModule } from '@core/modules/virtualized';
import { Grid as ZetaGrid } from '@react';
import { columnDefs } from './columns';

export const Grid = () => {
  return (
    <div className="w-[1024px] h-[768px] mx-auto">
      <ZetaGrid columnDefs={columnDefs} modules={[VirtualizedModule]} />
    </div>
  );
};
