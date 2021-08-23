import { IListItem } from "../entities/IListItem";
import { PartialEntity } from "../entities/PartialEntity";

export interface IEntityMapper<TEntity extends IListItem> {
  mapListItemToEntity(listItem: object): TEntity;
  mapEntityToListItem(entity: PartialEntity<TEntity>): object;
}