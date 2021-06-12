import { IEntityMapper } from "./IEntityMapper";

export class ListItemToEntityMapper<TEntity> implements IEntityMapper<TEntity> {
  private internalNameToPropertyName: Record<string, keyof TEntity> = {};

  constructor(private metadata: Record<keyof TEntity, string>) {
    const properties = Object.keys(this.metadata);
    properties.forEach(property => {
      const internalName = this.metadata[property];
      this.internalNameToPropertyName[internalName] = property as keyof TEntity;
    });
  }

  public map(listItem: object): TEntity {
    const entity = {} as TEntity;
    const internalNames = Object.keys(listItem);

    for (const internalName of internalNames) {
      const fieldValue = listItem[internalName];
      const propertyName = this.internalNameToPropertyName[internalName];
      entity[propertyName] = fieldValue;
    }

    return entity;
  }
}