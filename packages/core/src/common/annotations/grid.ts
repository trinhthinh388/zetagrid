import { IGrid } from '../../grid/types';
import { gridRegistry } from '../registry';

/**
 * `@register` — TC39 Stage 3 class decorator.
 *
 * When applied to a class that implements `IGrid` (i.e. has a `getId()` method),
 * it wraps the constructor so that every new instance is automatically registered
 * in the global {@link gridRegistry} under its unique ID.
 *
 * @example
 * ```ts
 * @grid
 * export class Grid<TData extends RowData = RowData>
 *   extends BaseGridComponent<GridState>
 *   implements IGrid<TData> { … }
 * ```
 */
export function grid<TClass extends new (...args: any[]) => IGrid>(Base: TClass): TClass {
  return class extends Base {
    constructor(...args: any[]) {
      super(...args);
      gridRegistry.set(this);
    }
  } as TClass;
}
