export interface IListItem {
  id: number;
  title: string;
}

export const listItemMetadata: Record<keyof IListItem, string> = {
  id: 'Id',
  title: 'Title'
};
