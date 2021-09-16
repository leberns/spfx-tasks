import * as React from "react";
import { createContext, useContext, useState } from "react";
import { IBacklog } from "../IBacklog";
import { IBacklogContext } from "./IBacklogContext";

const BacklogContext = createContext<IBacklogContext>({
  backlog: { items: [] },
  setBacklog: () => { },
});

function useBacklog(): IBacklogContext {
  const backlogContext = useContext(BacklogContext);
  if (!backlogContext) {
    throw new Error(`useBacklog has to be wrapped in an BacklogProvider`);
  }
  return backlogContext;
}

function BacklogProvider(props) {
  const [backlog, setBacklog] = useState<IBacklog>({
    items: [],
  });

  const backlogContext = React.useMemo(() => {
    return { backlog, setBacklog } as IBacklogContext;
  }, [backlog]);

  return <BacklogContext.Provider value={{ ...backlogContext }} {...props} />;
}

export { useBacklog, BacklogProvider };
