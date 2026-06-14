import { Cell } from '../cell/cell';
import { RenderResult } from '../common';
import { GridChildComponent } from '../common/grid-child-component';
import { BodyRow } from '../row/body-row';
import { ColumnDefinition, RowData } from '../types';
import { BodyState, IBody } from './types';

export type BodyContructorParams<TData extends RowData = RowData> = {
  gridId: string;
};

export class Body<TData extends RowData = RowData>
  extends GridChildComponent<BodyState, TData>
  implements IBody<TData>
{
  private totalRows = 0;
  private rows: BodyRow<TData>[];
  private rowsMap: Map<string, BodyRow<TData>>;

  #calculateTotalRows = () => {
    if (!this.grid.getData()) return 0;
    return this.grid.getData().length;
  };

  override destroy = (): void => {};

  override refresh = (): void => {};

  override init = (): void => {
    this.totalRows = this.#calculateTotalRows();

    this.#createRows();

    this.#initRows();

    this.state.set('init', true);
  };

  render = (): RenderResult[] => [
    {
      attributes: {
        'data-slot': 'body',
        role: 'presentation',
        className: 'zeta-grid__body',
      },
      children: [
        {
          children: [],
          attributes: {
            role: 'presentation',
            'data-slot': 'body-container',
            className: 'zeta-grid__body-container',
          },
        },
      ],
    },
  ];

  constructor({ gridId }: BodyContructorParams<TData>) {
    super({ gridId });
    this.rows = [];
    this.totalRows = 0;
    this.rowsMap = new Map();
  }

  #initRows() {
    this.rows.forEach((row) => row.init());
  }

  #createRows() {
    const nodeCount = this.grid.getHeader().getLeafNodeCount();
    for (let rowIndex = 0; rowIndex < this.totalRows; rowIndex++) {
      const row = new BodyRow<TData>({
        rowIndex,
        nodeCount,
        gridId: this.gridId,
      });
      this.rows[rowIndex] = row;
      this.rowsMap.set(row.getRowId(), row);
    }
  }

  #createCells() {
    const _insert = (
      columnDefinitions: ColumnDefinition<TData>[],
      currentLevel = 0,
      leafColStart = 0,
    ) => {
      let leafColOffset = leafColStart;
      columnDefinitions.forEach((columnDefinition) => {
        const isLeaf = this.#isLeaf(columnDefinition);
        const colSpan = this.#getColSpan(columnDefinition);
        const rowSpan = isLeaf ? this.totalRows - currentLevel : 1;
        const rowIndex = isLeaf ? this.totalRowsc - 1 : currentLevel; // Insert leaf node at the last row
        this.rows.at(rowIndex)?.insertCell(
          new Cell<TData>({
            colSpan,
            rowSpan,
            rowIndex,
            gridId: this.gridId,
            colIndex: leafColOffset,
            renderer: () => columnDefinition.title,
          }),
        );

        if (columnDefinition.children.length) {
          _insert(columnDefinition.children, currentLevel + 1, leafColOffset);
        }

        leafColOffset += colSpan;
      });
    };

    _insert(this.grid.getColumnDefinitions(), 0, 0);
  }
}
