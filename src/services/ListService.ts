import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

import { ITask, taskMetadata } from "../entities/ITask";
import { IListService } from "./IListService";
import { IEntityMapper } from "../mappers/IEntityMapper";
import { ListItemToEntityMapper } from "../mappers/ListItemToEntityMapper";

export class ListService implements IListService {
  constructor(private listTitle: string) { }

  public async fetch(): Promise<ITask[]> {

    const items = await sp.web.lists.getByTitle(this.listTitle).items.getAll();

    const entitites = [] as ITask[];
    const mapper: IEntityMapper<ITask> = new ListItemToEntityMapper<ITask>(taskMetadata);
    for (const item of items) {
      const entity = mapper.map(item);
      entitites.push(entity);
    }

    return entitites;
  }
}