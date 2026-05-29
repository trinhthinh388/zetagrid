import { ColumnDefinition, HeaderGroup, ZetaGridContext, ZetaGridInstance } from '@models';
import { createContext } from '../context/context';
import { generateId } from '../utils';

export type CreateZetaGridParams<TData> = {
  columnDefs: ColumnDefinition<TData>[];
} & Partial<Pick<ZetaGridContext<TData>, 'width' | 'height'>>;

export const createGrid = <TData = unknown>({
  width,
  height,
  columnDefs,
}: CreateZetaGridParams<TData>): ZetaGridInstance => {
  const ctx = createContext({
    width,
    height,
    columnDefs,
  });

  const getHeaderGroups: ZetaGridInstance['getHeaderGroups'] = () => {
    const { columnDefs } = ctx;

    const groups: HeaderGroup[] = [
      {
        id: generateId(),
        getHeaders: () =>
          columnDefs.map((def) => ({
            id: def.id,
            title: def.title,
          })),
      },
    ];

    return groups;
  };

  const instance: ZetaGridInstance = {
    getHeaderGroups,
    use: (module) => {
      ctx.modules.push(module);
      return instance;
    },
  };

  return instance;
};
