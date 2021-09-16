import * as React from 'react';
import styles from './HooksLab.module.scss';
import { IHooksLabProps } from './IHooksLabProps';
import BacklogManager from './demoUseReducer/BacklogManager';
import { ITask } from '../../../entities/ITask';
import { TaskStatus } from '../../../enums/TaskStatus';
import BacklogManagerWithContext from './demoUseContext/BacklogManager';

export default class HooksLab extends React.Component<IHooksLabProps, {}> {
  public render(): React.ReactElement<IHooksLabProps> {

    // https://adessoleandrobernsmueller.sharepoint.com/sites/tasks-dev/SitePages/Lab.aspx?debugManifestsFile=https%3A%2F%2Flocalhost%3A4321%2Ftemp%2Fmanifests.js&loadSPFX=true&customActions=%7B%7D#

    const tasks: ITask[] = [
      { id: 1, title: 'Task A', estimatedEffort: 3, status: TaskStatus.Open, dueDate: new Date(), assignedUser: null },
      { id: 2, title: 'Task B', estimatedEffort: 1, status: TaskStatus.Open, dueDate: new Date(), assignedUser: null },
      { id: 3, title: 'Task C', estimatedEffort: 5, status: TaskStatus.Open, dueDate: new Date(), assignedUser: null },
    ];

    return (
      <div className={styles.hooksLab}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <BacklogManager tasks={tasks} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
              <BacklogManagerWithContext tasks={tasks} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
