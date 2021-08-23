import { ITask } from "../entities/ITask";
import { PartialEntity } from "../entities/PartialEntity";

export interface IListService {
  fetch(): Promise<ITask[]>;
  update(task: PartialEntity<ITask>): Promise<void>;
}