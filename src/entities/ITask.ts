import { TaskStatus } from '../enums/TaskStatus';
import { IEntity } from './IEntity';
import { IListItem, listItemMetadata } from './IListItem';
import { IField } from '../fields/IField';
import { IUser } from '../interfaces/IUser';
import { ExtendedFieldTypes } from '../fields/ExtendedFieldTypes';

export interface ITask extends IListItem {
  status: TaskStatus;
  dueDate: Date;
  assignedUser: IUser;
}

export const taskMetadata: Record<keyof Omit<ITask, keyof IEntity>, IField> = {
  ...listItemMetadata,
  status: {
    internalName: 'lbItemStatus',
    type: ExtendedFieldTypes.Choice
  },
  dueDate: {
    internalName: 'lbDueDate',
    type: ExtendedFieldTypes.DateTime
  },
  assignedUser: {
    internalName: 'lbAssignedUser',
    type: ExtendedFieldTypes.User
  }
};
