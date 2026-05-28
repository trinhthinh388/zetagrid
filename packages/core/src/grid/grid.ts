import { ZetaGridInstance } from '@models';

export type CreateZetaGridParams = {};

export const createGrid = ({}: CreateZetaGridParams): ZetaGridInstance => {
  let root: HTMLElement;

  const render: ZetaGridInstance['render'] = (element) => {
    root = element;
    console.log(render, root);
  };

  return {
    render,
  };
};
