import { useState } from 'react';
import { createGrid, type CreateZetaGridParams } from '@core';

export const useGrid = <TData>(params: CreateZetaGridParams<TData>) => {
  const [grid] = useState(() => createGrid(params));

  return grid;
};
