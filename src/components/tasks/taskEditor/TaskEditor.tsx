import * as React from "react";
import { FunctionComponent, useState, useEffect } from "react";
import { TextField } from "office-ui-fabric-react";

import { ITaskEditorProps } from "./ITaskEditorProps";
import { ITask } from "../../../entities/ITask";

const TaskEditor: FunctionComponent<ITaskEditorProps> = (props) => {

  const [changedTask, setChangedTask] = useState({} as ITask);

  useEffect(() => {
    const task = props.task ?? {} as ITask;
    setChangedTask(task);
  }, [props.task]);

  if (props.task === null) {
    return null;
  }

  return (
    <div>
      <TextField label={'Task'} value={changedTask.title} onChange={event => onChangeTask((event.target as any).value, 'title')} />
    </div>
  );

  function onChangeTask(value: string, propertyName: keyof ITask): void {
    const change: ITask = {
      ...changedTask,
      [propertyName]: value
    };
    setChangedTask(change);
  }
};

export default TaskEditor;