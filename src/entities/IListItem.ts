import { IEntity } from "./IEntity";
import { ExtendedFieldTypes } from "../fields/ExtendedFieldTypes";
import { IField } from "../fields/IField";

export interface IListItem extends IEntity {
  id: number;
  title: string;
}

export const listItemMetadata: Record<keyof Omit<IListItem, keyof IEntity>, IField> = {
  id: {
    internalName: 'Id',
    type: ExtendedFieldTypes.Counter
  },
  title: {
    internalName: 'Title',
    type: ExtendedFieldTypes.Text
  }
};
