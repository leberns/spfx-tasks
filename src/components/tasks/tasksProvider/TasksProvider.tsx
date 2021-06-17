import * as React from "react";
import { FunctionComponent, useContext, useState, useEffect } from 'react';

import AppContext from "../../../appContext/AppContext";
import { ITask } from "../../../entities/ITask";
import ErrorViewer from "../../../errorViewer/ErrorViewer";
import { ListService } from "../../../services/ListService";
import TaskEditor from "../taskEditor/TaskEditor";
import TasksViewer from "../tasksViewer/TasksViewer";
import { ITasksProviderProps } from "./ITasksProviderProps";

const TasksProvider: FunctionComponent<ITasksProviderProps> = () => {

  const appContext = useContext(AppContext);
  const [tasks, setTasks] = useState([] as ITask[]);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null as ITask);

  useEffect(() => {
    let unmounted = false;

    (async () => {
      try {
        const listService = new ListService(appContext.listTitle);
        const entities = await listService.fetch();
        if (unmounted) {
          return;
        }
        setTasks(entities);
      }
      catch (e) {
        setError(e);
      }
    })();

    return () => unmounted = true;
  }, []);

  function onSelectedTaskChanged(task: ITask): void {
    setSelectedTask(task);
  }

  return (
    <ErrorViewer error={error}>
      <TasksViewer
        tasks={tasks}
        onSelectedTaskChanged={onSelectedTaskChanged} />
      <TaskEditor task={selectedTask} />
    </ErrorViewer>
  );
};

export default TasksProvider;