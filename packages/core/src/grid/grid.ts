import { ColumnDefinition, ZetaGridContext, ZetaGridInstance } from '@models';
import { createContext } from '../context/context';

export type CreateZetaGridParams<TData> = {
  columnDefs: ColumnDefinition<TData>[];
} & Partial<Pick<ZetaGridContext<TData>, 'width' | 'height' | 'renderer'>>;

export const createGrid = <TData = unknown>({
  width,
  height,
  renderer,
  columnDefs,
}: CreateZetaGridParams<TData>): ZetaGridInstance => {
  const ctx = createContext({
    width,
    height,
    renderer,
    columnDefs,
  });

  const render: ZetaGridInstance['render'] = (element) => {
    ctx.root = element;
    const { columnDefs, renderer } = ctx;
    if (!columnDefs.length) return { headers: [] };

    const headers = columnDefs.map((columnDef) => renderer.headerRenderer(columnDef));

    return {
      headers,
    };
  };

  const instance: ZetaGridInstance = {
    render,
    use: (module) => {
      ctx.modules.push(module);
      return instance;
    },
  };

  return instance;
};
