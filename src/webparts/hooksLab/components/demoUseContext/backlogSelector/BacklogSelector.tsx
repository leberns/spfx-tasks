import * as React from "react";
import { FunctionComponent } from "react";

import { IBacklogSelectorProps } from "./IBacklogSelectorProps";
import { useBacklog } from "../backlogContext/BacklogContext";
import { ITask } from "../../../../../entities/ITask";
import { cloneDeep } from "lodash";

const BacklogSelector: FunctionComponent<IBacklogSelectorProps> = (props: IBacklogSelectorProps) => {
  const { backlog, setBacklog } = useBacklog();

  function add(task: ITask) {
    setBacklog(bl => {
      const updatedBl = cloneDeep(bl);
      updatedBl.items = [...bl.items, task];
      return updatedBl;
    });
  }

  return (
    <div>
      {props.tasks.map(t => (
        <div key={t.id}>
          <span aria-label="task">{t.title} (effort: {t.estimatedEffort}) </span>
          {!backlog.items.some(bt => bt.id === t.id) && <a href="#" onClick={() => add(t)}>Add</a>}
        </div>
      ))}
    </div>
  );
};

export default BacklogSelector;