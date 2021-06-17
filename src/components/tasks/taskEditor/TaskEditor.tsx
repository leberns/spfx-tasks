import * as React from "react";
import { FunctionComponent } from "react";

import { ITaskEditorProps } from "./ITaskEditorProps";

const TaskEditor: FunctionComponent<ITaskEditorProps> = (props) => {

  if (props.task === null) {
    return null;
  }

  return (
    <div>Edit Form for {JSON.stringify(props.task)} ... to be implemented</div>
  );
}

export default TaskEditor;