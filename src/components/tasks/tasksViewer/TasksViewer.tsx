import * as React from 'react';
import { FunctionComponent } from 'react';
import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";

import { ITasksViewerProps } from './ITasksViewerProps';
import { ITask } from '../../../entities/ITask';
import { DefaultButton } from 'office-ui-fabric-react';

const viewFields: IViewField[] = [
  {
    name: 'title',
    displayName: 'Title',
    isResizable: true,
    sorting: true
  },
  {
    name: 'status',
    displayName: 'Status',
    isResizable: true,
    sorting: true
  },
  {
    name: 'dueDate',
    displayName: 'Due Date',
    isResizable: true,
    sorting: true
  },
  {
    name: 'assignedUser',
    displayName: 'Assigned To',
    isResizable: true,
    sorting: true
  },
];

const TasksViewer: FunctionComponent<ITasksViewerProps> = (props) => {
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
};

export default TasksViewer;