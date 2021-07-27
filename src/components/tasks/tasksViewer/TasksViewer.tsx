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
    </div>);

  function onSelectedTaskChanged(items: ITask[]): void {
    if (items.length === 0) {
      props.onSelectedTaskChanged(null);
      return;
    }
    const item = items[0];
    const task = props.tasks.filter(t => t.id === item.id)[0];
    props.onSelectedTaskChanged(task);
  }

  function onRenderDueDate(row: any, index: number): JSX.Element {
    const task = props.tasks[index];
    const date = task.dueDate?.toLocaleDateString();
    return <span>{date}</span>;
  }
};

export default TasksViewer;