import { ITask } from "../entities/ITask";

export interface IListService {
  fetch(): Promise<ITask[]>;
}