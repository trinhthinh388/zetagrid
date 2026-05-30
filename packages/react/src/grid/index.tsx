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
          id: 'info',
          title: 'Info',
          accessor: 'info',
          children: [
            createColumn({
              id: 'firstName',
              title: 'First Name',
              accessor: 'firstName',
            }),
            createColumn({
              id: 'lastName',
              title: 'Last Name',
              accessor: 'lastName',
              children: [
                createColumn({
                  id: 'age7',
                  title: 'Age 5',
                  accessor: 'age5',
                }),
                createColumn({
                  id: 'age8',
                  title: 'Age 6',
                  accessor: 'age6',
                }),
              ],
            }),
          ],
        }),
        createColumn({
          id: 'age',
          title: 'Age',
          accessor: 'age',
          children: [
            createColumn({
              id: 'age2',
              title: 'Age 2',
              accessor: 'age2',
            }),
            createColumn({
              id: 'age3',
              title: 'Age 3',
              accessor: 'age3',
            }),
            createColumn({
              id: 'age4',
              title: 'Age 4',
              accessor: 'age4',
              children: [
                createColumn({
                  id: 'age5',
                  title: 'Age 5',
                  accessor: 'age5',
                }),
                createColumn({
                  id: 'age6',
                  title: 'Age 6',
                  accessor: 'age6',
                }),
              ],
            }),
          ],
        }),
      ]}
    >
      <div ref={ref} {...contructElementAttributes.root()}>
        <GridHeader />
      </div>
    </GridProvider>
  );
};
