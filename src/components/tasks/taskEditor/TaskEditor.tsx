import * as React from "react";
import { FunctionComponent, useState, useEffect } from "react";
import { DatePicker, Dropdown, IDropdownOption, TextField } from "office-ui-fabric-react";

import { ITaskEditorProps } from "./ITaskEditorProps";
import { ITask } from "../../../entities/ITask";
import { TaskStatus } from "../../../enums/TaskStatus";

const TaskEditor: FunctionComponent<ITaskEditorProps> = (props) => {

  const [changedTask, setChangedTask] = useState({} as ITask);
  const [options] = useState(() => {
    const initialOptions: IDropdownOption[] = [];
    for (const status in TaskStatus) {
      initialOptions.push({ key: status, text: status });
    }
    return initialOptions;
  });

  useEffect(() => {
    const task = props.task ?? {} as ITask;
    setChangedTask(task);
  }, [props.task]);

  if (props.task === null) {
    return null;
  }

  return (
    <div>
      <TextField label='Task' value={changedTask.title} onChange={event => onChangeTask((event.target as any).value, 'title')} />
      <Dropdown label='Status' options={options} selectedKey={changedTask.status} onChange={(event, item) => onChangeTask(item.text, 'status')} />
      <DatePicker label='Due Date'
        value={changedTask.dueDate}
        onSelectDate={date => onChangeTask(date, 'dueDate')}
        formatDate={(date: Date): string =>
          date.toLocaleDateString()
        }>
      </DatePicker>
    </div>
  );

  function onChangeTask(value: string | Date, propertyName: keyof ITask): void {
    const change: ITask = {
      ...changedTask,
      [propertyName]: value
    };
    setChangedTask(change);
  }
};

export default TaskEditor;