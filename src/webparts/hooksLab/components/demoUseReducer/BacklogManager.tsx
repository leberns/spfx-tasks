import { cloneDeep } from 'lodash';
import * as React from 'react';
import { FunctionComponent, useReducer, useState } from 'react';
import { ITask } from '../../../../entities/ITask';
import { IBacklogManagerProps } from './IBacklogManagerProps';

interface IBacklogAction {
  task: ITask;
  type: 'add' | 'remove';
}

function backlogReducer(state: ITask[], action: IBacklogAction) {

  switch (action.type) {
    case 'add':
      return [...state, action.task];

    case 'remove':
      {
        const pos = state.indexOf(action.task);
        const updatedState = cloneDeep(state);
        updatedState.splice(pos, 1);
        return updatedState;
      }

    default:
      return state;
  }
}

function totalReducer(state: number, action: IBacklogAction) {

  switch (action.type) {
    case 'add':
      return state + action.task.estimatedEffort;

    case 'remove':
      return state - action.task.estimatedEffort;

    default:
      return state;
  }
}

const BacklogManager: FunctionComponent<IBacklogManagerProps> = (props) => {

  const [backlog, setBacklog] = useReducer(backlogReducer, [] as ITask[]);
  const [total, setTotal] = useReducer(totalReducer, 0);

  function add(task: ITask) {
    setBacklog({ task, type: 'add' });
    setTotal({ task, type: 'add' });
  }

  function remove(task: ITask) {
    setBacklog({ task, type: 'remove' });
    setTotal({ task, type: 'remove' });
  }

  return (
    <div>
      <div>
        {props.tasks.map(t => (
          <div key={t.id}>
            <span aria-label="task">{t.title} (effort: {t.estimatedEffort}) </span>
            {!backlog.some(bt => bt.id === t.id) && <a href="#" onClick={() => add(t)}>Add</a>}
          </div>
        ))}
      </div>
      <div>---</div>
      <div>
        Backlog has {backlog.length} tasks
      </div>
      <div>
        {backlog.map(t => (
          <div key={t.id}>
            <span aria-label="task">{t.title} (effort: {t.estimatedEffort}) </span>
            <a href="#" onClick={() => remove(t)}>Remove</a>
          </div>
        ))}
      </div>
      <div>Total effort: {total}</div>
    </div>
  );
};

export default BacklogManager;