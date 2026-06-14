import { RowData } from '../../types';
import { component } from '../annotations';
import { Reactivity } from '../reactivity';

export type ScrollManagerContructorParams<TData extends RowData = RowData> = {
  gridId: string;
};

export type ScrollManagerState = {
  scrollTop: number;
  scrollLeft: number;
};

@component
export class ScrollManager<TData extends RowData = RowData> {
  protected gridId: string;
  protected scroll: Reactivity<ScrollManagerState>;

  constructor({ gridId }: ScrollManagerContructorParams<TData>) {
    this.gridId = gridId;
    this.scroll = new Reactivity<ScrollManagerState>({
      scrollTop: 0,
      scrollLeft: 0,
    });
  }
}
