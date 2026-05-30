import { ColumnDefinition } from '@models';
import { Queue } from './queue';

const getColumnDepth = <TData>(column: ColumnDefinition<TData>) => {
  let depth = 0;
  const queue = Queue.from<ColumnDefinition<TData>>([column]);
  while (!queue.isEmpty) {
    depth += 1;
    const node = queue.dequeue();
    for (const child of node.children ?? []) {
      queue.enqueue(child);
    }
  }
  return depth;
};

export const getMaxColumnsDepth = <TData>(columns: ColumnDefinition<TData>[]) => {
  if (columns.length === 0) return 0;
  return Math.max(...columns.map(getColumnDepth));
};
