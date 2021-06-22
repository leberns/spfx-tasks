import * as React from 'react';
import { FunctionComponent } from 'react';
import { ListView, IViewField, SelectionMode } from "@pnp/spfx-controls-react/lib/ListView";

import { ITasksViewerProps } from './ITasksViewerProps';
import { ITask } from '../../../entities/ITask';

const TasksViewer: FunctionComponent<ITasksViewerProps> = (props) => {

  const viewFields: IViewField[] = [
    {
      name: 'title',
      displayName: 'Title',
      isResizable: true,
      sorting: true,
      minWidth: 100,
      maxWidth: 200
    },
    {
      name: 'status',
      displayName: 'Status',
      isResizable: true,
      sorting: true,
      minWidth: 100,
    },
    {
      name: 'dueDate',
      displayName: 'Due Date',
      isResizable: true,
      sorting: true,
      minWidth: 100,
      render: onRenderDueDate,
    },
    {
      name: 'assignedUser',
      displayName: 'Assigned To',
      isResizable: true,
      sorting: true,
      minWidth: 100,
    },
  ];

  return (
    <div>
      <ListView
        items={props.tasks}
        viewFields={viewFields}
        compact={true}
        selectionMode={SelectionMode.single}
        selection={onSelectedTaskChanged} />
      <div>
        {props.tasks.map((item) => (
          <div key={item.id}>- {item.id} {item.title}</div>
        ))}
      </div>
    </div>);

  function onSelectedTaskChanged(tasks: ITask[]): void {
    const task = tasks.length > 0 ? tasks[0] : null;
    props.onSelectedTaskChanged(task);
  }

  function onRenderDueDate(item: any): JSX.Element {
    const task = props.tasks.filter(t => t.id === item.id)[0];
    const date = task.dueDate?.toLocaleDateString();
    return <span>{date}</span>;
  }
};

export default TasksViewer;