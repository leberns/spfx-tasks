import { ITask } from "../../../entities/ITask";

export interface ITasksViewerProps {
  tasks: ITask[];
  onSelectedTaskChanged: (task: ITask) => void;
}