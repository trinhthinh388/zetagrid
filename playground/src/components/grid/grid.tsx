import { Grid as ZetaGrid } from '@react';
import { columnDefs } from './columns';

export const Grid = () => {
  return (
    <div className="w-[500px] h-[500px] mx-auto">
      <ZetaGrid data={[]} columns={columnDefs} />
    </div>
  );
};
