import * as React from 'react';
import { FunctionComponent, useReducer, useState } from 'react';
import { BacklogProvider } from './backlogContext/BacklogContext';
import BacklogSelector from './backlogSelector/BacklogSelector';
import BacklogViewer from './backlogViewer/BacklogViewer';
import { IBacklogManagerProps } from './IBacklogManagerProps';

const BacklogManagerWithContext: FunctionComponent<IBacklogManagerProps> = (props: IBacklogManagerProps) => {
  return (
    <BacklogProvider>
      <BacklogSelector tasks={props.tasks} />
      <div>---</div>
      <BacklogViewer />
    </BacklogProvider>
  );
};

export default BacklogManagerWithContext;