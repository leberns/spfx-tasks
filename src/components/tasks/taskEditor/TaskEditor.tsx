import * as React from "react";
import { FunctionComponent, useState, useEffect, useMemo, useCallback } from "react";
import { DatePicker, Dropdown, IDropdownOption, TextField } from "office-ui-fabric-react";
import * as _ from "lodash";

import { ITaskEditorProps } from "./ITaskEditorProps";
import { ITask } from "../../../entities/ITask";
import { TaskStatus } from "../../../enums/TaskStatus";

const TaskEditor: FunctionComponent<ITaskEditorProps> = (props) => {

  const [changedTask, setChangedTask] = useState({} as ITask);
  const [possibleStatus] = useState(() => {
    const statusValues: IDropdownOption[] = [];
    for (const status in TaskStatus) {
      statusValues.push({ key: status, text: status });
    }
    return statusValues;
  });

  useEffect(() => {
    const task = _.cloneDeep(props.task) ?? {} as ITask;
    setChangedTask(task);
  }, [props.task]);

  const debouncedOnChangedProperty = useCallback(
    _.debounce((event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = (event.target as any).value;
      console.log(`props.onChangedProperty title: ${value}`);
      props.onChangedProperty(value, 'title');
    }, 500),
    [props.onChangedProperty]
  );

  if (props.task === null) {
    return null;
  }

  return (
    <div>
      <TextField label='Task' value={changedTask.title} onChange={debouncedOnChangedProperty} />
      <Dropdown label='Status' options={possibleStatus} selectedKey={changedTask.status} onChange={(event, item) => props.onChangedProperty(item.text, 'status')} />
      <DatePicker label='Due Date'
        value={changedTask.dueDate}
        onSelectDate={date => props.onChangedProperty(date, 'dueDate')}
        formatDate={(date: Date): string =>
          date.toLocaleDateString()
        }>
      </DatePicker>
    </div>
  );
};

export default TaskEditor;