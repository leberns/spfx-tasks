import { ITask } from "../../../entities/ITask";

export interface ITaskEditorProps {
  task: ITask;
  onChangedProperty: (value: string | Date, propertyName: keyof ITask) => void;
}