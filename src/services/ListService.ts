import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

import { ITask, toDoItemMetadata } from "../entities/ITask";
import { IListService } from "./IListService";
import { IEntityMapper } from "../mappers/IEntityMapper";
import { ListItemToEntityMapper } from "../mappers/ListItemToEntityMapper";

export class ListService implements IListService {
  constructor(private listTitle: string) { }

  public async fetch(): Promise<ITask[]> {

    const allItems = await sp.web.lists.getByTitle(this.listTitle).items.getAll();
    const entitites = [] as ITask[];
    const mapper: IEntityMapper<ITask> = new ListItemToEntityMapper<ITask>(toDoItemMetadata);
    for (const item of allItems) {
      const entity = mapper.map(item);
      entitites.push(entity);
    }

    return entitites;
  }
}