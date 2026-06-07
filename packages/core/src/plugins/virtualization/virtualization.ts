import { proxy } from 'valtio';
import { Cell } from '../../cell/cell';
import { RowData } from '../../types';
import { BaseGridPlugin } from '../base';

export class VirtualizationPlugin<TData extends RowData = RowData> extends BaseGridPlugin<TData> {
  /**
   * Number of extra rows/columns to render outside the visible viewport
   * to avoid flicker during scrolling.
   */
  overscan = 5;

  /**
   * Reactive scroll state — tracked via valtio so that consumers
   * (e.g. React components using `useSnapshot`) re-render on scroll.
   */
  scroll = proxy({ top: 0, left: 0 });

  #scrollHandler: (() => void) | null = null;
  #scrollContainer: HTMLElement | null = null;

  /**
   * Called by the grid during destruction.
   * Cleans up scroll listeners and resets state.
   */
  override destroy = (): void => {
    this.unregister();
    this.scroll.top = 0;
    this.scroll.left = 0;
  };

  /**
   * Called by the grid during initialization.
   * The plugin is ready but `register()` must still be called
   * with a scroll container element to start tracking scroll.
   */
  override init = (): void => {
    // No-op — scroll tracking starts when `register()` is called
    // with the scrollable DOM element.
  };

  /**
   * Detach the scroll listener and release the container reference.
   */
  unregister = (): void => {
    if (this.#scrollContainer && this.#scrollHandler) {
      this.#scrollContainer.removeEventListener('scroll', this.#scrollHandler);
    }
    this.#scrollContainer = null;
    this.#scrollHandler = null;
  };

  /**
   * Register the scrollable container element. This attaches a passive
   * scroll listener that keeps `this.scroll` in sync.
   */
  register = (scrollContainer: HTMLElement | null): void => {
    if (!scrollContainer) return;

    // Avoid double-registering
    this.unregister();

    this.#scrollContainer = scrollContainer;
    this.#scrollHandler = () => {
      this.scroll.top = scrollContainer.scrollTop;
      this.scroll.left = scrollContainer.scrollLeft;
    };

    scrollContainer.addEventListener('scroll', this.#scrollHandler, { passive: true });
  };

  // ---------------------------------------------------------------------------
  // Visibility checks
  // ---------------------------------------------------------------------------

  /**
   * Returns the [startRow, endRow) range of visible header rows
   * based on the header's `prefixHeightSum`.
   */
  getVisibleRowRange = (): [start: number, end: number] => {
    const header = this.grid.getHeader();
    const prefixHeightSum = header.getPrefixHeightSum();
    const totalRows = prefixHeightSum.length;

    if (totalRows === 0) return [0, 0];

    const viewportTop = this.scroll.top;
    const viewportBottom = viewportTop + this.grid.getRect().height;

    const start = this.#lowerBound(prefixHeightSum, viewportTop) - 1;
    const end = this.#upperBound(prefixHeightSum, viewportBottom);

    return [Math.max(0, start - this.overscan), Math.min(totalRows, end + this.overscan)];
  };

  // ---------------------------------------------------------------------------
  // Range-based queries (use binary search on sorted prefix sums)
  // ---------------------------------------------------------------------------

  /**
   * Returns the [startCol, endCol) range of visible leaf columns
   * based on the header's `prefixWidthSum`.
   */
  getVisibleColRange = (): [start: number, end: number] => {
    const header = this.grid.getHeader();
    const prefixWidthSum = header.getPrefixWidthSum();
    const totalCols = prefixWidthSum.length;

    if (totalCols === 0) return [0, 0];

    const viewportLeft = this.scroll.left;
    const viewportRight = viewportLeft + this.grid.getRect().width;

    // First column whose right edge is past the viewport left
    const start = this.#lowerBound(prefixWidthSum, viewportLeft) - 1;
    // First column whose left edge is past the viewport right
    const end = this.#upperBound(prefixWidthSum, viewportRight);

    return [Math.max(0, start - this.overscan), Math.min(totalCols, end + this.overscan)];
  };

  /**
   * Returns `true` if a cell's rect overlaps the visible viewport
   * (with overscan padding applied).
   */
  isCellVisible = (cell: Cell<TData>): boolean => {
    const { top, left, width, height } = cell.getRect();
    const viewportTop = this.scroll.top;
    const viewportLeft = this.scroll.left;
    const viewportWidth = this.grid.getRect().width;
    const viewportHeight = this.grid.getRect().height;

    const overscanX = this.overscan * Cell.DEFAULT_CELL_WIDTH;
    const overscanY = this.overscan * Cell.DEFAULT_CELL_HEIGHT;

    const visibleVertically =
      top + height > viewportTop - overscanY && top < viewportTop + viewportHeight + overscanY;

    const visibleHorizontally =
      left + width > viewportLeft - overscanX && left < viewportLeft + viewportWidth + overscanX;

    return visibleVertically && visibleHorizontally;
  };

  // ---------------------------------------------------------------------------
  // Binary search helpers (on sorted prefix-sum arrays)
  // ---------------------------------------------------------------------------

  /**
   * Find the index of the first element >= value.
   */
  #lowerBound = (arr: number[], value: number): number => {
    let lo = 0;
    let hi = arr.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (arr[mid] < value) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }
    return lo;
  };

  /**
   * Find the index of the first element > value.
   */
  #upperBound = (arr: number[], value: number): number => {
    let lo = 0;
    let hi = arr.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (arr[mid] <= value) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }
    return lo;
  };
}
