import { IEntityMapper } from "./IEntityMapper";
import { IEntity } from "../entities/IEntity";
import { IListItem } from "../entities/IListItem";
import { IField } from "../fields/IField";
import { ExtendedFieldTypes } from "../fields/ExtendedFieldTypes";
import { PartialEntity } from "../entities/PartialEntity";

export class EntityMapper<TEntity extends IListItem> implements IEntityMapper<TEntity> {
  private internalNameToPropertyName: Record<string, keyof Omit<TEntity, keyof IEntity>> = {};

  constructor(private metadata: Record<keyof Omit<TEntity, keyof IEntity>, IField>) {
    const properties = Object.keys(this.metadata);

    properties.forEach((propertyName: string) => {
      const { internalName } = this.metadata[propertyName] as IField;
      this.internalNameToPropertyName[internalName] = propertyName as keyof Omit<TEntity, keyof IEntity>;
    });
  }

  public mapListItemToEntity(listItem: object): TEntity {
    const entity = {} as TEntity;
    const internalNames = Object.keys(listItem);

    for (const internalName of internalNames) {
      const fieldValue = listItem[internalName];
      const propertyName = this.internalNameToPropertyName[internalName];
      const field = this.metadata[propertyName];
      if (propertyName === undefined) {
        continue;
      }
      if (field.type === ExtendedFieldTypes.DateTime) {
        entity[propertyName] = new Date(fieldValue) as any;
      } else {
        entity[propertyName] = fieldValue;
      }
    }

    return entity;
  }

  public mapEntityToListItem(entity: PartialEntity<TEntity>): object {
    const listItem = {};
    const propertyNames = Object.keys(entity);

    for (const propertyName of propertyNames) {
      const propertyValue = entity[propertyName];
      const field: IField = this.metadata[propertyName];
      if (field === undefined) {
        continue;
      }
      if (field.type === ExtendedFieldTypes.DateTime) {
        listItem[field.internalName] = (propertyValue as Date).toISOString();
      } else {
        listItem[field.internalName] = propertyValue;
      }
    }

    return listItem;
  }
}