import { ExtendedFieldTypes } from "../fields/ExtendedFieldTypes";
import { IField } from "../fields/IField";

export interface IListItem {
  id: number;
  title: string;
}

export const listItemMetadata: Record<keyof IListItem, IField> = {
  id: {
    internalName: 'Id',
    type: ExtendedFieldTypes.Counter
  },
  title: {
    internalName: 'Title',
    type: ExtendedFieldTypes.Text
  }
};
