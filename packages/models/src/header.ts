export type Header = { id: string; title: any };

export type HeaderGroup = {
  id: string;
  getHeaders: () => Header[];
};
