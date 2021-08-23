import * as React from "react";
import { FunctionComponent, useState, useEffect } from 'react';

import { ITasksProviderProps } from "./ITasksProviderProps";
import { useAppContext } from "../../../appContext/AppContext";
import { ITask } from "../../../entities/ITask";
import { ListService } from "../../../services/ListService";
import ErrorViewer from "../../../errors/errorViewer/ErrorViewer";
import TaskEditor from "../taskEditor/TaskEditor";
import TasksViewer from "../tasksViewer/TasksViewer";
import { PartialEntity } from "../../../entities/PartialEntity";

const TasksProvider: FunctionComponent<ITasksProviderProps> = () => {

  const appContext = useAppContext();
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([] as ITask[]);
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

  function onChangedProperty(value: string | Date, propertyName: keyof ITask): void {
    const id = selectedTask.id;
    const change: PartialEntity<ITask> = {
      id,
      [propertyName]: value,
    };
    tryUpdate(change);
  }

  async function tryUpdate(change: PartialEntity<ITask>): Promise<void> {
    try {
      const listService = new ListService(appContext.listTitle);
      await listService.update(change);
      const entities = await listService.fetch();
      setTasks(entities);
    }
    catch (e) {
      setError(e);
    }
  }

  return (
    <ErrorViewer error={error}>
      <TasksViewer
        tasks={tasks}
        onSelectedTaskChanged={onSelectedTaskChanged}
      />
      <TaskEditor
        task={selectedTask}
        onChangedProperty={onChangedProperty}
      />
    </ErrorViewer>
  );
};

export default TasksProvider;