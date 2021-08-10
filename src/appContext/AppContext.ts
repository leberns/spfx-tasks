import { createContext, useContext } from "react";

import { IAppContext } from "./IAppContext";

const AppContext = createContext<IAppContext>({
  context: null,
  listTitle: ''
});

function useAppContext(): IAppContext {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(`useAppContext has to be wrapped in an AppContextProvider`);
  }

  return context;
}

export default AppContext;
export { useAppContext };
