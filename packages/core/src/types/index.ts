export type RowData = {
  [Key: string | number | symbol]: number | string | boolean | Date | null | undefined | RowData;
};

export * from './columns';
export * from './elements';
export * from './rect';
