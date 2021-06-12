import * as React from 'react';
import { FunctionComponent } from 'react';
import { ITasksViewerProps } from './ITasksViewerProps';

const TasksViewer: FunctionComponent<ITasksViewerProps> = (props) => {
  return (<div>Items:
    {props.tasks.map((item) => (
      <div key={item.id}>- {item.id} {item.title}</div>
    ))}
  </div>);
};

export default TasksViewer;