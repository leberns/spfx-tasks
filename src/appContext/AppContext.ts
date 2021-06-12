import * as React from "react";

import { IAppContext } from "./IAppContext";

const AppContext = React.createContext<IAppContext>({
  context: null,
  listTitle: ''
});

export default AppContext;