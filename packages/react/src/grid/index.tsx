import { contructElementAttributes, createColumn } from '@core';
import '@zetagrid/styles';
import { useRef } from 'react';
import { GridHeader } from '../header';
import { GridProvider } from '../hooks/use-grid';

export const Grid = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <GridProvider
      columnDefs={[
        createColumn({
          id: 'name',
          title: 'Name',
          accessor: 'name',
        }),
        createColumn({
          id: 'age',
          title: 'Age',
          accessor: 'age',
        }),
      ]}
    >
      <div ref={ref} {...contructElementAttributes.root()}>
        <GridHeader />
      </div>
    </GridProvider>
  );
};
