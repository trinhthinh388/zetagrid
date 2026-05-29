import { contructElementAttributes } from '@core';
import { PropsWithChildren } from 'react';

export type GridHeaderProps = PropsWithChildren;

export const GridHeader = (props: GridHeaderProps) => {
  return <div {...props} {...contructElementAttributes.header()} />;
};
