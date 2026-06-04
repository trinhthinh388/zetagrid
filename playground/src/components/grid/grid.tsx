import { Grid as ZetaGrid } from '@react';
import { useState } from 'react';
import { columnDefs } from './columns';
import { generateMockData } from './mockData';

export const Grid = () => {
  const [data] = useState(() => generateMockData(100));

  return (
    <div className="w-[800px] h-[500px] mx-auto">
      <ZetaGrid data={data} columnDefs={columnDefs} />
    </div>
  );
};
