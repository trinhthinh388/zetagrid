import { ScrollModule } from '@core/modules/scroll';
import { SizeWatcherModule } from '@core/modules/size-watcher';
import { VirtualizedModule } from '@core/modules/virtualized';
import { Grid as ZetaGrid } from '@react';
import { columnDefs } from './columns';

export const Grid = () => {
  return (
    <div className="w-[800px] h-[500px] mx-auto">
      <ZetaGrid
        columnDefs={columnDefs}
        modules={[SizeWatcherModule, ScrollModule, VirtualizedModule]}
      />
    </div>
  );
};
