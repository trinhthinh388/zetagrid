import { gridRegistry, Registrable } from '../registry';

/**
 * `@register` — TC39 Stage 3 class decorator.
 *
 * When applied to a class that implements `Registrable` (i.e. has a `getId()` method),
 * it wraps the constructor so that every new instance is automatically registered
 * in the global {@link gridRegistry} under its unique ID.
 *
 * @example
 * ```ts
 * @register
 * export class Grid<TData extends RowData = RowData>
 *   extends BaseGridComponent<GridState>
 *   implements IGrid<TData> { … }
 * ```
 */
export function register<TClass extends new (...args: any[]) => Registrable>(Base: TClass): TClass {
  return class extends Base {
    constructor(...args: any[]) {
      super(...args);
      gridRegistry.set(this);
    }
  } as TClass;
}
