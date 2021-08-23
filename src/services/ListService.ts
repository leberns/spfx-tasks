import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

import { ITask, taskMetadata } from "../entities/ITask";
import { IListService } from "./IListService";
import { IEntityMapper } from "../mappers/IEntityMapper";
import { EntityMapper } from "../mappers/EntityMapper";
import { PartialEntity } from "../entities/PartialEntity";

export class ListService implements IListService {
  constructor(private listTitle: string) { }

  public async fetch(): Promise<ITask[]> {

    const items = await sp.web.lists.getByTitle(this.listTitle).items.getAll();

    const entitites = [] as ITask[];
    const mapper: IEntityMapper<ITask> = new EntityMapper<ITask>(taskMetadata);
    for (const item of items) {
      const entity = mapper.mapListItemToEntity(item);
      entitites.push(entity);
    }

    return entitites;
  }

  public async update(task: PartialEntity<ITask>): Promise<void> {

    const mapper: IEntityMapper<ITask> = new EntityMapper<ITask>(taskMetadata);
    const listItem = mapper.mapEntityToListItem(task);

    const list = sp.web.lists.getByTitle(this.listTitle);
    const res = await list.items.getById(task.id).update(listItem);
  }
}