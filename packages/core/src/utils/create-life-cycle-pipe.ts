import { ZetaGridInstance, ZetaGridLifeCycle } from '@models';

export type LifeCyclePipeCallback<TData> = (grid: ZetaGridInstance<TData>) => void;

export const createLifeCyclePipe = <TData>() => {
  const pipes: Map<ZetaGridLifeCycle, Set<LifeCyclePipeCallback<TData>>> = new Map<
    ZetaGridLifeCycle,
    Set<LifeCyclePipeCallback<TData>>
  >([
    ['init', new Set()],
    ['unmount', new Set()],
    ['mount', new Set()],
    ['update', new Set()],
  ]);

  const register = (phase: ZetaGridLifeCycle, callback: LifeCyclePipeCallback<TData>) => {
    pipes.get(phase)?.add(callback);
    return () => pipes.get(phase)?.delete(callback);
  };

  const run = (phase: ZetaGridLifeCycle, grid: ZetaGridInstance<TData>) => {
    pipes.get(phase)?.forEach((callback) => callback(grid));
  };

  return {
    run,
    register,
  };
};
