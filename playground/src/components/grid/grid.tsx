import { Grid as ZetaGrid } from '@react';
import { columnDefs } from './columns';
import { data } from './data';

export const Grid = () => {
  return (
    <div className="w-[500px] h-[500px] mx-auto">
      <ZetaGrid data={data} columns={columnDefs} />
    </div>
  );
};
