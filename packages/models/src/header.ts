export type Header = {
  id: string;
  /**
   * It could be string or any framework's component.
   */
  title: any;
  colSpan?: number;
  rowSpan?: number;
  isPlaceholder?: boolean;
  placeholderId?: string;
};

export type HeaderGroup = {
  id: string;
  getHeaders: () => Header[];
};
