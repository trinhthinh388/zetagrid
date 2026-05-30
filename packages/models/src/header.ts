export type Header = {
  id: string;
  /**
   * It could be string or any framework's component.
   */
  title: any;
  /**
   * Width of the header cell in pixels.
   */
  width: number;
  /**
   * Height of the header cell in pixels.
   */
  height: number;
  /**
   * Indicates the header is a group header.
   */
  isGroup: boolean;
  children: Header[];
};
