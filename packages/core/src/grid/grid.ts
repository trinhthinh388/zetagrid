import { ColumnDefinition, ZetaGridInstance } from '@models';
import { createContext } from '../context/context';

export type CreateZetaGridParams<TData> = {
  columnDefs: ColumnDefinition<TData>[];
};

export const createGrid = <TData = unknown>({
  columnDefs,
}: CreateZetaGridParams<TData>): ZetaGridInstance => {
  const ctx = createContext({
    columnDefs,
  });

  const render: ZetaGridInstance['render'] = (element) => {
    ctx.root = element;
    console.log(render, element);
  };

  return {
    render,
  };
};
