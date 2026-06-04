export type RowData = {
  [Key: string]: number | string | boolean | Date | null | undefined | RowData;
};

export * from './columns';
export * from './rect';
