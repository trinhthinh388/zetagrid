export type Header = {
  id: string;
  /**
   * It could be string or any framework's component.
   */
  title: any;
  /**
   * Defines how many columns the header will span.
   */
  colSpan?: number;
  /**
   * Defines how many rows the header will span.
   */
  rowSpan?: number;
  /**
   * If true, the header will be rendered as a placeholder.
   */
  isPlaceholder?: boolean;
  /**
   * The id of the column that the placeholder is associated with.
   */
  placeholderId?: string;
};

export type HeaderGroup = {
  id: string;
  /**
   * Gets all the headers in this group.
   */
  getHeaders: () => Header[];
};
