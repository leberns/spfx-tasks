import { TaskStatus } from '../enums/TaskStatus';
import { IListItem, listItemMetadata } from './IListItem';
import { IUser } from '../interfaces/IUser';

export interface ITask extends IListItem {
  status: TaskStatus;
  dueDate: Date;
  assignedUser: IUser;
}

export const toDoItemMetadata: Record<keyof ITask, string> = {
  ...listItemMetadata,
  status: 'ItemStatus',
  dueDate: 'DueDate',
  assignedUser: 'AssignedUser'
};
