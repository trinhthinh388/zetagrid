import { IGrid } from '../grid/types';
import { RowData } from '../types';
import { component } from './annotations/component';
import { BaseGridComponent, BaseGridComponentState } from './base-grid-component';

/**
 * Base class for grid child components (Body, Header, Cell, Row).
 *
 * Extends {@link BaseGridComponent} with:
 * - A `gridId` field to identify the parent grid.
 * - A `grid` accessor (injected by the `@component` decorator) that
 *   resolves the parent `Grid` instance from the global registry.
 *
 * Subclasses no longer need to declare `gridId` or `grid` themselves.
 */
@component
export abstract class GridChildComponent<
  TState extends object,
  TData extends RowData = RowData,
> extends BaseGridComponent<TState> {
  protected gridId: string;
  declare protected grid: IGrid<TData>;

  constructor({
    gridId,
    initial = {},
  }: {
    gridId: string;
    initial?: Partial<BaseGridComponentState<TState>>;
  }) {
    super({ initial });
    this.gridId = gridId;
  }
}
