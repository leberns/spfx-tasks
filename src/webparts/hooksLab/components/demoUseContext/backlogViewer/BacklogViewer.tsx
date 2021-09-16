import * as React from "react";
import { FunctionComponent, useMemo } from "react";
import { cloneDeep } from "@microsoft/sp-lodash-subset";

import { useBacklog } from "../backlogContext/BacklogContext";
import { ITask } from "../../../../../entities/ITask";

const BacklogViewer: FunctionComponent = () => {
  const { backlog, setBacklog } = useBacklog();

  function remove(task: ITask) {
    setBacklog(bl => {
      const pos = bl.items.indexOf(task);
      const updatedBacklog = cloneDeep(bl);
      updatedBacklog.items.splice(pos, 1);
      return updatedBacklog;
    });
  }

  const total = useMemo(() => {
    let totalEf = 0;
    backlog.items.forEach(t => totalEf += t.estimatedEffort);
    return totalEf;
  }, [backlog]);

  return (
    <div>
      <div>
        Backlog has {backlog.items.length} tasks
      </div>
      <div>
        {backlog.items.map(t => (
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

export default BacklogViewer;