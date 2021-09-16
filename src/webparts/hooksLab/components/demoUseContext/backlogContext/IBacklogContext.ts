import { IBacklog } from "../IBacklog";

export interface IBacklogContext {
  backlog: IBacklog;
  setBacklog: React.Dispatch<React.SetStateAction<IBacklog>>;
}