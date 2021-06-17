import * as React from 'react';

import AppContext from '../../../appContext/AppContext';
import TasksProvider from '../../../components/tasks/tasksProvider/TasksProvider';
import { ITasksProps } from './ITasksProps';

export const TasksApp: React.FunctionComponent<ITasksProps> = (props) => {
  return (
    <AppContext.Provider value={props.appContext}>
      <TasksProvider />
    </AppContext.Provider>
  );
};

export default TasksApp;