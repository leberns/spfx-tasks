import { IEntityMapper } from "./IEntityMapper";
import { IField } from "../fields/IField";
import { ExtendedFieldTypes } from "../fields/ExtendedFieldTypes";

export class ListItemToEntityMapper<TEntity> implements IEntityMapper<TEntity> {
  private internalNameToPropertyName: Record<string, keyof TEntity> = {};

  constructor(private metadata: Record<keyof TEntity, IField>) {
    const properties = Object.keys(this.metadata);

    properties.forEach((propertyName: string) => {
      const { internalName } = this.metadata[propertyName] as IField;
      this.internalNameToPropertyName[internalName] = propertyName as keyof TEntity;
    });
  }

  public map(listItem: object): TEntity {
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
}