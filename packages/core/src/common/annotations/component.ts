import { IGrid } from '../../grid/types';
import { gridRegistry } from '../registry';

/**
 * `@component` — TC39 Stage 3 class decorator.
 *
 * Automatically adds a `get grid()` accessor that resolves the parent
 * `Grid` instance from the global {@link gridRegistry} using the
 * instance's `gridId` property. This eliminates the boilerplate getter
 * duplication across all grid child components.
 *
 * The decorated class **must** have a `gridId: string` property.
 * Consuming classes should declare the typed field with:
 * ```ts
 * protected declare grid: IGrid<TData>;
 * ```
 *
 * @example
 * ```ts
 * @component
 * export class Body<TData extends RowData = RowData>
 *   extends BaseGridComponent<BodyState> { … }
 * ```
 */
export const component = <TClass extends abstract new (...args: any[]) => any>(
  Base: TClass,
): TClass => {
  Object.defineProperty(Base.prototype, 'grid', {
    configurable: true,
    get(this: any): IGrid {
      const grid = gridRegistry.get(this.gridId);
      if (!grid) throw new Error(`Grid with ID "${this.gridId}" not found in registry.`);
      return grid;
    },
  });
  return Base;
};
